import { useFireStore } from "@/hooks/useFirestore";
import { useCallback } from "react";

export const HomeScreen = () => {
  // const {writeStore, readStore, updateStore, removeField, removeDocs} = useFireStore();

  // write 테스트
  // const writeTest = useCallback(async () => {
  //     await writeStore('user', {
  //       no: '1',
  //       name: '상규',
  //       id: 'happywhn2',
  //       password: 'password',
  //     });
  // }, []);

  // read 테스트
  // const readTest = useCallback(async() => {
  //   const data = await readStore('user');
  
  //   console.log(data); 
  // }, []);

  // update 테스트
  // const updateTest = useCallback(async() => {
  //   const data = await updateStore('user', '019KGrogU9T2YQmlpF4J', {
  //     id: 'happywhn3'
  //   });
  
  //   console.log(data); 
  // }, []);

  // remove Field 테스트
  // const removeTest = useCallback(async() => {
  //   const data = await removeField('user', '019KGrogU9T2YQmlpF4J', ['id']);
  
  //   console.log(data); 
  // }, []);

  // remove Docs 테스트
  // const removeTest = useCallback(async() => {
  //   const data = await removeDocs('user', '019KGrogU9T2YQmlpF4J');
  //   console.log(data); 
  // }, []);

  return null;
};
