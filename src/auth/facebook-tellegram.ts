import passport from "passport";
// @ts-ignore
import { Strategy } from "passport-telegram";

passport.serializeUser((user, done) => done(null, user));
// @ts-ignore
passport.deserializeUser((user, done) => done(null, user));

// passport.use(new Strategy({
//   clientID: "611015742909469",
//   clientSecret: "757**********************bed",
//   callbackURL: "http://localhost:8000/auth/facebook/callback"
// },
//   function (accessToken, refreshToken, profile, done) {
//     return done(null, profile);
//   }
// ));
console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");

passport.use(
  new Strategy({
    clientID: '123-456-789',
    clientSecret: 'shhh-its-a-secret',
    callbackURL: 'https://www.example.net/auth/telegram/callback',
  },
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
      console.log("===================================================");
      console.log("Strategy")
      done({}, {});
      // User.findOrCreate(..., function (err, user) {
      //     done(err, user);
      // });
    }
  ));
