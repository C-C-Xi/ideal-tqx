import * as _ from "underscore";

import {Model} from "mongoose";
import {Injectable, Inject, forwardRef} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as rp from "request-promise";
import {CommonService} from "../common/common.service";
import {Exception} from "../../exception/Exception";
import {ExceptionEnum} from "../../exception/Exception.enum";

// const {OAuth2Client} = require('google-auth-library');
// const NodeRSA = require('node-rsa');
@Injectable()
export class OAuth2Service {
    constructor(
        private readonly commonService: CommonService,
    ) {
        this.commonService = commonService;
    }


    /**
     * facebook授权登录获取用户信息
     * @param params
     */
    async faceBookAuth(params, appData) {
        if (this.commonService.getDevelopType()) {
            return {
                nickName: "测试 ",
                faceImgUrl: "https:\/\/platform-lookaside.fbsbx.com\/platform\/profilepic\/?asid=2992163961095930&gaming_photo_type=unified_picture&ext=1648115203&hash=AeSo0uV6BHphJO_yrqs",
                userId: "2992163961095930"
            }
        }
        //校验token
        const debugUrl = appData.debugUri + "access_token=" + appData.appId + "%7C" + appData.appSecret + "&input_token=" + params.token;
        let debugResult: any;
        try {
            debugResult = await rp({
                url: debugUrl,
                method: "GET",
            });
        } catch (error) {
           throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_HTTP)
        }
        debugResult= JSON.parse(debugResult.trim());
        debugResult=debugResult.data;
        let userData: any;
        if (debugResult.is_valid) {
            try {
                const url = appData.uri + debugResult.user_id + "?fields=id,name,gender,email,picture&access_token=" + params.token;
                userData = await rp({
                    url: url,
                    method: "GET",
                });
            } catch (error) {
                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_HTTP)
            }
        }
        //使用token获取用户信
        if (_.isString(userData)) {
            try {
                userData = JSON.parse(userData.trim());
            } catch (error) {
                throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_JSON)
            }
        }
        const username = userData.name ? userData.name : "player_" + userData.lastUpdated;
        const faceImgUrl = userData.picture.data.url ? userData.picture.data.url : "";
        const facebookInfo = {
            nickName: username,
            faceImgUrl: faceImgUrl,
            userId: userData.id
        }

        return facebookInfo;
    }

    /**
     * google授权登录获取用户信息
     * @param params
     */
    async googleAuth(params, appData) {
        // let ticket;
        // try {
        //     let client=new OAuth2Client(appData.appId,appData.appSecret)
        //     ticket = await client.getTokenInfo( params.token);
        // } catch (error) {
        //     return {
        //         code: this.config.get("code.INERROR"),
        //         data: error,
        //         line: 8,
        //     };
        // }
        // const payload = ticket.getPayload();
        // const userid = payload['sub'];
        // const faceImgUrl = payload.picture
        //     ? payload.picture
        //     : "http://static.7866game.com/" + params.faceurl;
        // const googleInfo = {
        //     nickName: payload.name,
        //     sex: payload.gender ? payload.gender : 1,
        //     faceImgUrl: faceImgUrl,
        //     email: payload.email,
        //     userId: userid
        // }
        // return googleInfo;
    }

    /**
     * apple授权登录获取用户信息
     * @param params
     */
    async appleAuth(params, appData) {
        //
        // if (!params.identityToken) {
        //
        // }
        // let identityTokens = params.identityToken.split("\\.");
        // const data: any = JSON.parse(Base64.decode(identityTokens[0]));
        // const claim: any = JSON.parse(Base64.decode(identityTokens[1]));
        // let kid = String(data.kid);
        // let iss = String(claim.iss);
        // let aud = String(claim.aud);
        // let sub = String(claim.sub);
        // let reuslt = this.verify(publicKey, params.identityToken, aud, sub);
        // if (!reuslt) {
        //
        // }
        // let postData: any = {
        //     userId: sub
        // }
        // return postData;
    }

    /**
     * twitter授权登录获取用户信息
     * @param params
     */
    async twitterAuth(params, appData) {
        const postData = {}
        return postData;
    }

    /**
     * wechat授权登录获取用户信息
     * @param params
     */
    async wechatAuth(params, appData) {
        const postData = {}
        return postData;
    }


    /**
     * 游客登录生成用户信息
     * @param params
     */
    visitLogin(params) {
        const username = "player_" + Date.parse(new Date().toString());
        const faceImgUrl = "http://static.7866game.com/" + params.faceurl;
        const postData = {
            nickName: username,
            faceImgUrl: faceImgUrl,
            loginType: "visitor"
        }
        return postData;
    }

    /**
     * 短信登录生成用户信息
     * @param params
     */
    phoneLogin(params) {
        const postData = {};
        return postData;
    }


    async getAuthData(params, type = 'guest') {

        let appData={};
        if(type!="guest"){
            appData = this.commonService.get("OAuth2." + type);
        }
        let postData: any = {};
        switch (type) {
            case "facebook"  :
                postData = await this.faceBookAuth(params, appData);
                break;
            case "wechat"  :
                postData = await this.wechatAuth(params, appData);
                break;
            case "twitter"  :
                postData = await this.twitterAuth(params, appData);
                break;
            case "google"  :
                postData = await this.googleAuth(params, appData);
                break;
            case "apple"  :
                postData = await this.appleAuth(params, appData);
                break;
            case "mobile"  :
                postData = await this.phoneLogin(params);
                break;

            default :
                postData = this.visitLogin(params);
        }
        return postData;
    }

}
