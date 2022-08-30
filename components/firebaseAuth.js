import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";

// Note that next-firebase-auth inits Firebase for us,
// so we don't need to.

const firebaseAuthConfig = {
  // signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers

  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
      fullLabel: "Ingresa con Email",
    },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
      fullLabel: "Ingresa con Google",
    },
    // {
    //   provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //   requireDisplayName: false,
    //   fullLabel:"Ingresa con Facebook"
    // },

    // {
    //   provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    //   requireDisplayName: false,
    //   fullLabel:"Ingresa con tu Telefono"
    // },
  ],
  signInSuccessUrl: "/",
  credentialHelper: "none",
  callbacks: {
    // https://github.com/firebase/firebaseui-web#signinsuccesswithauthresultauthresult-redirecturl
    signInSuccessWithAuthResult: (authResult) => {
      // console.log(authResult, authResult.user.uid);
      localStorage.setItem(
        "credenciales",
        JSON.stringify(authResult.credentials)
      );
      localStorage.setItem("usermod", authResult.user.uid);
      return false;
    },
  },
};

const FirebaseAuth = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);
  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  );
};

export default FirebaseAuth;
