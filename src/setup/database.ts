import { initializeApp, cert } from "firebase-admin/app";

export const database = () => {
  initializeApp({
    credential: cert(JSON.parse(process.env.SERVICE_ACCOUNT as any)),
  });
  // const db = getFirestore();
};
