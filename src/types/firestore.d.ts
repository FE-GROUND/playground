import { FieldPath, QueryFieldFilterConstraint } from "@firebase/firestore";

export const QueryOperator = {
  '<' : '<',
  '<=' : '<=',
  '===' : '==',
  '!==' : '!=',
  '>=' : '>=',
  '>' : '>',
  'include' : 'array-contains' ,
  'in' : 'in' ,
  'notInclude': 'not-in'
}

export type QueryOperator = typeof QueryOperator[keyof typeof QueryOperator];


declare module '@firebase/firestore' {
  export declare function where(fieldPath: string | FieldPath, opStr: QueryOperator, value: unknown): QueryFieldFilterConstraint;
}
