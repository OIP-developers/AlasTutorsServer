import { injectable } from 'inversify';
import crypto from 'crypto';
import { IDataManipulationService } from '../interfaces/ijob.service';


@injectable()
export class DataManipulationService implements IDataManipulationService {

  constructor(){}

  gnerateRandomString(length: number = 64, algorithm: 'hex' = 'hex') : string  {
    const a = crypto.randomBytes(length).toString(algorithm) 
    return a
  }
  
}