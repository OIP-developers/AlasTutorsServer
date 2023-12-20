import User from '../../../database/model/User';
import { AppSigninPayloadDTO } from '../../../Interface/payloadInterface/Access';
import { Tokens } from 'app-request';
import { appSigninUserDTO, appSigninDTO } from './access.dto';

export interface IAccessService {

  appSignin(bodyData : AppSigninPayloadDTO): Promise<appSigninDTO>

  generate(type: 'SIGNUP' | 'SIGNIN', user: User): Promise<{ tokens: Tokens, user: User }>
}
