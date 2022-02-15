// import { getFunctions, httpsCallable } from 'firebase/functions';

// interface FirstFunctionInput {
//   x: number;
// }

// interface SecondFunctionInput {
//   y: string;
// }

// interface FunctionInputs {
//   firstFunction: {
//     input: FirstFunctionInput;
//     output: { data: number };
//   };
//   secondFunction: {
//     input: SecondFunctionInput;
//     output: { data: boolean };
//   };
// }

// function callFirebaseFunction<K extends keyof FunctionInputs>(fn: K) {
//   return (
//     input: FunctionInputs[K]['input']
//   ): Promise<FunctionInputs[K]['output']> => {
//     return httpsCallable(getFunctions(), fn)(input);
//   };
// }

// callFirebaseFunction('firstFunction')({ x: 1 }).then((res) => {
//   /* { data: number } */
// });
// callFirebaseFunction('secondFunction')({ y: '1' }).then((res) => {
//   /* { data: boolean } */
// });
