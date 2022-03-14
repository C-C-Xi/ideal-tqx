import {HttpException, HttpStatus, Injectable} from '@nestjs/common';


@Injectable()
export class Exception {

    public static toException(name,msg:string="",data?) {
        let errorCodes = {
            CREATEOK:{status:201, message: ""},
            AUTHERROR:{status:340704, message: ""},
            PARAMSERROR:{status:340703, message: ""},
            NOTFOUND:{status:340703, message: ""},
            INERROR:{status:340705, message: ""},
            GATEERROR:{status:340703, message: ""},
            HANGUP:{status:340701, message: ""},
            SERVICETEMPORARILYUNAVAILABLE:{status:340701, message: ""},



            LOGIN_ERROR_LOCKED:{status:310001, message: "账号被锁定,封禁"},
            LOGIN_ERROR_KICKOUT:{status:310002, message: "解封时间未到"},
            LOGIN_ERROR_TEMPORARILY_CLOSED:{status:310003, message: "停服更新"},
            LOGIN_ERROR_IP_LOCKED:{status:310004, message: "ip被锁定"},
            LOGIN_ERROR_APPTYPE:{status:310005, message: "appType错误"},
            LOGIN_ERROR_HTTP:{status:310006, message: "请求游服异常"},
            LOGIN_ERROR_IP_NOT_FOUND:{status:310007, message: "IP不存在"},
            LOGIN_ERROR__DEVICEINFO:{status:310008, message: "设备号不存在"},

            ORDER_ERROR_NOTFOUND:{status:340901, message: "未找到订单"},
            ORDER_PRODUCT_ERROR:{status:340902, message: "商品与订单商品对不上"},
            ORDER_PAY_ERROR:{status:340903, message: "订单支付异常"},
            ORDER_CSED:{status:340904, message: "订单已关闭"},
            ORDER_ERROR_PRODUCT_NOTFOUND:{status:340905, message: "订单商品未找到"},
            ORDER_ERROR_REPEAT_PAY:{status:340906, message: "重复支付"},
            ORDER_ERROR_STATUS:{status:340907, message: "订单状态异常"},
            ORDER_ERROR:{status:340908, message: "订单异常"},
            ORDER_ERROR_REPEAT:{status:340909, message: "订单已存在"},
            ORDER_ERROR_GOOGLE_REFER:{status:340910, message: "google返回错误"},
            ORDER_ERROR_REPEAT_NOTIFY:{status:340911, message: "重复请求"},
            ORDER_ERROR_GOOGLE_ORDERID:{status:340912, message: "google订单id错误"},
            ORDER_ERROR_ORDERID:{status:340913, message: "订单id错误"},


            SHARE_ERROR_REPEAT:{status:390001, message: "重复分享"},
            SYSTEMS_ERROR_NOT_FOUND: {status: 30404, message: "资源未找到"},
            SYSTEMS_ERROR_PARAMETER: {status: 30404, message: "缺少参数"},


            SYSTEMS_ERROR_USER_NOT_FOUND: {status: 30404, message: "用户不存在"},
            SYSTEMS_ERROR_HTTP: {status: 30404, message: "rp请求异常"},
            SYSTEMS_ERROR_JSON: {status: 30404, message: "JSON格式化异常"},


        };
        let errorCode:any=errorCodes[name];
        if(msg!=""){
            errorCode.message=msg
        }
        if(data!=""){
            errorCode.data=data
        }
        return new HttpException(errorCode[name],
            HttpStatus.EXPECTATION_FAILED,
        );
    }

}
