export default function FirebaseAdminConfig() {
  return {
    credential: {
      languageCode: "es",
      projectId: "yavu2-ba118",
      clientEmail: "firebase-adminsdk-fbsvc@yavu2-ba118.iam.gserviceaccount.com",
      // The private key must not be accesssible on the client side.
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    },
    databaseURL: "https://yavu2-ba118-default-rtdb.firebaseio.com",
  };
}
