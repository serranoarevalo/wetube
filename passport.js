import passport from "passport";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import userController from "./controllers/userController";

passport.use(User.createStrategy());

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: "https://tidy-horse-7.localtunnel.me/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"]
    },
    userController.facebookLogin
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
