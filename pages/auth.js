import React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import FirebaseAuth from "../components/firebaseAuth";
import LayoutLogin from "../components/layoutLogin";
import useLayout from "@hooks/useLayout";

const Auth = () => {
  // useLayout({
  //   label: "",
  //   titulo: "LOGIN",
  //   acciones: [],
  // });
  return (
    <LayoutLogin>
      <FirebaseAuth />
    </LayoutLogin>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
