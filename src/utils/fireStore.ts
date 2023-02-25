import { QueryOperator } from "@/types/firestore";
import { Firestore } from "@/utils/firebase";
import { QuerySnapshot} from "@firebase/firestore";
import { deleteField } from "firebase/firestore";
import { FieldPath, query, setDoc, UpdateData, where } from "@firebase/firestore";

import { collection, deleteDoc, doc, getDocs, updateDoc, FieldValue } from 'firebase/firestore';

type operator = '<' | '<=' | '===' | '!==' |'>=' | '>' | 'include' | 'in' | 'notInclude';

export interface FirestoreDeleteProps {
  [key: string]: FieldValue;
}

export type FirestoreReadDataType<T> = T & {
  documentId: string;
}

export interface QueryOption {
  path: string | FieldPath;
  operator: operator;
  value: unknown;
}

/**
 * @description firestore에 데이터 쓰기
 * @param collectionKey: 콜렉션 키 값
 * @param documentKey: 도큐먼트 키 값
 * @param writeData: 작성할 필드 및 값 Object
 */
export const writeDb = async <T extends {}>(collectionKey: string, documentKey: string, writeData: T) => {
  try {
    await setDoc(doc(Firestore, collectionKey, documentKey), writeData);
  } catch (err) {
    throw new Error(`Firestore write Error: ${err}`);
  }
}

/**
 * @description firestore 에서 해당 collection을 모두 가져올 때 사용
 * @param collectionKey: 콜렉션 키 값
 * @param options: 쿼리 정보 ({path: 'name', operator: '===', value: '상규'})
 */
export const readDb = async <T>(collectionKey: string, options?: QueryOption): Promise<FirestoreReadDataType<T>[]> => {
  if (options) {
    const optionalData: FirestoreReadDataType<T>[] = await readOptional(collectionKey, options);

    return optionalData;
  } else {
    const generalData: FirestoreReadDataType<T>[] = await readGeneral(collectionKey);

    return generalData;
  }
}

/**
 * @description firestore 필드 데이터 업데이트 하기
 * @param collectionKey: 콜렉션 키 값
 * @param documentKey: 도큐먼트 키 값
 * @param field: 업데이트할 필드 및 값 Object
 */
export const updateDb = async <T extends FieldValue>(collectionKey: string, documentKey: string, field: UpdateData<T>) => {
  try {
    const docRef = doc(Firestore, collectionKey, documentKey);
    await updateDoc(docRef, field);
  } catch (err) {
    throw new Error(`Firestore update Error: ${err}`);
  }
}

/**
 * @description firestore 필드 삭제
 * @param collectionKey: 콜렉션 키 값
 * @param documentKey: 도큐먼트 키 값
 * @param field: 삭제할 필드들의 key배열
 *
 */
export const deleteFieldDb = async(collectionKey: string, documentKey: string, field: string[]) => {
  try {
    const docRef = doc(Firestore, collectionKey, documentKey);
    const removeFieldObject: FirestoreDeleteProps = fireStoreDeleteObject(field);

    await updateDoc(docRef, removeFieldObject);
  } catch (err) {
    throw new Error(`Firestore remove Field Error: ${err}`);
  }
}

/**
 * @description firestore 도큐먼트 삭제
 * @param collectionKey: 콜렉션 키 값
 * @param documentKey: 도큐먼트 키 값
 *
 */
export const deleteDocsDb = async(collectionKey: string, documentKey: string) => {
  try {
    await deleteDoc(doc(Firestore, collectionKey, documentKey));
  } catch (err) {
    throw new Error(`Firestore delete Docs Error: ${err}`);
  }
}

/**
 * @description 쿼리 데이터 가공 함수
 * @param storeData 쿼리해온 데이터
 */
const fireStoreData = <T>(storeData: QuerySnapshot) => {
  const readDataArr: FirestoreReadDataType<T>[] = [];

  storeData.forEach((docs) => {
    const readData = docs.data() as T;
    readDataArr.push({...readData, documentId: String(docs.id)});
  })

  return readDataArr;
}

/**
 * @description 삭제할 데이터 가공
 * @param field 삭제할 필드들의 key 배열
 */
const fireStoreDeleteObject = (field: string []) => {
  const removeFieldObject: FirestoreDeleteProps = {};

  field.forEach((fieldKey) => {
    removeFieldObject[`${fieldKey}`] = deleteField();
  });

  return removeFieldObject;
}

/**
 * @description 일반적인 쿼리
 * @param collectionKey: 콜렉션 키 값
 */
const readGeneral = async <T>(collectionKey: string): Promise<FirestoreReadDataType<T>[]> => {
  try {
    const readStore = await getDocs(collection(Firestore, collectionKey));
    const resultData = fireStoreData<T>(readStore);

    return resultData;
  } catch (err) {
    throw new Error(`Firestore read Error: ${err}`);
  }
}

/**
 * @description 옵셔널 쿼리
 * @param collectionKey: 콜렉션 키 값
 * @param options: 쿼리 정보 ({path: 'name', operator: '===', value: '상규'})
 */
const readOptional = async <T>(collectionKey: string, options: QueryOption): Promise<FirestoreReadDataType<T>[]> => {
  try {
    const queryStoreData = query(collection(Firestore, collectionKey), where(options.path, QueryOperator[options.operator], options.value));
    const querySnapShot = await getDocs(queryStoreData);
    const resultData = fireStoreData<T>(querySnapShot);

    return resultData;
  } catch (err) {
    throw new Error(`Firestore read Error: ${err}`);
  }
}
