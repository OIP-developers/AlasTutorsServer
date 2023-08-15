import { ViewModel } from "./view";
import { BaseRepository } from "../../../../core/common/repository";

export class ViewRepository extends BaseRepository<typeof ViewModel> {

  constructor() {
    super({ model: ViewModel })
  }

  // public findMany({ where, include }: { where: Prisma.ViewWhereInput, include: Prisma.ViewInclude }) {
  //   return this.Model && this.Model.findMany({
  //     where,
  //     include,
  //   })
  // }

  // public findOne({ where, include }: { where: Prisma.ViewWhereInput, include: Prisma.ViewInclude }) {
  //   return this.Model && this.Model.findFirst({
  //     where,
  //     include,
  //   })
  // }

  // public findUnique({ where, include }: { where: Prisma.ViewWhereUniqueInput, include: Prisma.ViewInclude }) {
  //   return this.Model && this.Model.findUnique({
  //     where,
  //     include,
  //   })
  // }

  // public create({ data, include }: { data: Prisma.ViewCreateInput, include: Prisma.ViewInclude }) {
  //   return this.Model && this.Model.create({
  //     data,
  //     include,
  //   })
  // }

  // public createMany({ data }: { data: Prisma.ViewCreateManyInput }) {
  //   return this.Model && this.Model.createMany({
  //     data,
  //     skipDuplicates: true
  //   })
  // }

  // public update({ where, data, include }: { where: Prisma.ViewWhereUniqueInput, data: Prisma.ViewCreateManyInput, include: Prisma.ViewInclude }) {
  //   return this.Model && this.Model.update({
  //     where,
  //     data,
  //     include
  //   })
  // }

  // public updateMany({ where, data }: { where: Prisma.ViewWhereInput, data: Prisma.ViewCreateManyInput }) {
  //   return this.Model && this.Model.updateMany({
  //     where,
  //     data,
  //   })
  // }

  // public delete({ where, include }: { where: Prisma.ViewWhereUniqueInput, include: Prisma.ViewInclude }) {
  //   return this.Model && this.Model.delete({
  //     where,
  //     include
  //   })
  // }

  // public deleteMany({ where }: { where: Prisma.ViewWhereInput }) {
  //   return this.Model && this.Model.deleteMany({
  //     where,
  //   })
  // }

}
