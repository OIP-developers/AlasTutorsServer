import User, { UserModel } from './User';
import { Role } from '@prisma/client';
import RoleRepo from "../roles/role.repository"
import { InternalError } from '../../../core/ApiError';
import bcrypt from 'bcrypt';
import KeystoreRepo from './keystore.repository';
import Logger from '../../../core/Logger'
import { Prisma } from '@prisma/client';
import slugify from 'slugify';
import { StudentModel } from './Student';
export default class UserRepo {

  public static find({ where }: { where: Prisma.UserWhereInput }): Promise<User[] | null> {
    return UserModel.findMany({
      where: { ...where }
    })
  }

  public static findStudents(role: Role['code'], id: string) {
    const query: Prisma.StudentWhereInput = {};
        //@ts-ignore TODO:REMOVE THIS TS IGNORE
    if (role === "PARENT") {
      query.parentId = id
    }
    return StudentModel.findMany({
      where: query
    })
  }

  public static findUsers(role: any): Promise<User[] | null> {
    return UserModel.findMany({
      where: {
        role: { code: role }
      },
      include: {
        role: {
          select: {
            id: true,
            code: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  public static findOne({ where }: { where: Prisma.UserWhereInput }) {
    return UserModel.findFirst({
      where,
      include: {
        role: {
          select: {
            id: true,
            code: true
          }
        }
      }
    })
  }

  // public static findTeachers(): Promise<User[] | null> {
  //   return UserModel.findMany({
  //     where: {
  //       role: { code: "DRIVER" }
  //     },
  //     include: {
  //       role: {
  //         select: {
  //           id: true,
  //           code: true
  //         }
  //       }
  //     },
  //     orderBy: { createdAt: 'desc' }
  //   })
  // }

  // public static findEmployeeByCompany(country: string): Promise<User[] | null> {
  //   return UserModel.findMany({
  //     where: {
  //       role: {
  //         code: { in: ["ADMIN", "DRIVER", "USER"] }
  //       },
  //       country
  //     },
  //     include: {
  //       role: {
  //         select: {
  //           id: true,
  //           code: true
  //         }
  //       }
  //     },
  //     orderBy: { createdAt: 'desc' }
  //   })
  // }

  public static findById(id: string): Promise<User | null> {
    return UserModel.findFirst({
      where: { id, status: 'PUBLIC' },
      include: {
        role: {
          select: {
            id: true,
            code: true
          }
        },
      }
    })
  }

  public static findByEmail(email: string): Promise<User | null> {
    return UserModel.findFirst({
      where: { email },
      include: {
        role: {
          select: {
            id: true,
            code: true
          }
        },
        students: true,
      }
    })
  }

  public static findByUsername(username: string): Promise<User | null> {
    return UserModel.findFirst({
      where: {  },
      include: {
        role: {
          select: {
            id: true,
            code: true
          }
        }
      }
    })
  }

  public static findParentById(id: string): Promise<User | null> {
    return UserModel.findUnique({
      where: { id }
    })
  }

  public static async create(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
    roleCode: Role['code'],
  ): Promise<{ user: User | null; keystore: any }> {
    const now = new Date();

    const role = await RoleRepo.findByCode(roleCode)
    if (!role) throw new InternalError('Role must be defined in db!');

    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    if (!user.password) {
      //generating random password
      user.password = Array.from({ length: 8 }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
    }
    const password = bcrypt.hashSync(user.password, 10);
    user.roleId = role.id;

    user.createdAt = user.updatedAt = now;
    user.stripe_customerId = ''
    // @ts-ignore 
    delete user.role
    let username = (`${user.first_name}.${user.last_name}`).toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

    //to generate a unique username
    const userCount = await UserModel.count();
    username = username.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    username = `${username}.${userCount}`;
    
    console.log(user)
    const createdUser = await UserModel.create({
      data: { ...user, password },
      include: {
        role: {
          select: {
            id: true,
            code: true
          }
        }
      }
    });

    const keystore = await KeystoreRepo.create(createdUser.id, accessTokenKey, refreshTokenKey);

    return { user: createdUser, keystore };

  }

  public static async createUser(user: User): Promise<{ user: User | null }> {
    const now = new Date();

    // @ts-ignore 
    const role = await RoleRepo.findByCode(user.role)
    if (!role) throw new InternalError('Role must be defined in db!');

    user.password = bcrypt.hashSync(user.password || "NotPossible", 10);
    user.roleId = role.id;
    user.createdAt = user.updatedAt = now;
    // @ts-ignore 
    delete user.role

    const createdUser = await UserModel.create({
      data: user,
      include: {
        role: {
          select: {
            id: true,
            code: true
          }
        },
      }
    });

    return { user: createdUser };

  }

  public static async update(id: User['id'], user: User): Promise<User | null> {

    // @ts-ignore
    if (user.role) {
      // @ts-ignore
      const role = await RoleRepo.findByCode(user.role)
      if (!role) throw new InternalError('Role must be defined in db!');
      user.roleId = role.id;
    }

    if (user.password) {
      user.password = bcrypt.hashSync(user.password || "NotPossible", 10);
      Logger.info(`user (${user.email}) password update`)
    } else {
      // @ts-ignore 
      delete user.password
    }

    // @ts-ignore 
    delete user.role
    // @ts-ignore 
    delete user.company

    return UserModel.update({
      where: { id },
      data: user,
      include: {
        role: {
          select: {
            id: true,
            code: true
          }
        },
      }
    })
  }

  public static async updatePassword(id: User['id'], { password }: { password: User['password'] }): Promise<User | null> {

    password = bcrypt.hashSync(password || "NotPossible", 10);
    Logger.info(`user (${id}) password update`)

    return UserModel.update({
      where: { id },
      data: {
        password
      },
    })
  }

  // public static async updateCompany(id: User['id'], country: User['country']): Promise<User | null> {

  //   return UserModel.update({
  //     where: { id },
  //     data: { country },
  //     include: {
  //       role: {
  //         select: {
  //           id: true,
  //           code: true
  //         }
  //       },
  //     }
  //   })
  // }

  public static async updateInfo(id: User['id'], user: User): Promise<User | null> {

    // delete user.password
    // delete user.roleId
    // delete user.companyId

    return UserModel.update({
      where: { id },
      data: user,
      include: {
        role: {
          select: {
            id: true,
            code: true
          }
        },
      }
    })
  }

  public static async delete(id: User['id']): Promise<User | null> {
    return UserModel.delete({ where: { id } })
  }

}
