import { model, Schema, Document } from 'mongoose';
import { USER_DOCUMENT_NAME } from '../../../database/model/User';
// import { DOCUMENT_NAME as QUESTIONS_DOCUMENT_NAME } from '../StrategyQuestions/Question';

export const DOCUMENT_NAME = 'Campaign';
export const COLLECTION_NAME = 'Campaigns';

export interface IModal {
  answer: any;
  question: string;
  user: string;
  isDeleted?: boolean;
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema({
  plan: {
    campaign_goal: {
      type: Schema.Types.String,
      required: true,
    },
    audience_targeting: {
      use_Audience_targeting: {
        type: Schema.Types.String,
        required: true,
      },
      use_Custom_audience: {
        all_gender: {
          type: Schema.Types.String,
          required: true,
        },
        all_ages: {
          type: Schema.Types.String,
          required: true,
        }
      }
    },
    schedule: {
      start_date: {
        type: Schema.Types.Date,
        required: true,
      },
      End_date: {
        type: Schema.Types.Date,
        required: true,
      }
    }
  },
  position: {
    design_campaign: {
      info: {
        job_title: {
          type: Schema.Types.String,
          required: true,
        },
        job_description: {
          type: Schema.Types.String,
          required: true,
        },
        job_location: {
          type: Schema.Types.String,
          required: true,
        },
        employement_type: {
          type: Schema.Types.String,
          required: true,
        },
        job_function: {
          type: Schema.Types.String,
          required: true,
        },
        job_level: {
          type: Schema.Types.String,
          required: true,
        },
        company_industry: {
          type: Schema.Types.String,
          required: true,
        },
        add_required_skills: {
          type: Schema.Types.String,
          required: true,
        }
      },
      native: {
        ad_title: {
          type: Schema.Types.String,
          required: true,
        },
        ad_description: {
          type: Schema.Types.String,
          required: true,
        },
        url: {
          type: Schema.Types.String,
          required: true,
        },
        file_path: {
          type: Schema.Types.String,
          required: true,
        }
      },
      display: {
        ad_title: {
          type: Schema.Types.String,
          required: true,
        },
        ad_description: {
          type: Schema.Types.String,
          required: true,
        },
        url: {
          type: Schema.Types.String,
          required: true,
        },
        file_path: {
          type: Schema.Types.String,
          required: true,
        }
      },
      video: {
        video_title: {
          type: Schema.Types.String,
          required: true,
        },
        video_description: {
          type: Schema.Types.String,
          required: true,
        },
        url: {
          type: Schema.Types.String,
          required: true,
        },
        file_path: {
          type: Schema.Types.String,
          required: true,
        }
      },
      Audio: {
        ad_title: {
          type: Schema.Types.String,
          required: true,
        },
        ad_description: {
          type: Schema.Types.String,
          required: true,
        },
        url: {
          type: Schema.Types.String,
          required: true,
        },
        file_path: {
          type: Schema.Types.String,
          required: true,
        }
      }
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: USER_DOCUMENT_NAME,
    required: true,
  },

  // @meta
  isDeleted: {
    type: Schema.Types.Boolean,
    default: false
  }
},
  {
    versionKey: false,
    timestamps: true
  }
)

export const Modal = model<DocumentModal>(DOCUMENT_NAME, schema, COLLECTION_NAME)
