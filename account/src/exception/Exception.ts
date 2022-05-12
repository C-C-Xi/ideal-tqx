import {HttpException, HttpStatus, Injectable} from '@nestjs/common';


@Injectable()
export class Exception {

    public static toException(errorCode,msg:string="",data?) {
        if(msg!=""){
            errorCode.message=msg
        }
        if(data){
            errorCode.data=data
        }
        return new HttpException(errorCode.name,
            HttpStatus.EXPECTATION_FAILED,
        );
    }

}
