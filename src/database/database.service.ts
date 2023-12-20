// import mongoose, { ClientSession, ConnectOptions } from 'mongoose';

// interface QueryFunctionObject {
//   queryFunc: (session: ClientSession, previousResult?: any) => Promise<any>;
//   previousResult?: any;
// }

// export class DatabaseService {
//   // private readonly session: ClientSession;

//   constructor() {
//   }

//   async performTransaction(queryFuncObjects: QueryFunctionObject[]): Promise<any[]> {
//     const session : ClientSession = await mongoose.startSession();
//     session.startTransaction();
//     let previousResult = null;
//     const results = [];

//     try {
//       for (const queryFuncObject of queryFuncObjects) {
//         const { queryFunc, previousResult: prevResult } = queryFuncObject;

//         const result = await queryFunc(session, previousResult || prevResult);
//         results.push(result);
//         previousResult = result;
//       }

//       await session.commitTransaction();
//       return results;
//     } catch (error) {
//       await session.abortTransaction();
//       throw error;
//     } finally {
//       session.endSession();
//     }
//   }

// }

// async function query1(session: ClientSession) {
//   // perform database operation using the session
//   return result1;
// }

// async function query2(session: ClientSession, previousResult: any) {
//   // perform database operation using the session and previous result
//   return result2;
// }