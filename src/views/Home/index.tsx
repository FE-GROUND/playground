// interface TestProps {
//   item: string;
//   name: string;
// }

export const HomeScreen = () => {
  // const {writeStore, readStore, queryStore, updateStore, removeField, removeDocs} = useFireStore();

  // write 테스트
  // const writeTest = useCallback(async () => {
  //     await writeStore<TestProps>('user', {
  //       item: 'SG',
  //       name: '상규',
  //     });
  // }, [writeStore]);

  // read 테스트
  // const readTest = useCallback(async() => {
  //   const data = await readStore<TestProps>('user');
  //
  //   console.log(data);
  // }, [readStore]);

  // query 테스트
  // const queryTest = useCallback(async() => {
  //   const queryOption = {
  //     path: 'name',
  //     operator: '==',
  //     value: '상규'
  //   }
  //
  //   const data = await queryStore<TestProps>('user', queryOption);
  //
  //   console.log(data);
  // }, [queryStore]);

  // update 테스트
  // const updateTest = useCallback(async() => {
  //   const data = await updateStore('user', '019KGrogU9T2YQmlpF4J', {
  //     id: 'happywhn3'
  //   });
  //
  //   console.log(data);
  // }, [updateStore]);

  // remove Field 테스트
  // const removeTest = useCallback(async() => {
  //   const data = await removeField('user', '019KGrogU9T2YQmlpF4J', ['id']);
  //
  //   console.log(data);
  // }, [removeField]);

  // remove Docs 테스트
  // const removeTest = useCallback(async() => {
  //   const data = await removeDocs('user', '019KGrogU9T2YQmlpF4J');
  //   console.log(data);
  // }, [removeDocs]);

  return null;
};
