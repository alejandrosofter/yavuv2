import { init } from "next-firebase-auth";
import FirebaseAdminConfig from "./_firebaseAdminConf";
import FirestoreConfig from "./_firestoreConfig";
const initAuth = () => {
  return init({
    authPageURL: "/auth",
    appPageURL: "/",
    loginAPIEndpoint: "/api/login", // required
    logoutAPIEndpoint: "/api/logout", // required
    languageCode: "es",
    firebaseAdminInitConfig: FirebaseAdminConfig(),
    firebaseClientInitConfig: FirestoreConfig(),
    cookies: {
      name: "yavuApp", // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.SECURE_NEXT_AUTH, // set this to false in local (non-HTTPS) development
      signed: true,
    },
  });
};

export default initAuth;
