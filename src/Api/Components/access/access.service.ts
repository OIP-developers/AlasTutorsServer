import { generateTokenKey } from "../../../helpers/tokenKeyGenerator";
import { createTokens, getAccessToken, validateTokenData } from '../../../utils/authUtils';
import { RoleCode } from '../../../database/model/Role';
import UserRepo from '../../../database/repository/UserRepo';
import User from '../../../database/model/User';
import { Tokens } from 'app-request';
import KeystoreRepo from '../../../database/repository/KeystoreRepo';

export class AccessService {

  async generate(type: 'SIGNUP' | 'SIGNIN', user: User): Promise<{ tokens: Tokens, user: User }> {
    const accessTokenKey = generateTokenKey();
    const refreshTokenKey = generateTokenKey();

    if (type === 'SIGNUP') {
      const { user: createdUser } = await UserRepo.create(
        user as User,
        accessTokenKey,
        refreshTokenKey,
        // @ts-ignore
        user.role,
      );
      user = createdUser
    }

    const keystore = await KeystoreRepo.create(user._id, accessTokenKey, refreshTokenKey);

    const tokens = await createTokens(user, { ip: "0.0.0.0" }, keystore.primaryKey, keystore.secondaryKey);
    return { tokens, user: user };
  }

}
