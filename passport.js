import passport from "passport";
import FacebookStrategy from "passport-facebook";
import GithubStrategy from "passport-github";
import User from "./models/User";
import userController from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://tidy-horse-7.localtunnel.me${
        routes.facebookCallback
      }`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"]
    },
    userController.facebookLogin
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:3000${routes.githubCallback}`
    },
    userController.githubLogin
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
