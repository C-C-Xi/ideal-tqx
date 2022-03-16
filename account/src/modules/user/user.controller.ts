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

import {UserService} from "./user.service";
import {NotificationConfigDto} from "./dtos/notificationConfig.dto";
import {LoginDto} from "./dtos/Login.dto";
import {LogService} from "./log.service";
import {ShareDto} from "./dtos/Share.dto";
import {UnbindDto} from "./dtos/Unbind.dto";
import {ErrorLogDto} from "./dtos/ErrorLog.dto";
import {LoginLogDto} from "./dtos/LoginLog.dto";
import {VipConfigDto} from "./dtos/VipConfig.dto";

@ApiTags('public') // 在swagger API文档添加标签名称，独立的一项列表
@ApiHeader({
  name: 'X-MyHeader',
  description: '自定义标题',
})
@Controller('public')
export class UserController {

  /**
   * EventPattern 只发布事件,无需等待响应
   */
  constructor(
      private readonly userService: UserService,
      private readonly logService: LogService,
  ) {
  }

  // 获取消息通知
  @Get("getNotification")
  // @UseGuards(AuthGuard())
  async getNotification(@Query() notificationConfigDto: NotificationConfigDto): Promise<any> {
    return this.userService.getNotification(notificationConfigDto);
  }

  // 客户端登录注册
  @Post("G2A_Access")
  async G2A_Access(@Body() loginDto: LoginDto): Promise<any> {
      return await this.userService.G2A_Access_Super(loginDto);
  }
  // 增加授权信息
  @Post("G2A_Unbind")
  async G2A_Auth(@Body() unbindDto: UnbindDto): Promise<any> {
    let res: any= await this.userService.G2A_Unbind(unbindDto);
    return res;
  }

  // 分享回调信息
  @Get("G2A_share")
  async G2A_share(@Query() shareDto: ShareDto): Promise<any> {
    let res: any= await this.userService.G2A_share(shareDto);
    return res;
  }



  @Post("errorlog")
  async clientPost(@Body() errorLogDto: ErrorLogDto): Promise<any> {
    return await this.logService.errorlog(errorLogDto);
  }

  @Post("loginlog")
  async loginlog(@Body() loginLogDto: LoginLogDto): Promise<any> {
    return await this.logService.loginlog(loginLogDto);
  }

  @Post("vipConfig")
  async getVipConfig(@Body() vipConfigDto: VipConfigDto): Promise<any> {
    return await this.userService.getVipConfig(vipConfigDto);
  }
  @Get("vipConfig")
  async getVipConfigG(@Body() vipConfigDto: VipConfigDto): Promise<any> {
    return await this.userService.getVipConfig(vipConfigDto);
  }

  @Post("setAndroidAntiEmuInfo")
  async setAndroidAntiEmuInfo(@Body() body: any): Promise<any> {
    return await this.userService.setAndroidAntiEmuInfo(body);
  }

}
