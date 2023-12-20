import bcrypt from "bcrypt"
import { AuthFailureError } from '../core/ApiError';

export const comparePassword = (password: string, hash: string) => {
    const match = bcrypt.compareSync(password, hash);
    if (!match) throw new AuthFailureError('Invalid credentials');
    else return match;
}