import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse, FailureMsgResponse, InternalErrorResponse } from '../../../core/ApiResponse';
import { NoDataError } from '../../../core/ApiError';
import _ from 'lodash';
import { Repository } from './repository';
import { defaultJson } from "../../../constants/surveybuilder";
import { CertificateService } from "./certificate.service"

export class Controller {

  readonly service: CertificateService = new CertificateService()

  getAll = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const data = await Repository.find();
      if (!data) throw new NoDataError();
      new SuccessResponse('fetch successfully', { entities: data }).send(res);
    }
  )

  getAllCertifications = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const data = await Repository.findCertifications();
      if (!data) throw new NoDataError();
      return new SuccessResponse('fetch successfully', { entities: data }).send(res);
    }
  )

  getUserCertifications = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const user = req.user
      const data = await Repository.findUserCertifications({ user: user._id, status: "COMPLETE", sent: true });
      if (!data) throw new NoDataError();
      return new SuccessResponse('fetch successfully', { entities: data }).send(res);
    }
  )

  getById = asyncHandler(
    async (req: any, res: any, next: NextFunction): Promise<Response | void> => {
      const data = await Repository.findById(req.params._id);
      if (!data) throw new NoDataError();
      new SuccessResponse('Fetch successfully', { entities: data }).send(res);
    }
  )

  add = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await Repository.create(req.body);
      const createSurvey = await Repository.createCertificateSurvey({ ...req.body, certificate: data._id, survey: JSON.stringify(defaultJson) });
      if (!createSurvey) {
        await Repository.delete(data._id)
        throw new FailureMsgResponse("Something Went Wrong")
      }
      new SuccessResponse('Added successfully', { entity: data }).send(res);
    }
  )

  delete = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await Repository.delete(req.params._id);
      new SuccessResponse('deleted successfully', { entity: data }).send(res);
    }
  )

  update = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await Repository.update(req.params._id, req.body)
      new SuccessResponse('update success', { entity: data }).send(res);
    }
  )


  getByCertificateId = asyncHandler(
    async (req: any, res: any, next: NextFunction): Promise<Response | void> => {
      const data = await Repository.findByCertificateId(req.params._id);
      if (!data) throw new NoDataError();
      new SuccessResponse('Fetch successfully', { entities: data }).send(res);
    }
  )

  updateSurveyCertificate = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await Repository.updateCertificateSurvey(req.params._id, req.body)
      new SuccessResponse('update success', { entity: data }).send(res);
    }
  )

  sendAssignedCertificate = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await Repository.updateAssignCertificate(req.params._id, req.body)
      new SuccessResponse('update success', { entity: data }).send(res);
    }
  )

  // Add View in meta table and assign certificate ( Need to modify )
  addViewCertificate = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const user = req.user

      const viewExist = await Repository.findViewByVideo({ ...req.body, user: user._id })

      if (viewExist) return new SuccessResponse('View Already Exist', { entity: {} }).send(res);

      const { bucket } = await Repository.createCertificateView({ ...req.body, user: user._id });

      const certificate = await Repository.findCertificateByCourse(bucket.course)

      const assignedExist = await Repository.findAssignedCertificate({ user: user._id, course: req.body.course })

      if (assignedExist) {

        const updated = await this.service.updateAssigned(req, assignedExist, certificate)

        return new SuccessResponse('Certificate Progress Updated successfully', { entity: updated }).send(res);
      }

      const updated = await this.service.createAssigned(req, certificate)

      new SuccessResponse('Added successfully', { entity: updated }).send(res);

    }

  )

  addCertificateTestAnswer = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      console.log(req.body, "req.body")

      const assignCertificate = await Repository.findAssignedCertificateById(req.body.assignedCertificate)

      if (!assignCertificate.certificate) throw new InternalErrorResponse("No Assigned Certificate Found!")

      const certificateQuiz = await Repository.findByCertificateId(assignCertificate.certificate._id)

      const { data } = await Repository.createTestAnswer({ ...req.body, certificateQuiz: certificateQuiz._id, user: assignCertificate.user._id })

      const updateAssignCertificate = await Repository.updateAssignCertificate(assignCertificate._id, { ...assignCertificate, certificateQuizAnswer: data._id })

      if (!updateAssignCertificate) throw new InternalErrorResponse("Something Went Wrong")

      new SuccessResponse('Answer Added Successfully', { entity: data }).send(res);
    }
  )



  getUserCertificationById = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const data = await Repository.findUserCertificationById(req.params._id);
      if (!data) throw new NoDataError();
      return new SuccessResponse('fetch successfully', { entities: data[0] }).send(res);
    }
  )

}
