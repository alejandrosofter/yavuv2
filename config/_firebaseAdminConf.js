export default function FirebaseAdminConfig() {
  return {
    credential: {
      languageCode: "es",
      projectId: "yavu-98cac",
      clientEmail: "firebase-adminsdk-g6vwf@yavu-98cac.iam.gserviceaccount.com",
      // The private key must not be accesssible on the client side.
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    },
    databaseURL: "https://yavu-98cac-default-rtdb.firebaseio.com",
  };
}
