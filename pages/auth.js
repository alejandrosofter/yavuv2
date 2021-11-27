import React from 'react'
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import FirebaseAuth from '../components/firebaseAuth'
import LayoutLogin from '../components/layoutLogin'

const Auth = () => (
    <LayoutLogin>
        <FirebaseAuth />
    </LayoutLogin>
  
)

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth)