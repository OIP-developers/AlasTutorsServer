import { AMAZON_GC } from "../config";
const { createGiftCard } = require('amazon-gc')

export interface gcRes {
  cardInfo: {
    cardNumber: string | number | null,
    cardStatus: string,
    expirationDate: string | null,
    value: {
      amount: number,
      currencyCode: string
    }
  }
  creationRequestId: string,
  gcClaimCode: string,
  gcExpirationDate: string | null,
  gcId: string,
  status: string
} 

export async function getGC(amount: number):Promise<gcRes> {
  const request = {
    amount: amount,
    currencyCode: AMAZON_GC.currencyCode,
    partnerId: AMAZON_GC.partnerId,
    accessKey: AMAZON_GC.accessKey,
    secretKey: AMAZON_GC.secretKey,
    environment: AMAZON_GC.environment,
    endpoint: AMAZON_GC.endpoint
  }
  const res = await createGiftCard(request);
  return res;
}

export const emailTemplate = (
  senderName: string, 
  receiverName: string, 
  amount: number,
  code: string,
  optionalMessage?: string
): [string, string] => {
  const html = `
    <p>Congratulations ${receiverName}!,</p>
    <p>An amazon gift certificate, for use at Culturefy, has been given to you by ${senderName} worth ${amount} points.</p>
    <p>Please use the following code on the rewards page to redeem your gift certificate:</p>
    Code: <h4>${code}</h4>
    <br/>
    <p>${optionalMessage}</p>
  `
  const message = `
    Congratulations ${receiverName}!,
    An amazon gift certificate, for use at Culturefy, has been given to you by ${senderName} worth ${amount} points.
    Please use the following code on the rewards page to redeem your gift certificate: ${code}
    <br/>
    <p>${optionalMessage}</p>
  `
  return [message, html];
}