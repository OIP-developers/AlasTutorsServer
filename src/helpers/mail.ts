import {  ZOHOMAIL } from '../config'

import Logger from '../core/Logger'
import { SMTP } from '../config/globals'
import nodemailer from 'nodemailer'
import sgMail from '@sendgrid/mail'

export interface IMessage {
  to: string,
  subject: string,
  text: string,
  html: string,
}

sgMail.setApiKey(SMTP.SENDGRID_API_KEY)

export const sendMail = (msg: IMessage) => {
  sgMail
    .send({
      from: SMTP.SENDGRID_SENDER,
      ...msg
    })
    .then((response) => {
      Logger.info(`email send to ${msg.to}`)
    })
    .catch((error) => {
      Logger.error(`email send field ${msg.to}`)
      Logger.error(error)
    })
}

const transporter = nodemailer.createTransport({
   // @ts-ignore
  host: ZOHOMAIL.host,
  port: ZOHOMAIL.port,
  secure: true,
  auth: {
    user: ZOHOMAIL.user,
    pass: ZOHOMAIL.pass
  }
})

export interface IMessage2 {
  to: string;
  content: string;
  text: string;
  subject: string;
  html?: "" | string;
}

export const sendMail2 = (message: IMessage2) => {
  return new Promise((resolve, reject) => {
    if (!message.to || !message.content || !message.subject) {
      return reject(new Error('Failed because incomplete email parameters'))
    } else {
      let options = {}
      if (message.html) {
        options = {...message, from: ZOHOMAIL.user, html: message.html}
      } else {
        options = {...message, from: ZOHOMAIL.user, html:`<p>${message.text}</p>` }
      }
      console.log(options)
      return transporter.sendMail(options, (error, info) => {
        if (error) return reject(error);
        return resolve(info)
      })
    }
  })
}

export const findUser = (users: User[], _id: string): [boolean, User, number] => {
  let success = false;
  let userIndex = 0;
  let userObj = users.find((u, index) => {
    if (u._id === _id) {
      userIndex = index;
      success = true;
    }
  });
  return [success, userObj!, userIndex];
};

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: {
    _id: string;
    code: string;
  };
  verified: boolean;
  status: boolean;
}