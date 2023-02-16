import { firebaseConfig } from "@/constants/config";
import { FieldPath, query, setDoc, UpdateData, where, WhereFilterOp } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { collection, deleteDoc, deleteField, doc, getDocs, getFirestore, updateDoc, FieldValue } from 'firebase/firestore';
import { useCallback } from "react";

interface FirestoreDeleteProps {
    [key: string]: FieldValue;
}

type FirestoreReadDataType<T> = T & {
    documentId: string;
}

interface QueryOption {
    path: string | FieldPath;
    operator: WhereFilterOp;
    value: unknown;
}

export const useFireStore = () => {
    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);

    /**
     * @description firestore에 데이터 쓰기
     * @param collectionKey: 콜렉션 키 값
     * @param documentKey: 도큐먼트 키 값
     * @param writeData: 작성할 필드 및 값 Object
     */
    const writeStore = useCallback(async <T extends {}>(collectionKey: string, documentKey: string, writeData: T) => {
        try {
            await setDoc(doc(db, collectionKey, documentKey), writeData);
        } catch (err) {
            throw new Error(`Firestore write Error: ${err}`);
        }
    }, [db]);

    /**
     * @description firestore 에서 해당 collection을 모두 가져올 때 사용
     * @param collectionKey: 콜렉션 키 값
     */
    const readStore = useCallback(async <T>(collectionKey: string): Promise<FirestoreReadDataType<T>[]> => {
        try {
            const readStore = await getDocs(collection(db, collectionKey));
            const readDataArr: FirestoreReadDataType<T>[] = [];

            readStore.forEach((docs) => {
                const readData = docs.data() as T;
                readDataArr.push({...readData, documentId: String(docs.id)});
            })

            return readDataArr;
        } catch (err) {
            throw new Error(`Firestore read Error: ${err}`);
        }
    }, [db]);

    /**
     * @description firestore 해당 collection에서 조건부로 읽을 때 사용
     * @param collectionKey: 콜렉션 키 값
     * @param options: 쿼리 정보 ({path: 'name', operator: '===', value: '상규'})
     */
    const queryStore = useCallback(async <T>(collectionKey: string, options: QueryOption): Promise<FirestoreReadDataType<T>[]> => {
        try {
            const queryStoreData = await query(collection(db, collectionKey), where(options.path, options.operator, options.value));
            const querySnapShot = await getDocs(queryStoreData);
            const readDataArr: FirestoreReadDataType<T>[] = [];

            querySnapShot.forEach((docs) => {
                const readData = docs.data() as T;
                readDataArr.push({...readData, documentId: String(docs.id)});
            })

            return readDataArr;
        } catch (err) {
            throw new Error(`Firestore read Error: ${err}`);
        }
    }, [db]);

    /**
     * @description firestore 필드 데이터 업데이트 하기
     * @param collectionKey: 콜렉션 키 값
     * @param documentKey: 도큐먼트 키 값
     * @param field: 업데이트할 필드 및 값 Object
     *
     */
    const updateStore = useCallback(async <T extends FieldValue>(collectionKey: string, documentKey: string, field: UpdateData<T>) => {
        try {
            const docRef = doc(db, collectionKey, documentKey);
            await updateDoc(docRef, field);
        } catch (err) {
            throw new Error(`Firestore update Error: ${err}`);
        }
    }, [db]);

    /**
     * @description firestore 필드 삭제
     * @param collectionKey: 콜렉션 키 값
     * @param documentKey: 도큐먼트 키 값
     * @param field: 삭제할 필드들의 key배열
     *
     */
    const removeField = useCallback(async(collectionKey: string, documentKey: string, field: string[]) => {
        try {
            const docRef = doc(db, collectionKey, documentKey);
            const removeFieldObject: FirestoreDeleteProps = {};

            field.forEach((fieldKey) => {
                removeFieldObject[`${fieldKey}`] = deleteField();
            })

           await updateDoc(docRef, removeFieldObject);
        } catch (err) {
            throw new Error(`Firestore remove Field Error: ${err}`);
        }
    }, [db]);

    /**
     * @description firestore 도큐먼트 삭제
     * @param collectionKey: 콜렉션 키 값
     * @param documentKey: 도큐먼트 키 값
     *
     */
    const removeDocs = useCallback(async(collectionKey: string, documentKey: string) => {
        try {
             await deleteDoc(doc(db, collectionKey, documentKey));
        } catch (err) {
            throw new Error(`Firestore delete Docs Error: ${err}`);
        }
    }, [db]);

    return {writeStore, readStore, queryStore, updateStore, removeField, removeDocs}
};
