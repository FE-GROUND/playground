import {FirestoreDeleteProps, FirestoreReadDataType} from "@/hooks/useFirestore";
import {QuerySnapshot} from "@firebase/firestore";
import firebase from "firebase/compat";
import {deleteField} from "firebase/firestore";
import DocumentData = firebase.firestore.DocumentData;

export const fireStoreData = <T>(storeData: QuerySnapshot<DocumentData>) => {
  const readDataArr: FirestoreReadDataType<T>[] = [];

  storeData.forEach((docs) => {
    const readData = docs.data() as T;
    readDataArr.push({...readData, documentId: String(docs.id)});
  })

  return readDataArr;
}

export const fireStoreDeleteObject = (field: string []) => {
  const removeFieldObject: FirestoreDeleteProps = {};

  field.forEach((fieldKey) => {
    removeFieldObject[`${fieldKey}`] = deleteField();
  });

  return removeFieldObject;
}
