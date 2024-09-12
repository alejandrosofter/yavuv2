export default function FirebaseAdminConfig() {
  // return {
  //   type: "service_account",
  //   project_id: "yavu-98cac",
  //   private_key_id: "bd01fd37721fbe25dee6f0f26eede5418eb9d35f",
  //   private_key:
  //     "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDbgVW3+YvNBLz\nuU57aCfUaFPvPX0TPgqWWY2/TQ9ve5WnVJDpTvE7oIglvfgr28RPAC0tfrpHyq6e\ndsmV2xxdHsemKtnWALCck2eN744wDyRBVAP/QKi7VJ6DZhw6N0Wl3zKOFqyDPm/G\nza0PZ+z8RWQDS4lKRrkJf95snE9ClOyk6flRepQuw37MtcADhSAdpcB0aTzd91e+\n2pAi3XA+Ct2fql9mYMsNAPGSMFG0+ERPsI5B5tCv7ae2iA6lY/oD2KxsFVuTJdlo\nJGQ80XINPka05cUE34KJ5uZyO7NNCtzx4x8fvqQTMtekCQAiD8zqnzK1NOqE3YNA\nJx+EhzipAgMBAAECggEAAfR7Moy/62xS5qPpB9ReBDTqi3c/ij5Ym0SBbvfyM56N\nRPS43WQO9M1akHU8FTdhRwnBPDq9foglx7BBTsilh6upeiHkrcNEgQdWnK6ztB1N\nhRTIi09mGdw3qwPpTpejmbDxFqKUygDkt0qFFLeNQS5fz8p756Wir5hkVjF0QNBZ\nk2msvE6thPh1hHt+GpFVLvxxaIc/kJz9FCL85FMtsfri0FFjtKNO/6y4vkj5SQaT\nMBWIOVCJigaQFEKUuGeFGfQTlkvg7BZClDQzRUdBab6twPg29N8pxzbf0DN0NQ/z\nyfmYiV17bmGSwrfUtZYS5Oel5EdvbkLAVBiDBXeV7QKBgQD4yE0ndzSKKyStsjkj\nqeXjPRLf/ziceu+2IKhBBbaTSLw5SkJV3N9zcOuJtP4P20jzFrJNIEWTyS7H8CVV\nplLInmAMEIsg/LJyb9pLJYGa3OVhitL5Rk/xP6qvg35a6URfkEgKH+uGgSGGHVpl\n0BtrDVAt2U0zNUxlBqRsXaidzQKBgQDJGXiZzFV5kCiwIYZ+EIQSO4UDo84JTFHC\n1+Q68BuZ4zdEEio1AkhnlX+3qIlZIDTqsCDmjvy1aK3Y8OYujMIz4Aolr4UfgTld\njoOs7+Qs3uWUSp7zUPUIgNQgpV1r0tiGFXc8u1D/pA5HW4bCtg6xABYoi+WZHJgg\nMeceUXzKTQKBgQDeKxIrslqrIQgqTcSVQr5Xhkz62JMXuvmjLdrT5mQ7d3MPvm8q\n+opaL3dIjOduBahJ3fTwx2cbKUirqJvOty+qlTS00XlNxh0d8SGChkYNpEL8Lttl\nXRM7IF4vS0Bls3cp2FFdKVBN17e2azQ1Q/mYSlVV/H7iwjAs8BeZ5rIT6QKBgGtV\nJ/RWhix6z+yqCCGS6RreH7GApUB7NoxbNFpsux6Ykm/HjjV6wXBf76nzz1L9iKDW\nXskP+jtM4rUOZpzjzedoJaJVmyTkkNypawhLhaqZUUmjxlCxngbq082U1VbuU1jF\nbj3A8ItxYZmedT/Jce/wzuLXQDVHeL5+RA//iC5lAoGBAL7FVNWT4delCb+CCbAM\nQc0bL7DmpwNWTECC87ITyAAyXflltiE77US3w8RCtFz9P49Gb4Oln0Gr1SNkjric\n3BvtVSToWm9EEDZViNGs9vT7qkbGdrGqj/daGyPoa0btbWWEnU7x0V3R4tUN4+lh\nbMMsmszr1UG85wab1jakheMf\n-----END PRIVATE KEY-----\n",
  //   client_email: "firebase-adminsdk-g6vwf@yavu-98cac.iam.gserviceaccount.com",
  //   client_id: "114277722785484871399",
  //   auth_uri: "https://accounts.google.com/o/oauth2/auth",
  //   token_uri: "https://oauth2.googleapis.com/token",
  //   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  //   client_x509_cert_url:
  //     "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-g6vwf%40yavu-98cac.iam.gserviceaccount.com",
  //   universe_domain: "googleapis.com",
  // };
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
