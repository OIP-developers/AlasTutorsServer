
import { Prisma } from '@prisma/client'
import { ViewRepository } from './view.repository'

export class CourseController {

  private ViewRepository: ViewRepository = new ViewRepository()

  async create() {
    await this.ViewRepository.findMany<Prisma.ViewWhereInput, Prisma.ViewInclude>({
      where: {},
      include: {}
    })
  }

}