import { firebaseConfig } from "@/constants/config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);

export const Firestore = getFirestore(app);
