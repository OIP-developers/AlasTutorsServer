/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface CreateRecruitmentInterviewPayloadDTO {
  fromTime: Date;
  hosts: string[];
  invitedCandidates: string[];
  jobId: string;
  toTime: Date;
}

export interface RecruitmentInterviewDBDataVaidationSchemaDTO {
  hosts: string[];
  invitedCandidates: string[];
  jobId: string;
  urlCode: string;
}
