import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  ParseIntPipe,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  UsePipes, Query, Req,
} from '@nestjs/common';
import * as _ from "underscore";
import { IpAddress } from 'src/common/decorators/ip.address';
import { ApiTags, ApiHeader, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import {ShopService} from "./shop.service";
import {CreateLabelDto} from "./dto/create.label.dto";
import {ListShopConfigDto} from "./dto/list.shopConfig.dto";

@ApiTags('shop') // 在swagger API文档添加标签名称，独立的一项列表
@ApiHeader({
  name: 'X-MyHeader',
  description: '自定义标题',
})
@Controller('shop')
export class ShopController {
  private payCache: any;
  constructor(private readonly shopService: ShopService) {
    this.payCache = new Set();
  }

  // 客户端获取配置信息
  @Get("public/getShopConfig")
  async shopConfig(@Query() listShopConfigDto: ListShopConfigDto): Promise<any> {
    return this.shopService.shopConfig(listShopConfigDto);
  }
  @Post("public/getShopConfig")
  async shopConfigPost(@Body() listShopConfigDto: ListShopConfigDto): Promise<any> {
    return this.shopService.shopConfig(listShopConfigDto);
  }

  // 获取购买记录
  @Get("public/getShopLog")
  async getShopLog(@Query() query: any): Promise<any> {
    return this.shopService.getShopLog(query);
  }
  @Post("public/getShopLog")
  async getShopLogP(@Body() body: any): Promise<any> {
    return this.shopService.getShopLog(body);
  }

  // 客户端获取防沉迷限购信息
  @Post("public/getIndulgeCheckPay")
  async getIndulgeCheckPay(@Body() body: any): Promise<any> {
    let res = await this.shopService.getIndulgeCheckPay(body);
    return res;
  }

  // 连续奖励信息
  @Post("public/acContinuousRewardInfo")
  async acContinuousrewardInfo(@Body() body: any): Promise<any> {
    let res = await this.shopService.acContinuousrewardInfo(body);
    return res;
  }

  // 连续奖励 免费领取
  @Post("public/acContinuousreward")
  async acContinuousreward(@Body() body: any): Promise<any> {
    let canDel = false;
    try {
      if (this.payCache.has(Number(body.uid))) {
        return { code: 340701, data: { msg: "acContinuousreward 领取太频繁" } };
      } else {
        this.payCache.add(Number(body.uid));
        canDel = true;
        let res = await this.shopService.acContinuousreward(body);
        return res;
      }
    } catch (error) {
    } finally {
      if (canDel) {
        this.payCache.delete(Number(body.uid));
      }
    }
  }

  @Post("public/pay")
  async pay(@Body() body: any, @Req() req: any): Promise<any> {
    // 支付
    let ip = "0.0.0.0";
    try {
      ip = (
          req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
          req.connection.remoteAddress || // 判断 connection 的远程 IP
          req.socket.remoteAddress || // 判断后端的 socket 的 IP
          req.connection.socket.remoteAddress
      );
    } catch (error) { }

    ip = ip.replace("::ffff:", "");
    let ipAarr = ["127.0.0.1"];
    if (!ipAarr.includes(ip)) {
      console.error("=====================1 IP不正确", ip)
      return;
    }

    let canDel = false; // 防止错误的请求在finally中解锁内存中的id
    try {
      if (this.payCache.has(Number(body.uid))) {
        return { code: 340701, data: { msg: "public/pay 太频繁" } };
      } else {
        this.payCache.add(Number(body.uid));
        canDel = true;

        await this.shopService.addPaylog(body); // 购买参数信息

        let res = await this.shopService.pay(body, (req.headers["x-forwarded-for"] || "").split(","), _.now(), ip);

        // console.log("================================购买返回： ", res);
        return res;
      }
    } catch (error) {
      console.error("================================购买error： ", error);
      return { code: 340705 }
    } finally {
      if (canDel) {
        this.payCache.delete(Number(body.uid));
      }
    }
  }

  @Post("public/alipay_result")
  async alipayResult(@Body() body: any): Promise<any> {
    // 支付结果
    return this.shopService.aliPayResult(body);
  }


  @Post("public/googlepay")
  async googleResult(@Body() body: any): Promise<any> {
    // 支付结果
    if(!body.type){
      return {
        code: 340703,
        msg: "参数异常！", line: 7
      };
    }
    let res:any;
    //校验google支付结果
    if(body.type=="payResult") res=await this.shopService.googleResult(body);
    //更新google商品的消费状态
    if(body.type=="consume") res=await this.shopService.googleConsume(body);

    return res;
  }

}
