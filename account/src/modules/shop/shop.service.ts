import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as rp from "request-promise";
import * as Math from "math";
import { Repository, DeepPartial } from 'typeorm';
import {Model} from "mongoose";
import {LabelConfig} from "../../entity/mongo/shop/LabelConfig.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Cron, CronExpression, Interval} from "@nestjs/schedule";
import * as _ from "underscore";
import {ToPlayer} from "../../entity/mongo/default/ToPlayer.schema";
import {LabelReleaseConfig} from "../../entity/mongo/shop/LabelReleaseConfig.schema";
import {PlaneShopRelease} from "../../entity/mongo/shop/PlaneShopRelease.schema";
import {Shop} from "../../entity/mysql/shop/shop.entity";
import {ShopLink} from "../../entity/mysql/shop/shopLink.entity";
import {MailExchange} from "../../entity/mysql/default/MailExchange.entity";
import {ShopExchange} from "../../entity/mysql/shop/shopExchange.entity";
import {ConfigLobbyGlobalActivity} from "../../entity/mongo/gameUs/configActivity/ConfigLobbyGlobalActivity.schema";
import {
    ConfigSlotsAcContinuousReward
} from "../../entity/mongo/gameUs/configActivity/ConfigSlotsAcContinuousreward.schema";
import {AcContinuousReward} from "../../entity/mysql/TapOut/acContinuousReward.entity";
import {LockPlayer} from "../../entity/mongo/default/LockPlayer.schema";
import {PlayerCheckIndulge} from "../../entity/mongo/user/PlayerCheckIndulge.schema";
import {MaintainConfig} from "../../entity/mongo/system/MaintainConfig.schema";
import {Channels} from "../../entity/mongo/channel/Channels.schema";
import {Exception} from "../../exception/Exception";
import {ExceptionEnum} from "../../exception/Exception.enum";
import {CodeEnum} from "../../config/enum/code.enum";
@Injectable()
export class ShopService {
    private  accessToken="";
  constructor(
      @InjectRepository(Shop, "tapout_pro")
      private shopRepository: Repository<Shop>,
      @InjectRepository(ShopLink, "tapout_pro")
      private shopLinkRepository: Repository<ShopLink>,
      @InjectRepository(ShopExchange, "tapout_pro")
      private shopExchangeRepository: Repository<ShopExchange>,
      @InjectRepository(MailExchange, "tapout_pro")
      private mailExchangeRepository: Repository<MailExchange>,
      @InjectRepository(AcContinuousReward, "tapout_pro")
      private acContinuousRewardRepository: Repository<AcContinuousReward>,
      @InjectModel(ToPlayer.name)
      private toPlayerModel: Model<ToPlayer>,
      @InjectModel(LabelReleaseConfig.name)
      private labelReleaseConfigModel: Model<LabelReleaseConfig>,
      @InjectModel(PlaneShopRelease.name)
      private shopReleaseModel: Model<PlaneShopRelease>,
      @InjectModel(ConfigLobbyGlobalActivity.name)
      private configLobbyGlobalActivityModel: Model<ConfigLobbyGlobalActivity>,
      @InjectModel(ConfigSlotsAcContinuousReward.name)
      private configSlotsAcContinuousRewardModel: Model<ConfigSlotsAcContinuousReward>,
      @InjectModel(LockPlayer.name)
      private lockPlayerModel: Model<LockPlayer>,
      @InjectModel(PlayerCheckIndulge.name)
      private playerCheckIndulgeModel: Model<PlayerCheckIndulge>,
      @InjectModel(MaintainConfig.name)
      private maintainModel: Model<MaintainConfig>,
      @InjectModel(Channels.name)
      private channelModel: Model<Channels>,
  ) {}

// 构造end
    private getRN(n = 100) {
        let num = 0;
        while (num == 0) {
            num = Math.floor(Math.random() * n) + 1;
        }
        return num;
    }

    async shopConfig(params: any): Promise<any> {
        let userData = await this.toPlayerModel.findOne({ uid: Number(params.uid) }, { _id: 0, "createTime": 1 }).lean();
        if (!userData)throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND);
        let resData: any = {
            goods: [],
        };

        let configlabel = await this.labelReleaseConfigModel.find({ state: 1 }).lean();
        if (!configlabel) {
            return resData;
        }

        let tabTypeArr = [0];
        let labelName = {};

        for (let i = 0; i < configlabel.length; i++) {
            // 归属标签转换
            let ele = configlabel[i];
            this.clearNoNeedKey(ele);
            if (ele.state == 1) {
                // 上架的标签
                tabTypeArr.push(ele.id);
                labelName[ele.id] = ele.pagName
            }
        }

        // 标签和商品需要同时上线
        let res:any = await this.shopReleaseModel.find({ status: 1, tabType: { $in: tabTypeArr } }, { _id: 0, __v: 0 }).sort({ order: 1 }).lean();
        for (let i = 0; i < res.length; i++) {
            let item :any= res[i];
            item.totalLimitNow = 0;
            if (item.totalLimit) {
                // 总限制
                let qb: any = this.shopRepository.createQueryBuilder("shop");
                qb = qb.andWhere(
                    "status=:status AND player_id=:uid AND goods_id=:goodsId",
                    {
                        status: 1,
                        uid: Number(params.uid),
                        goodsId: item.id,
                    }
                );

                item.totalLimitNow = await qb.getCount();
            }

            item.dailyLimitNow = 0;
            if (item.dailyLimit) {
                // 单日限制
                let qb: any = this.shopRepository.createQueryBuilder("shop");
                qb = qb.andWhere(
                    "create_time BETWEEN :start AND :end AND status=:status AND player_id=:uid AND goods_id=:goodsId",
                    {
                        start: await this.config.today(),
                        end: (await this.config.today()) + 86399,
                        status: 1,
                        uid: Number(params.uid),
                        goodsId: item.id,
                    }
                );

                item.dailyLimitNow = await qb.getCount();
            }

            let itemType = this.checkItemType(item);
            switch (itemType) {
                case "normal":
                    await this.normalGoods(resData, item, labelName);
                    break;
                default:
                    break;
            }
        }

        resData.label = configlabel;
        return resData;
    }

    private clearNoNeedKey(item: any) {
        delete item._id;
        delete item.configTimestamp;
        delete item.__v;
    }

    private checkItemType(item: any) {
        if (!!item.goodsType) {
            switch (item.goodsType) {
                default:
                    return "normal";
            }
        }
    }

    private async normalGoods(resData: any, item: any, labelName): Promise<any> {
        if (resData.goods.length == 0) {
            this.clearNoNeedKey(item);
            resData.goods.push({
                name: labelName[item.tabType],
                tabType: item.tabType,
                goods: [item],
            });
        } else {
            let itemLink: any;
            for (let j = 0; j < resData.goods.length; j++) {
                if (resData.goods[j].tabType == item.tabType) {
                    itemLink = resData.goods[j];
                    break;
                }
            }

            if (!itemLink) {
                resData.goods.push({
                    name: labelName[item.tabType],
                    tabType: item.tabType,
                    goods: [item],
                });
            } else {
                itemLink.goods.push(item);
            }
        }
    }

    async getShopLog(params: any): Promise<any> {
        // if (!params.uid) {}

        let sql =
            "SELECT goods_name as goodsName, money, status, pay_time as createTime FROM shop WHERE game_server_msg like '%\"code\":1000%' AND player_id=" +
            params.uid + " AND `status`=1 ORDER BY create_time DESC limit 20 ";
        let res = await this.shopRepository.query(sql);
        return { exchange: res };
    }

    async getIndulgeCheckPay(params): Promise<any> {
        // if (!_.has(params, "uid"))

        let player = await this.userService.searchPlayer({ searchKey: "uid", searchValue: params.uid });
        if (_.isEmpty(player.data)) throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND);

        let pData = player.data;

        let qidRes = await this.channelModel.findOne({ id: Number(pData.qid) }).lean();

        if (!!qidRes && !qidRes.screenTimeSwitch) {
            return { age: 19, eachPay: 999999999, totalPay: 999999999 };
        }

        if (pData.createTime >= UserConstConfig.indulgeCheckTime) {
            // 新用户
            let uid = pData.uid;
            let check18Doc = await this.playerCheckIndulgeModel.findOne({ uid: uid }).lean();
            if (!!check18Doc) {
                let age = check18Doc.age;
                if (age < 8) {
                    return { age: age, eachPay: 0, totalPay: 0 }
                } else if (age >= 8 && age < 16) {
                    let ct = await this.config.monthStart();
                    let sqlMonth = "SELECT SUM(money) as num FROM shop WHERE player_id=" + Number(uid) + " AND status=1 AND create_time>=" + ct;
                    let ret = await this.shopRepository.query(sqlMonth);

                    let num = 0;
                    if (!!ret && !!ret.length) {
                        num = Number(ret[0].num);
                    }

                    return { age: age, eachPay: 50, totalPay: 200 - num };
                } else if (age >= 16 && age < 18) {
                    let ct = await this.config.monthStart();
                    let sqlMonth = "SELECT SUM(money) as num FROM shop WHERE player_id=" + Number(uid) + " AND status=1 AND create_time>=" + ct;
                    let ret = await this.shopRepository.query(sqlMonth);

                    let num = 0;
                    if (!!ret && !!ret.length) {
                        num = Number(ret[0].num);
                    }

                    return { age: age, eachPay: 100, totalPay: 400 - num };
                }
            }
        }

        return { age: 18, eachPay: 999999999, totalPay: 999999999 };
    }

    public async acContinuousrewardInfo(params): Promise<any> {
        // if (!_.has(params, "uid"))

        let player: any = await this.userService.searchPlayer({ searchKey: "uid", searchValue: params.uid });
        if (_.isEmpty(player.data)) {
            return {
                code: this.config.get("code.PARAMSERROR"),
                msg: "found player info 404",
            };
        }
        player = player.data;

        let ret = await this.configLobbyGlobalActivityModel.findOne({ Id: 1010, Activate: 1 }, { _id: 0, __v: 0 }).lean();
        if (!ret) throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER,"缺少活动配置 ID=1010");

        let endTime = 0;
        let startTime = 0;
        let jump = false;
        switch (Number(ret.OpenRule)) {
            case 0:
                // 永久 不需要限制
                jump = true;
                break;
            case 1:
                // 每天指定时间
                let today = await this.config.today();
                endTime = (today + Number(ret.CloseTime)) * 1000;
                startTime = (today + Number(ret.OpenTime)) * 1000;
                break;
            case 2:
                // 指定时间
                endTime = Number(ret.CloseTime) * 1000;
                startTime = Number(ret.OpenTime) * 1000;
                break;
            default:
                break;
        }

        if (!jump) {
            if (_.now() < startTime || endTime < _.now())throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER,"连续奖励活动结束");

        }

        let acContinuousreward = await this.configSlotsAcContinuousRewardModel.find({}, { _id: 0, __v: 0 }).sort({ Id: 1 }).lean();
        for (let index = 0; index < acContinuousreward.length; index++) {
            let ele:any = acContinuousreward[index];
            let Reward = ele.Reward.split(",");
            if (Reward.length < 3) {
                ele.Reward = [];
            } else {
                ele.Reward = [{
                    "itemId": Number(Reward[1]),
                    "itemNum": Number(Reward[2])
                }]
            }
        }

        let canGetIds = [];
        for (let index = 0; index < acContinuousreward.length; index++) {
            let ele = acContinuousreward[index];
            if (index == 0) {
                canGetIds.push(ele.Id);
            } else {
                let upShopId = acContinuousreward[index - 1].ShopId; // 上一级商品ID
                if (!upShopId) {
                    // 上一层免费
                    canGetIds.push(ele.Id);
                } else {
                    let qb: any = this.shopRepository.createQueryBuilder("shop");
                    qb = qb.andWhere(
                        "status=:status AND player_id=:uid AND goods_id=:goodsId",
                        {
                            status: 1,
                            uid: Number(params.uid),
                            goodsId: upShopId,
                        }
                    );

                    if (await qb.getCount() >= 1) {
                        canGetIds.push(ele.Id);
                    } else {
                        break;
                    }
                }
            }
        }

        let rewards = await this.acContinuousRewardRepository.find({ playerId: Number(player.uid) });
        let rewardIds = [];
        for (let index = 0; index < rewards.length; index++) {
            const ele = rewards[index];
            rewardIds.push(Number(ele.rewardId));
        }

        return  {
                acContinuousreward: acContinuousreward,
                canGetIds: canGetIds,
                rewardIds: rewardIds
            }
    }

    public async acContinuousreward(params): Promise<any> {
        // if (!_.has(params, "uid"))

        let player: any = await this.userService.searchPlayer({ searchKey: "uid", searchValue: params.uid });
        if (_.isEmpty(player.data)) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER,"found player info 404");
        }
        player = player.data;

        let ret = await this.configLobbyGlobalActivityModel.findOne({ Id: 1010, Activate: 1 }, { _id: 0, __v: 0 }).lean();
        if (!ret) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER,"缺少活动配置 ID=1010");
        }

        let endTime = 0;
        let startTime = 0;
        let jump = false;
        switch (Number(ret.OpenRule)) {
            case 0:
                // 永久 不需要限制
                jump = true;
                break;
            case 1:
                // 每天指定时间
                let today = await this.config.today();
                endTime = (today + Number(ret.CloseTime)) * 1000;
                startTime = (today + Number(ret.OpenTime)) * 1000;
                break;
            case 2:
                // 指定时间
                endTime = Number(ret.CloseTime) * 1000;
                startTime = Number(ret.OpenTime) * 1000;
                break;
            default:
                break;
        }

        if (!jump) {
            if (_.now() < startTime || endTime < _.now()) {
                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER,"连续奖励活动结束");
            }
        }

        let item :any= await this.configSlotsAcContinuousRewardModel.findOne({ Id: params.Id }, { _id: 0, __v: 0 }).lean();
        if (!item) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER,"found ID=" + params + "404");
        }

        let Reward:any = item.Reward.split(",");
        if (Reward.length < 3) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER,"config wrong ID=" + params.Id);
        } else {
            item.Reward = [{
                "itemType": Number(Reward[0]),
                "itemId": Number(Reward[1]),
                "itemNum": Number(Reward[2])
            }]
        }

        let acContinuousreward = await this.configSlotsAcContinuousRewardModel.find({}, { _id: 0, __v: 0 }).sort({ Id: 1 }).lean();
        let canGetIds = [];
        for (let index = 0; index < acContinuousreward.length; index++) {
            let ele = acContinuousreward[index];
            if (index == 0) {
                canGetIds.push(ele.Id);
            } else {
                let upShopId = acContinuousreward[index - 1].ShopId; // 上一级商品ID
                if (!upShopId) {
                    // 上一层免费
                    canGetIds.push(ele.Id);
                } else {
                    let qb: any = this.shopRepository.createQueryBuilder("shop");
                    qb = qb.andWhere(
                        "status=:status AND player_id=:uid AND goods_id=:goodsId",
                        {
                            status: 1,
                            uid: Number(params.uid),
                            goodsId: upShopId,
                        }
                    );

                    if (await qb.getCount() >= 1) {
                        canGetIds.push(ele.Id);
                    } else {
                        break;
                    }
                }
            }
        }

        if (!canGetIds.includes(params.Id)) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER, "can not reward, up item first in acContinuousreward" );
         }

        // 检查领取记录
        let old = await this.acContinuousRewardRepository.findOne({ playerId: Number(player.uid), rewardId: params.Id });
        if (!!old) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER, "done reward" );
        }

        // 发送奖励
        let resData: any;
        let gold = 0;
        let redpack = 0;
        let userDataBefore:any = await this.toPlayerModel.findOne({ uid: Number(player.uid) }, { _id: 0, "accountInfo": 1 }).lean();

        try {
            let gameServers: any;
            let check = await this.lockPlayerModel.findOne({ uid: Number(params.uid) }).lean();
            if (!!check && !!check.lock) {
                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER, "services 404");
            }

            if (!!check && !!check.white && !!check.bate) {
                // bate 内部账号
                gameServers = this.config.get("config" + player.appType + ".GAME_SERVER_PAY_BATE");
            } else {
                gameServers = this.config.get("config" + player.appType + ".GAME_SERVER_PAY");
            }

            if (!gameServers) {
                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER, "appType错误：" + player.appType);
            }

            let num = Math.floor(Math.random() * (gameServers.length - 1 + 1)) + 0;

            let getItems = [];
            for (let index = 0; index < item.Reward.length; index++) {
                const ele :any= item.Reward[index];
                getItems.push({
                    Type: ele.itemId,
                    Group: ele.itemType,
                    Num: ele.itemNum,
                });

                if (ele.itemId == 100) {
                    gold += ele.itemNum;
                } else if (ele.itemId == 200) {
                    redpack += ele.itemNum;
                }
            }

            let gameServerItem: any = {
                uid: params.uid,
                costItem: {
                    Type: params.Id,
                    Group: 1, // 现金
                    Num: 0
                },
                getItems: getItems,
                freeGift: [],
                getItemBefore: [],
                exchangeType: "quiet"
            };

            resData = await rp({
                url: gameServers[num] + "/public/shop",
                method: "POST",
                json: true,
                body: gameServerItem,
            });
            if (_.isString(resData)) {
                resData = resData.trim();
                resData = JSON.parse(resData);
            }
        } catch (error) {
            console.error("/public/acContinuousreward error:", _.now(), error);

            if (_.has(error, "error") && _.has(error.error, "code")) {
                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER, error.error.code);
            }
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER, "shop http error");
        }

        if (resData.code === 1000) {
            // 保存发货之后的账号信息
            let userDataAfter :any= await this.toPlayerModel.findOne({ uid: Number(player.uid) }, { _id: 0, "accountInfo": 1 }).lean();

            let addData = {
                playerId: Number(player.uid),
                createTime: _.now() / 1000,
                msg: JSON.stringify(item),
                gameServerMsg: JSON.stringify(resData),
                rewardId: params.Id,
                nickname: player.nickname, //player.nickname ? player.nickname : "空",
                qid: player.qid,
                gold: gold,
                redBag: redpack,
                msgBefore: JSON.stringify(userDataBefore.accountInfo),
                msgAfter: JSON.stringify(userDataAfter.accountInfo),
                rewardItems: item.Reward,
            };
            await this.acContinuousRewardRepository.insert(addData);

            return item.Reward ;
        } else {
            // 发货失败
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER, "shop http error");
            // return { code: this.config.get("code.INERROR"), data: resData };
        }
    }

    public async addPaylog(params): Promise<any> {
        console.log((params.urlType ? params.urlType : "") + " pay ==========", JSON.stringify({
            uid: params.uid,
            type: !!params.shopConfigTimestamp ? "shop" : "exchange",
            msg: JSON.stringify(params),
            time: _.now()
        }))
    }

    async pay(params: any, remoteAddr: string, tt, ip): Promise<any> {
        params.id = params.productId;
        params.payApi = params.payApi.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());

        // if (!(await this.config.isNumber(params.id)))
        params.id = Number(params.id);

        // if (!_.has(params, "uid"))
        // if (!_.has(params, "appType"))
        let player = await this.userService.searchPlayer({ searchKey: "uid", searchValue: params.uid });
        if (_.isEmpty(player.data)) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND);
        }
        params.appType = player.data.appType;

        // 维护功能
        let check = await this.lockPlayerModel.findOne({ uid: Number(params.uid) }).lean();
        let maintain = await this.maintainModel.findOne().lean();
        if (!!maintain) {
            if (!check || (!!check && !check.white)) {
                // 不是白名单用户
                if (_.has(params, "exchangeConfigTimestamp") && maintain.exchangeStatus === 1) {
                    throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"兑换维护中" );

                }

                if (_.has(params, "shopConfigTimestamp") && maintain.payStatus === 1) {
                    throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"支付维护中");
                }
            }
        }

        if (!_.has(params, "shopConfigTimestamp")) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"支付维护中");
        }

        let t1 = _.now();
        if (_.has(params, "shopConfigTimestamp")) {
            if (!!check && !!check.forbidBuy) {
                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"限制特定用户不能购买");// 限制特定用户不能购买
            }

            // 商城购买
            return await this.shopBuy(params, player, remoteAddr, t1, ip, maintain);
        }
        throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"缺少必要的时间参数");// 限制特定用户不能购买

    }

    private async shopBuy(params: any, player: any, remoteAddr: string, t1: any, ip: any, maintain) {
        let item = await this.shopReleaseModel.findOne({ id: Number(params.id) }).lean();
        if (!item) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,params.id + " not found;");// 限制特定用户不能购买
        }

        if (player.data.vip < item.vip) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"vip等级不足",  {  player: player, item: item } );// 限制特定用户不能购买
        }

        // 购买限制
        let checkLimit = await this.checkBuyLimit(item, params);
        if (checkLimit.code != CodeEnum.OK) {
            return checkLimit;
        }

        // 连续奖励
        if (item.goodsType == 4) {
            let checkAcContinuousreward = await this.checkAcContinuousreward(item, params);

            if (checkAcContinuousreward.code != CodeEnum.OK) {
                return checkAcContinuousreward;
            }
        }

        // 转盘奖励
        if (item.goodsType == 5) {
            let checkRotaryGoods = await this.checkRotaryGoods(item, params);

            if (checkRotaryGoods.code != CodeEnum.OK) {
                return checkRotaryGoods;
            }
        }

        // 包含多个商品 和 链式限制
        if (_.has(params, "parentId") && params.parentId > 0) {
            let parentItem = await this.shopReleaseModel.findOne({ id: Number(params.parentId) }).lean();
            if (!parentItem) {
                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND, params.parentId + " not found;" );// 限制特定用户不能购买
            }

            if (!parentItem.containId.includes(Number(params.id))) {
                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND, "parentId: " + params.parentId + " not includes id: " + params.id);// 限制特定用户不能购买
            }

        } else {
            let checkLink = await this.checkBuyLink(item, params);
            if (checkLink.code != CodeEnum.OK) {
                return checkLink;
            }
        }

        // 3秒内不允许有其他订单存在
        let check3s = await this.check3s(params);
        if (check3s.code != CodeEnum.OK) {
            return check3s;
        }

        let checkAge18 = await this.check18(item.amount, params.uid, player.data.createTime, player.data.qid);
        if (checkAge18.code != CodeEnum.OK) {
            return checkAge18;
        }

        let gameServerItem: any = {
            uid: Number(params.uid),
            costItem: {
                Type: item.id,
                Group: 1, // 现金
                Num: Math.ceil(item.amount), // 单位分
            },
            getItems: [],
            getItemBefore: [],
            freeGift: []
        };

        // 购买
        if (item.goodsType == 2) {
            // 招财猫购买
            return await this.buyActionCat(item, gameServerItem, params, player, t1, ip, remoteAddr, maintain, null);
        } else {
            return await this.buyAction(item, gameServerItem, params, player, t1, ip, remoteAddr, maintain, null);
        }
    }

    private async checkBuyLimit(item, params): Promise<any> {
        if (item.totalLimit) {
            // 总限制
            let qb: any = this.shopRepository.createQueryBuilder("shop");
            qb = qb.andWhere(
                "status=:status AND player_id=:uid AND goods_id=:goodsId",
                {
                    status: 1,
                    uid: Number(params.uid),
                    goodsId: item.id,
                }
            );

            if (item.totalLimit <= (await qb.getCount())) {
                return {
                    code: this.config.get("code.AUTHERROR"),
                    data: { msg: "购买到达总限制" },
                };
            }
        }

        if (item.dailyLimit) {
            // 单日限制
            let qb: any = this.shopRepository.createQueryBuilder("shop");
            qb = qb.andWhere(
                "create_time BETWEEN :start AND :end AND status=:status AND player_id=:uid AND goods_id=:goodsId",
                {
                    start: await this.config.today(),
                    end: (await this.config.today()) + 86399,
                    status: 1,
                    uid: Number(params.uid),
                    goodsId: Number(params.id),
                }
            );

            if (item.dailyLimit <= (await qb.getCount())) {
                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"购买到达单日限制" );
            }
        }

        return { code: CodeEnum.OK };
    }

    private async checkAcContinuousreward(item, params): Promise<any> {
        let ret = await this.configLobbyGlobalActivityModel.findOne({ Id: 1010, Activate: 1 }, { _id: 0, __v: 0 }).lean();
        if (!ret) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"缺少活动配置 ID=1010" );
        }

        let endTime = 0;
        let startTime = 0;
        let jump = false;
        switch (Number(ret.OpenRule)) {
            case 0:
                // 永久 不需要限制
                jump = true;
                break;
            case 1:
                // 每天指定时间
                let today = await this.config.today();
                endTime = (today + Number(ret.CloseTime)) * 1000;
                startTime = (today + Number(ret.OpenTime)) * 1000;
                break;
            case 2:
                // 指定时间
                endTime = Number(ret.CloseTime) * 1000;
                startTime = Number(ret.OpenTime) * 1000;
                break;
            default:
                break;
        }

        if (!jump) {
            if (_.now() < startTime || endTime < _.now()) {
                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"连续奖励活动结束" );
            }
        }

        let itemConfig = await this.configSlotsAcContinuousRewardModel.findOne({ ShopId: params.id }, { _id: 0, __v: 0 }).sort({ Id: 1 }).lean();
        if (!itemConfig) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"ShopId=" + params.id + " found Id 404" );
        }

        let Id = itemConfig.Id;

        let acContinuousreward = await this.configSlotsAcContinuousRewardModel.find({}, { _id: 0, __v: 0 }).sort({ Id: 1 }).lean();
        let canGetIds = [];
        for (let index = 0; index < acContinuousreward.length; index++) {
            let ele = acContinuousreward[index];
            if (index == 0) {
                canGetIds.push(ele.Id);
            } else {
                let upShopId = acContinuousreward[index - 1].ShopId; // 上一级商品ID
                if (!upShopId) {
                    // 上一层免费
                    canGetIds.push(ele.Id);
                } else {
                    let qb: any = this.shopRepository.createQueryBuilder("shop");
                    qb = qb.andWhere(
                        "status=:status AND player_id=:uid AND goods_id=:goodsId",
                        {
                            status: 1,
                            uid: Number(params.uid),
                            goodsId: upShopId,
                        }
                    );

                    if (await qb.getCount() >= 1) {
                        canGetIds.push(ele.Id);
                    } else {
                        break;
                    }
                }
            }
        }

        if (!canGetIds.includes(Id)) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"can not reward, up item first" );
        }

        return { code: CodeEnum.OK };
    }

    private async checkRotaryGoods(item, params): Promise<any> {
        let playerInfo:any = await this.toPlayerModel.findOne({ uid: Number(params.uid) }, { _id: 0, "playerFinancial": 1 }).lean();
        if (!playerInfo.playerFinancial) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"playerFinancial 404" );
        }

        switch (item.id) {
            case shopConstConfig.shopRotary:
                if (!playerInfo.playerFinancial.canBuyShopRotary) {
                    throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                }
                break;
            case shopConstConfig.shopSuperRotary:
                if (!playerInfo.playerFinancial.canBuySuperShopRotary) {
                    throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                    return { code: this.config.get("code.PARAMSERROR"), data: { msg: "canBuySuperShopRotary = 0" } };
                }
                break;
            default:
                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                return { code: this.config.get("code.NOTFOUND"), data: { msg: "item.goodsType == 5, but id 404" } };
        }

        return { code: CodeEnum.OK };
    }


    private async checkBuyLink(item, params): Promise<any> {
        if (_.has(item, "firstUI") && item.firstUI == 0) {
            let upItem = await this.shopReleaseModel.find({ nextId: Number(params.id) }).lean();
            if (!upItem || !upItem.length) {
                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                return {
                    code: this.config.get("code.INERROR"), data: { msg: "配置信息错误, 上一层商品404" },
                };
            }

            for (let i = 0; i < upItem.length; i++) {
                let ele = upItem[i];
                if (!ele.totalLimit && !ele.dailyLimit) {
                    throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                    return { code: this.config.get("code.INERROR"), data: { msg: "上一层商品没有限制购买次数" } };
                }

                if (!!ele.totalLimit) {
                    // 总限制
                    let qb: any = this.shopRepository.createQueryBuilder("shop");
                    qb = qb.andWhere(
                        "status=:status AND player_id=:uid AND goods_id=:goodsId",
                        {
                            status: 1,
                            uid: Number(params.uid),
                            goodsId: ele.id,
                        }
                    );

                    if (ele.totalLimit > (await qb.getCount())) {
                        throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                        return { code: this.config.get("code.AUTHERROR"), data: { msg: "上一层商品总购买限制没有购买完" } };
                    }
                }

                // 总限制优先级高于每日限制
                if (!!ele.dailyLimit) {
                    // 每日限制
                    let qb: any = this.shopRepository.createQueryBuilder("shop");
                    qb = qb.andWhere(
                        "create_time BETWEEN :start AND :end AND status=:status AND player_id=:uid AND goods_id=:goodsId",
                        {
                            start: await this.config.today(),
                            end: (await this.config.today()) + 86399,
                            status: 1,
                            uid: Number(params.uid),
                            goodsId: ele.id,
                        }
                    );

                    if (ele.dailyLimit > (await qb.getCount())) {
                        throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                        return { code: this.config.get("code.AUTHERROR"), data: { msg: "上一层商品每日限制没有购买完" } };
                    }
                }

            }
        }

        return { code: CodeEnum.OK };
    }

    private async check3s(params): Promise<any> {
        // 总限制
        let sql = "SELECT * from shop WHERE player_id=" + Number(params.uid) + " AND create_time>=" + (parseInt(String(_.now() / 1000)) - 3);
        let res = await this.shopRepository.query(sql);

        if (!!res && !!res.length) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
            return { code: this.config.get("code.AUTHERROR"), data: { msg: "3秒内有未处理的订单" } };
        }

        return { code: CodeEnum.OK };
    }

    async check18(amount, uid, createTime, qid): Promise<any> {
        // 登录验证防沉迷,并且携带信息给游服
        let qidRes = await this.channelModel.findOne({ id: Number(qid) }).lean();
        if (!!qidRes && !qidRes.screenTimeSwitch) {
            return { code: CodeEnum.OK };
        }

        if (createTime >= UserConstConfig.indulgeCheckTime) {
            let check18Doc = await this.playerCheckIndulgeModel.findOne({ uid: uid }).lean();
            if (!!check18Doc) {
                let age = check18Doc.age;
                if (age < 8) {
                    throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                    return { code: this.config.get("code.AUTHERROR"), data: { msg: "玩家年龄小于8周岁：禁止充值、禁止使用付费说明" } }
                } else if (age >= 8 && age < 16) {
                    if (amount > 50) {
                        throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                        return { code: this.config.get("code.AUTHERROR"), data: { msg: "年龄大于等于8周岁小于16周岁：充值金额每次不大于50元" } }
                    }

                    let ct = await this.config.monthStart();
                    let sqlMonth = "SELECT SUM(money) as num FROM shop WHERE player_id=" + Number(uid) + " AND status=1 AND create_time>=" + ct;
                    let ret = await this.shopRepository.query(sqlMonth);
                    if (!!ret && !!ret.length) {
                        if (Number(ret[0].num) + amount > 200) {
                            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                            return { code: this.config.get("code.AUTHERROR"), data: { msg: "年龄大于等于8周岁小于16周岁：每月不得大于200元" } }
                        }
                    }
                } else if (age >= 16 && age < 18) {
                    if (amount > 100) {
                        throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                        return { code: this.config.get("code.AUTHERROR"), data: { msg: "年龄大于等于16周岁小于18周岁：充值金额每次不得大于100元" } }
                    }

                    let ct = await this.config.monthStart();
                    let sqlMonth = "SELECT SUM(money) as num FROM shop WHERE player_id=" + Number(uid) + " AND status=1 AND create_time>=" + ct;
                    let ret = await this.shopRepository.query(sqlMonth);

                    if (!!ret && !!ret.length) {
                        if (Number(ret[0].num) + amount > 400) {
                            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                            return { code: this.config.get("code.AUTHERROR"), data: { msg: "年龄大于等于16周岁小于18周岁：每月不得大于400元" } }
                        }
                    }
                }
            }
        }

        return { code: CodeEnum.OK };
    }

    private async buyAction(item, gameServerItem, params, player, t1, ip, remoteAddr = "127.0.0.1", maintain, outPayId): Promise<any> {
        // 购买的物品
        let allItems = {};
        let gold = 0;

        for (let i = 0; i < item.rewardItems.length; i++) {
            let ele = item.rewardItems[i];
            if (!ele.itemType) {
                continue;
            }

            if (ele.itemType == 100) {
                ele.itemId = 100;
                if (!!item.overWeight) {
                    // 金币加码
                    ele.itemNum = parseInt(String(ele.itemNum * (100 + item.overWeight) / 100));
                }

                gold += ele.itemNum;
            }

            if (!allItems[ele.itemType]) {
                allItems[ele.itemType] = {};
                allItems[ele.itemType][ele.itemId] = {
                    Type: ele.itemId,
                    Group: ele.itemType,
                    Num: ele.itemNum,
                }
            } else {
                if (!allItems[ele.itemType][ele.itemId]) {
                    allItems[ele.itemType][ele.itemId] = {
                        Type: ele.itemId,
                        Group: ele.itemType,
                        Num: ele.itemNum,
                    }
                } else {
                    allItems[ele.itemType][ele.itemId].Num += ele.itemNum;
                }
            }
        }

        // 赠送的物品
        for (let i = 0; i < item.freeGift.length; i++) {
            let ele = item.freeGift[i];
            if (!ele.itemType) {
                continue;
            }

            if (ele.itemType == 100) {
                ele.itemId = 100;
                gold += ele.itemNum;
            }

            if (!allItems[ele.itemType]) {
                allItems[ele.itemType] = {};
                allItems[ele.itemType][ele.itemId] = {
                    Type: ele.itemId,
                    Group: ele.itemType,
                    Num: ele.itemNum,
                }
            } else {
                if (!allItems[ele.itemType][ele.itemId]) {
                    allItems[ele.itemType][ele.itemId] = {
                        Type: ele.itemId,
                        Group: ele.itemType,
                        Num: ele.itemNum,
                    }
                } else {
                    allItems[ele.itemType][ele.itemId].num += ele.itemNum;
                }
            }
        }

        item.gold = gold;

        // 物品合起来
        let allItemsArr = [];
        for (let i in allItems) {
            for (let j in allItems[i]) {
                allItemsArr.push(allItems[i][j])
            }
        }

        gameServerItem.getItems = allItemsArr;

        for (let i = 0; i < item.rewardItems.length; i++) {
            let ele = item.rewardItems[i];
            if (!ele.itemType) {
                continue;
            }

            gameServerItem.getItemBefore.push({
                Type: ele.itemId,
                Group: ele.itemType,
                Num: ele.itemNum,
            })
        }

        for (let i = 0; i < item.freeGift.length; i++) {
            let ele = item.freeGift[i];
            if (!ele.itemType) {
                continue;
            }

            gameServerItem.freeGift.push({
                Type: ele.itemId,
                Group: ele.itemType,
                Num: ele.itemNum,
            })
        }

        let payId = process.env.NOW_ENV + "pay" + (await this.config.formateTime(new Date(), "yyyyMMddhms")) + Math.floor(Math.random() * 10000) + this.config.nonceStr(4);
        if (!!outPayId) {
            payId = outPayId;
        }
        try {
            switch (params.payApi) {
                case "Google":
                    return await this.google(params, player.data, payId, item, gameServerItem, t1);
                default:
                    throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                    return { code: this.config.get("code.PARAMSERROR"), data: { msg: "payApi error" } };
            }
        } catch (e) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
            return { code: this.config.get("code.INERROR"), data: { msg: e } };
        }
    }

    private async buyActionCat(item, gameServerItem, params, player, t1, ip, remoteAddr = "127.0.0.1", maintain, outPayId): Promise<any> {
        // 购买的物品
        if (item.goodsType != 2) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
            return { code: this.config.get("code.PARAMSERROR"), data: { msg: "goodsType error" } };
        }

        let userData = await this.toPlayerModel.findOne({ uid: Number(params.uid) }, { "goFishingInfo.cat": 1 }).lean();
        if (!!userData && !!userData.goFishingInfo && !!userData.goFishingInfo.cat && userData.goFishingInfo.cat.CatSto + userData.goFishingInfo.cat.CatBag > 0) {
            let gold = userData.goFishingInfo.cat.CatSto + userData.goFishingInfo.cat.CatBag;
            item.rewardItems = [{
                itemType: 100,
                itemId: 100,
                itemNum: gold
            }];

            let payId = process.env.NOW_ENV + "cat" + (await this.config.formateTime(new Date(), "yyyyMMddhms")) + Math.floor(Math.random() * 10000) + this.config.nonceStr(4);
            return await this.buyAction(item, gameServerItem, params, player, t1, ip, remoteAddr, maintain, payId);
        } else {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
            return { code: this.config.get("code.INERROR"), data: { msg: "goFishingInfo.cat 404" } };
        }
    }

    async payResult(payId = null, succ = null, goodsId = null, item = null): Promise<any> {
        let res = await this.payResultShop(payId, succ, goodsId, item);
        if (this.config.get("gameConfig.localDev")) {
            console.log("============================= 发货结果", res);
        }
        return res;
    }

    private async isFirstPay(playerId) {
        let sqlFirst = "SELECT * from shop WHERE player_id=" + playerId + " AND status=1 AND money>0";
        let first = await this.shopRepository.query(sqlFirst);

        let sqlFirstLink = "SELECT * from shop_link WHERE playerId=" + playerId + " AND status=1 AND money>0";
        let firstLink = await this.shopRepository.query(sqlFirstLink);

        let num = 0;
        if (!!first && !!first.length) {
            num += first.length;
        }

        if (!!firstLink && !!firstLink.length) {
            num += firstLink.length;
        }

        return num;
    }

    private async payResultShop(payId = null, succ = null, goodsId = null, item = null): Promise<any> {
        let orderStatus = await this.config.get("code.orderStatus.orderStatus");
        if (succ) {
            try {
                // 支付成功
                // 通知游戏服
                let sql = "update shop set idlock=1, status=110 where payId= \
              ( select a.payId FROM \
              ( \
              SELECT payId from shop WHERE idlock !=1 AND idlock !=2 AND payId='" +
                    payId +
                    "' AND status=-3 \
                        ) a) ";
                let lock: any = await this.shopRepository.query(sql);
                if (lock.changedRows === 1) {
                    let needItem: any = await this.shopRepository.findOne({ payId: payId });

                    if (!!needItem && !_.isEmpty(needItem)) {
                        item = JSON.parse(needItem.msg);
                        goodsId = needItem.goodsId;
                    } else {
                        throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                        return {
                            code: this.config.get("code.ORDER_ERROR_NOTFOUND"),
                            msg: "找不到订单1: " + payId,
                        };
                    }

                    if (!!needItem.status && needItem.status === 110) {
                        let payNum = await this.isFirstPay(Number(needItem.playerId));
                        if (payNum == 0) {
                            let updateData: any = {
                                firstPay: 1,
                            };
                            await this.shopRepository.update({ payId: payId }, updateData);
                        }

                        let goods: any = await this.shopReleaseModel.findOne({ id: goodsId }).lean();
                        if (goodsId != shopConstConfig.insideShopGoodsId.dailywage && !goods && payId.indexOf("POGO") < 0) {
                            // 待发货
                            let updateData = {
                                status: -4,
                            };
                            await this.shopRepository.update({ payId: payId }, updateData);
                            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                            return { code: this.config.get("code.ORDER_ERROR_PRODUCT_NOTFOUND"), data: { msg: goodsId + " not found;" } };
                        }

                        if (!!goods) {
                            goods.goodsId = goods.id;
                            goods.nextGoodsId = goods.nextId;
                        }

                        // 保存发货之前的账号信息
                        let userData = await this.toPlayerModel.findOne({ uid: Number(needItem.playerId) }, { _id: 0, "accountInfo": 1, createTime: 1 }).lean();
                        // 再次检查是否可以发送到游戏服
                        let canDo = await this.canSendToGameServer(needItem.playerId, goods, goodsId, payId);
                        if (canDo.code != 200) {
                            // 发货失败
                            let updateData = {
                                status: -1,
                                gameServerMsg: "重复购买，不可以发送到游戏服, goodsId:" + goodsId,
                            };

                            await this.shopRepository.update({ payId: payId }, updateData);
                            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                            return { code: this.config.get("code.ORDER_ERROR_REPEAT_PAY"), msg: "line 12311s 重复购买，不可以发送到游戏服, goodsId:" + goodsId };
                        }

                        let resData: any;
                        try {
                            let gameServers: any;
                            let check = await this.lockPlayerModel.findOne({ uid: Number(item.uid) }).lean();
                            if (!!check && !!check.lock) {
                                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                                return { code: this.config.get("code.PARAMSERROR") };
                            }

                            if (!!check && !!check.white && !!check.bate) {
                                // bate 内部账号
                                gameServers = this.config.get("config" + needItem.appType + ".GAME_SERVER_PAY_BATE");
                            } else {
                                gameServers = this.config.get("config" + needItem.appType + ".GAME_SERVER_PAY");
                            }

                            if (!gameServers) {
                                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                                return { code: this.config.get("code.AUTHERROR"), msg: "appType错误：" + needItem.appType };
                            }

                            let num = Math.floor(Math.random() * (gameServers.length - 1 + 1)) + 0;

                            let gameServerItem: any = {
                                uid: item.uid,
                                costItem: item.costItem,
                                getItems: item.getItems,
                                freeGift: item.freeGift,
                                getItemBefore: item.getItemBefore,
                                exchangeType: "shop"
                            };

                            if (payId.indexOf("cat") > 0) {
                                gameServerItem.exchangeType = "cat";
                            }

                            if (goods.goodsType == 5) {
                                // 转盘商品
                                switch (goods.id) {
                                    case shopConstConfig.shopRotary:
                                        gameServerItem.exchangeType = "shopRotary";
                                        break;
                                    case shopConstConfig.shopSuperRotary:
                                        gameServerItem.exchangeType = "shopSuperRotary";
                                        break;
                                }
                            }

                            resData = await rp({
                                url: gameServers[num] + "/public/shop",
                                method: "POST",
                                json: true,
                                body: gameServerItem,
                            });
                            if (_.isString(resData)) {
                                resData = resData.trim();
                                resData = JSON.parse(resData);
                            }
                        } catch (error) {
                            console.error("/public/exchange error:", _.now(), error);
                            // 待发货
                            let updateData = {
                                status: -4,
                            };
                            await this.shopRepository.update({ payId: payId }, updateData);

                            if (_.has(error, "error") && _.has(error.error, "code")) {
                                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                                return {
                                    code: this.config.get("code.INERROR"),
                                    data: { msg: error.error.code, line: "shop" + 1 },
                                };
                            }
                            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");
                            return {
                                code: this.config.get("code.INERROR"),
                                data: { msg: "shop http error", line: 1 },
                            };
                        }
                        // 保存发货之后的账号信息
                        let userDataAfter = await this.toPlayerModel.findOne({ uid: Number(needItem.playerId) }, { _id: 0, "accountInfo": 1 }).lean();

                        if (goods.goodsType == 4) {
                            // 连续奖励商品
                            let playerData = await this.userService.searchPlayer({ searchKey: "uid", searchValue: Number(needItem.playerId) });
                            let player = playerData.data;

                            let itemConfig = await this.configSlotsAcContinuousRewardModel.findOne({ ShopId: goods.goodsId }, { _id: 0, __v: 0 }).sort({ Id: 1 }).lean();
                            let Id = itemConfig.Id;

                            let gold = 0;
                            let redpack = 0;

                            for (let index = 0; index < item.getItems.length; index++) {
                                const ele = item.getItems[index];
                                if (ele.Type == 100) {
                                    gold += ele.Num;
                                } else if (ele.Type == 200) {
                                    redpack += ele.Num;
                                }
                            }

                            let addData = {
                                playerId: Number(needItem.playerId),
                                createTime: _.now() / 1000,
                                msg: JSON.stringify(itemConfig),
                                gameServerMsg: JSON.stringify(resData),
                                rewardId: Id,
                                nickname: player.nickname, //player.nickname ? player.nickname : "空",
                                qid: player.qid,
                                gold: gold,
                                redBag: redpack,
                                msgBefore: JSON.stringify(userData.accountInfo),
                                msgAfter: JSON.stringify(userDataAfter.accountInfo),
                                rewardItems: item.getItems
                            };
                            await this.acContinuousRewardRepository.insert(addData);
                        }

                        if (resData.code === 1000) {
                            // 发货成功
                            let updateData: any = {
                                status: 1,
                                payTime: _.now() / 1000,
                                gameServerMsg: JSON.stringify(resData),
                                msgBefore: JSON.stringify(userData.accountInfo),
                                msgAfter: JSON.stringify(userDataAfter.accountInfo)
                            };

                            if (await this.config.realDay(needItem.createTime * 1000) != await this.config.today()) {
                                updateData.createTime = updateData.payTime;
                            }

                            await this.shopRepository.update({ payId: payId }, updateData);

                            return { code: CodeEnum.OK, data: JSON.stringify({payId:payId}),msg:"发货成功" };
                        } else {
                            // 发货失败
                            let updateData = {
                                status: -1,
                                gameServerMsg: JSON.stringify(resData),
                            };

                            await this.shopRepository.update({ payId: payId }, updateData);
                            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");

                            return { code: this.config.get("code.INERROR"), data: resData };
                        }
                    } else {
                        throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");

                        return { code: this.config.get("code.ORDER_ERROR_STATUS"), mas: "订单状态不为[待支付]" };
                    }
                } else {
                    throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");

                    // console.error("重复通知的订单ID：", payId);
                    return { code: this.config.get("code.ORDER_ERROR_REPEAT_NOTIFY"), mas: "重复通知" };
                }
            } catch (error) {
                console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx alipay payResult error", error);
            }
        } else {
            // 支付失败
            let needItem: any = await this.shopRepository.findOne({ payId: payId });
            if (!!needItem && !_.isEmpty(needItem)) {
                goodsId = needItem.goodsId;
            } else {
                return {
                    code: this.config.get("code.ORDER_ERROR_NOTFOUND"),
                    msg: "找不到订单: " + payId,
                };
            }

            let updateData = {
                status: -3, // 返回待支付状态
            };

            await this.shopRepository.update({ payId: payId }, updateData);
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_USER_NOT_FOUND,"canBuyShopRotary = 0");

            return { code: this.config.get("code.INERROR"), msg: "line sssw111" };
        }
    }

    private async canSendToGameServer(uid: any, item: any, goodsId: any, payId) {
        if (goodsId != shopConstConfig.insideShopGoodsId.dailywage && item.totalLimit) {
            // 总限制
            let qb: any = this.shopRepository.createQueryBuilder("shop");
            qb = qb.andWhere(
                "status!=-3 AND player_id=:uid AND goods_id=:goodsId AND payId!=:payId",
                {
                    uid: Number(uid),
                    goodsId: item.goodsId,
                    payId: payId
                }
            );

            if (item.totalLimit <= (await qb.getCount())) {
                return {
                    code: this.config.get("code.AUTHERROR"),
                    data: { msg: "购买到达总限制" },
                };
            }
        }

        if ((!!item && !!item.dailyLimit) || goodsId == shopConstConfig.insideShopGoodsId.dailywage) {
            // 单日限制
            let qb: any = this.shopRepository.createQueryBuilder("shop");
            qb = qb.andWhere(
                "create_time BETWEEN :start AND :end AND status!=-3 AND player_id=:uid AND goods_id=:goodsId AND payId!=:payId",
                {
                    start: await this.config.today(),
                    end: (await this.config.today()) + 86399,
                    uid: Number(uid),
                    goodsId: goodsId,
                    payId: payId
                }
            );

            if (goodsId == shopConstConfig.insideShopGoodsId.dailywage) {
                if (1 <= (await qb.getCount())) {
                    return {
                        code: this.config.get("code.AUTHERROR"),
                        data: { msg: "购买到达单日限制" },
                    };
                }
            } else {
                if (item.dailyLimit <= (await qb.getCount())) {
                    return {
                        code: this.config.get("code.AUTHERROR"),
                        data: { msg: "购买到达单日限制" },
                    };
                }
            }
        }

        return { code: CodeEnum.OK, data: "可以发送到游戏服" };
    }

    async aliPayResult(body: any): Promise<any> {
        const handleResult: any = {}; // todo 支付返回结果
        if (null == handleResult) {
            return "Success";
        }
        //TODO 从原来的数据库中查询付款记录，发货
        await this.payResult(handleResult.payId, handleResult.succ);
        return "Success";
    }

    /**
     * google支付结果
     * 参考文档 http://www.wangwenyong.com/?p=306
     * @param body
     */
    async googleResult(body: any): Promise<any> {
        if(body.orderId!=undefined&&body.productId!=undefined&&body.token!=undefined){
            return {
                code: this.config.get("code.PARAMSERROR"),
                msg: "googleResult参数异常！"
            };
        }
        let purchaseState:any=await this.config.get("orderStatus.googlePurchaseState");
        let orderStatus:any=await this.config.get("orderStatus.orderStatus");
        let consumptionStatus:any=await this.config.get("orderStatus.googleConsumptionStatus");
        let orderId = body.orderId;
        let payId = body.payId;
        let productId = body.productId;

        let old:any=await this.shopRepository.find({payId:payId});
        if(old.length==0){
            return {
                code: this.config.get("code.ORDER_ERROR_NOTFOUND"),
                msg: "找不到订单1: " + payId,
            };
        }
        if(old.length>1){
            return {
                code: this.config.get("code.ORDER_ERROR_REPEAT"),
                msg: "同单号查到多个订单: " + payId,
            };
        }
        old=old[0];
        let handleResult:any=await this.checkGoogleOrder(old.googleProductId,body.token);
        if (!!handleResult && handleResult.code) {
            return handleResult;
        }
        //判断令牌订单号和api查到的订单号是否相同
        if(orderId!==handleResult.orderId){
            return {
                code: this.config.get("code.INERROR"),
                msg: "订单异常"
            };
        }
        await this.shopRepository.update({payId:old.payId},{transOrderId:handleResult.orderId,
            extStatus:consumptionStatus.YET_CONSUMER});
        //判断订单是否存在

        //判断订单是否已关闭
        if(old.status==orderStatus.PAYMENT_FAILURE){
            return {
                code: this.config.get("code.ORDER_CLOSED"),
                msg: "订单已关闭"
            };
        }
        if(purchaseState.PURCHASED==handleResult.purchaseState){
            return await this.payResult(old.payId, true);
        }else {
            let state=orderStatus.WAIT_FOR_PAYMENT;
            if(handleResult.purchaseState==purchaseState.CANCELED){
                state=orderStatus.PAYMENT_FAILURE;
                await this.shopRepository.update({payId:old.payId},{status:state,});
                return {
                    code: this.config.get("code.ORDER_CLOSED"),
                    msg: "订单已关闭"
                };
            }
            if(handleResult.purchaseState==purchaseState.PENDING) state=orderStatus.WAIT_FOR_PAYMENT;
            await this.shopRepository.update({payId:old.payId},{status:state,});
            return {
                code: this.config.get("code.ORDER_PAY_ERROR"),
                msg: "订单未支付成功"
            };
        }

    }
    /**
     * //更新google商品的消费状态
     *
     * @param body
     */
    async googleConsume(body: any): Promise<any> {
        let purchaseState:any=await this.config.get("orderStatus.googlePurchaseState");

        let consumptionStatus:any=await this.config.get("orderStatus.googleConsumptionStatus");
        let order:any=await this.shopRepository.find({payId:body.payId});
        if(order.length==0){
            return {
                code: this.config.get("code.ORDER_ERROR_NOTFOUND"),
                msg: "找不到订单1: " + body.payId,
            };
        }
        if(order.length>1){
            return {
                code: this.config.get("code.ORDER_ERROR_REPEAT"),
                msg: "同单号查到多个订单: " + body.payId,
            };
        }
        order=order[0];
        let handleResult:any=await this.checkGoogleOrder(order.googleProductId,body.token);
        if (!!handleResult && handleResult.code) {
            return handleResult;
        }

        if(consumptionStatus.CONSUMERED==order.extStatus){
            return {
                code: this.config.get("code.ORDER_ERROR_STATUS"),
                msg: "异常，订单已消费"
            };
        }
        if(order.transOrderId!=handleResult.orderId){
            return {
                code: this.config.get("code.ORDER_ERROR_GOOGLE_ORDERID"),
                msg: "GOOGLE订单号不符"
            };
        }
        if(order.payId!=handleResult.obfuscatedExternalProfileId){
            return {
                code: this.config.get("code.ORDER_ERROR"),
                msg: "订单号不符"
            };
        }
        if(consumptionStatus.CONSUMERED==handleResult.consumptionState) {
            await this.shopRepository.update({payId:order.payId},{extStatus:consumptionStatus.CONSUMERED});
            return { code: CodeEnum.OK,msg:"订单消费成功",data:JSON.stringify({})};
        }
        return {
            code: this.config.get("code.ORDER_ERROR"),
            msg: "订单异常"
        };
    }

    private async freeOfRecharge(
        params: any,
        player: any,
        payId: string,
        goods: any,
        item: any,
        t1
    ): Promise<any> {
        let addData = {
            playerId: Number(player.uid),
            nickname: player.nickname, //player.nickname ? player.nickname : "空",
            qid: player.qid,
            goodsName: goods.goodsName,
            money: goods.amount,
            payType: "A2G",
            msg: JSON.stringify(item),
            createTime: _.now() / 1000,
            payId: payId,
            goodsId: goods.goodsId,
            status: -3, // 等待支付
            vip: player.vip,
            gainItemType: goods.gainItemType,
            gold: goods.gold,
            ap: goods.ap,
            stone: goods.stone,
            redBag: goods.redBag,
            drawsymbol: goods.drawsymbol,
            addLotteryPoolGold: item.addLotteryPoolGold,
            lotteryId: item.lotteryId,
            rewardItems: goods.rewardItems,
            freeGift: goods.freeGift, // 赠送
            tabType: goods.tabType,
            appType: player.registerAppType,
            extStatus:0
        };
        await this.shopRepository.insert(addData);
        let res = await this.payResult(payId, true, goods.goodsId, item);
        if (!!res && res.code == 200) {
            return { code: CodeEnum.OK, data: res };
        }

        return { code: this.config.get("code.INERROR"), data: res };
    }



    private async google(
        params: any,
        player: any,
        payId: string,
        goods: any,
        item: any,
        t1
    ): Promise<any> {
        let addData:any;
        try {
            addData = {
                playerId: Number(player.uid),
                nickname: player.nickname, //player.nickname ? player.nickname : "空",
                qid: player.qid,
                goodsName: goods.goodsName,
                money: goods.amount,
                payType: "google",
                msg: JSON.stringify(item),
                createTime: _.now() / 1000,
                payId: payId,
                goodsId: goods.id,
                status: -3, // 等待支付
                vip: player.vip,
                gold: goods.gold,
                stone: goods.stone,
                rewardItems: goods.rewardItems,
                freeGift: goods.freeGift, // 赠送
                tabType: goods.tabType,
                goodsType: goods.goodsType,
                appType: player.registerAppType,
                googleProductId:goods.googleProductId
            };

            //assert(item.constItem.type === 1);
            await this.shopRepository.insert(addData);
        } catch (error) {
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxee", error);
            return { code: this.config.get("code.INERROR"), data: { msg: error } };
        }

        if (!!this.config.get("gameConfig.localDev")) {
            setTimeout(() => {
                this.payResult(payId, true, goods.goodsId, item);
            }, 3000);
            return {
                code: CodeEnum.OK,
                payInfo: {
                    areuok: false,
                },
            };
        }
        let  payInfo:any={
            payId:addData.payId,
            productId:addData.googleProductId
        }

        // todo 支付订单
        return { code: CodeEnum.OK,  data:JSON.stringify(payInfo) };
    }

    public async getPayId() {
        return process.env.NOW_ENV + "pay" + (await this.config.formateTime(new Date(), "yyyyMMddhms")) + Math.floor(Math.random() * 10000) + this.config.nonceStr(4);
    }
    private chunkSplit(paramString, paramLength, paramEnd = '\n') {
        let p = [];
        let s = paramString;
        while (s.length > paramLength) {
            let s1 = s.substr(0, paramLength);
            let s2 = s.substr(paramLength);
            s = s2;
            p.push(s1);
        }
        if (s.length > 0) {
            p.push(s);
        }
        p.push('');
        return p.join(paramEnd);
    }

    /**
     * 定时更新google令牌
     * @param body
     * @private
     */

    @Interval(3400000)
    private async refreshToken() : Promise<any> {
        let handleResult: any;
        try {
            handleResult = await rp({
                url: "https://accounts.google.com/o/oauth2/token",
                method: "POST",
                json: true,
                body: {
                    grant_type : "refresh_token",
                    client_id:"803832407387-8dkkjd7cn7qa96336e2a8g0ma0bpo8kk.apps.googleusercontent.com",
                    client_secret:"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",
                    refresh_token:"1//0e8WRGx6ObEcBCgYIARAAGA4SNwF-L9IrnjJxHi-qcA6Evng3wFpj8v2zwfxAfQOXjJCn6jXOc71kHScSTC3the-ENVqw4Shbygo"
                }
            });
        } catch (error) {
            console.log("gooogle===refreshToken=========================================================",error)
        }
        this.accessToken=handleResult.access_token;

        return handleResult.access_token;
    }
    /**
     * 查询google订单
     * @param body
     * @private
     */
    public async checkGoogleOrder(productId,token): Promise<any> {
        if(this.accessToken==""){
            await this.refreshToken();
            console.log(this.accessToken);
        }
        let handleResult: any;
        try {
            handleResult = await rp({
                url: "https://www.googleapis.com/androidpublisher/v3/applications/com.to.slot/purchases/products/"
                    + productId
                    + "/tokens/" +
                    token +
                    "?access_token="+this.accessToken,
                method: "GET",
            });
        } catch (error) {
            return {
                code: this.config.get("code.ORDER_ERROR_GOOGLE_REFER"),
                msg: "Google返回异常", line: 1811
            };
        }
        //判断google返回
        if(_.isString(handleResult)){
            handleResult=JSON.parse(handleResult);
            return handleResult;
        }else{
            return {
                code: this.config.get("code.PARAMSERROR"),
                msg: "参数异常！", line: 1821
            };
        }
    }
}
