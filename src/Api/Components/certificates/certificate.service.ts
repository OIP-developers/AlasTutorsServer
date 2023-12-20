import { Repository } from './repository';

export class CertificateService {

  async calculateOneViewVal(count: number, total: number) {
    return (count / total) * 100
  }

  async createAssigned(req: any, certificate: any) {

    const { bucket: assignCert } = await Repository.createAssignCertificate({
      certificate: certificate._id,
      course: req.body.course,
      user: req.user._id,
      status: "PENDING",
      //@ts-ignore
      progress: await this.calculateOneViewVal(1, certificate.course.number_of_lessons)
    });


    return assignCert
  }

  async updateAssigned(req: any, assignedExist: any, certificate: any) {
    const countViews = await Repository.countView({ user: req.user._id, course: req.body.course })

    const { data: assignCert } = await Repository.updateAssignCertificate(assignedExist._id, {
      ...assignedExist,
      //@ts-ignore
      status: certificate.course.number_of_lessons !== countViews ? "PENDING" : "COMPLETE",
      //@ts-ignore
      progress: await this.calculateOneViewVal(1, certificate.course.number_of_lessons) * countViews,
      //@ts-ignore
      endDate: certificate.course.number_of_lessons === countViews ? Date.now() : null,
    });

    return assignCert
  }



}
