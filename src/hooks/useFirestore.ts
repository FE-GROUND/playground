import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, deleteField, doc, getDocs, getFirestore, updateDoc, FieldValue } from 'firebase/firestore';
import { useCallback } from "react";

interface FirestoreWriteProps {
    [key: string]: string;
}

interface FirestoreDeleteProps {
    [key: string]: FieldValue;
}

interface FireStoreReadDataType {
    [key: string]: string;
}

export const useFireStore = () => {
    const firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID,
    };
  
    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);

    /**
     * @param key: 콜렉션 키 값
     * @param writeData: 작성할 필드 및 값
     */
    const writeStore = useCallback(async (key: string, writeData: FirestoreWriteProps) => {
        try {
            await addDoc(collection(db, key), writeData);
        } catch (err) {
            throw new Error(`Firestore write Error: ${err}`);
        }
    }, []);

    /**
     * @param key: 콜렉션 키 값
     */
    const readStore = useCallback(async(key: string): Promise<FireStoreReadDataType[]> => {
        try {
            const readStore = await getDocs(collection(db, key));
            const readDataArr:FireStoreReadDataType[] = [];

            readStore.forEach((docs) => {
                readDataArr.push({...docs.data(), documentId: String(docs.id)});
            })

            return readDataArr;
        } catch (err) {
            throw new Error(`Firestore read Error: ${err}`);
        }
    }, []);

    /**
     * @param collection: 콜렉션 키 값
     * @param document: 도큐먼트 키 값
     * @param field: 업데이트할 필드 및 값
     * 
     */
    const updateStore = useCallback(async(collection: string, document: string, field: FirestoreWriteProps) => {
        try {
            const docRef = doc(db, collection, document);
            await updateDoc(docRef, field);
        } catch (err) {
            throw new Error(`Firestore update Error: ${err}`);
        }
    }, []);

    /**
     * @param collection: 콜렉션 키 값
     * @param document: 도큐먼트 키 값
     * @param field: 삭제할 필드들의 key배열
     * 
     */
    const removeField = useCallback(async(collection: string, document: string, field: string[]) => {
        try {
            const docRef = doc(db, collection, document);
            const removeFieldObject: FirestoreDeleteProps = {};

            field.forEach((fieldKey) => {
                removeFieldObject[`${fieldKey}`] = deleteField();
            })

           await updateDoc(docRef, removeFieldObject);
        } catch (err) {
            throw new Error(`Firestore remove Field Error: ${err}`);
        }
    }, []);

    /**
     * @param collection: 콜렉션 키 값
     * @param document: 도큐먼트 키 값
     * 
     */
    const removeDocs = useCallback(async(collection: string, document: string) => {
        try {
             await deleteDoc(doc(db, collection, document));
        } catch (err) {
            throw new Error(`Firestore delete Docs Error: ${err}`);
        }
    }, []);

    return {writeStore, readStore, updateStore, removeField, removeDocs}
};