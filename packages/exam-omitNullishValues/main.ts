// # Exam - Generic type for `omitNullishValues`
//
// Please define a type for the function `omitNullishValues`.
//
// The function can be implemented using `es-toolkit` as follows:

import type { Equals } from "tsafe";
import { omitBy } from "es-toolkit";
import { assert } from "tsafe";

const nullishValues = [null, undefined] as const;

// However, the type inferred from the function might not be ideal. Therefore,
// we want to make it more type-friendly to enhance the developer experience:

function omitNullishValues<T extends Record<string, any>>(
  input: T,
): OmitNullishValues<T> {
  return omitBy(input, (value) =>
    nullishValues.includes(value),
  ) as unknown as OmitNullishValues<T>;
}

/**
 * TODO: Fix the type of `OmitNullishValues<TInput>` to make the test cases pass.
 *
 * Please remove the `any` type and replace it with the correct type.
 */
type OmitNullishValues<TInput extends Record<string, any>> = ReturnType<
  typeof omitBy<TInput>
>;

/* _____________ Test Cases _____________ */
const anyForAssertion: any = undefined;

interface Input {
  stringNullable: string | null;
  string: string;
  stringNullableOptional?: string | null;
  stringOptional?: string;
  numberNullable: number | null;
  number: number;
  numberNullableOptional?: number | null;
  numberOptional?: number;
  undefined: undefined;
  null: null;
  nullOptional?: null;
}

interface Expected {
  stringNullable?: string;
  string: string;
  stringNullableOptional?: string;
  stringOptional?: string;
  numberNullable?: number;
  number: number;
  numberNullableOptional?: number;
  numberOptional?: number;
}

type Result = OmitNullishValues<Input>;

// @ts-expect-error -- TODO: remove this comment and fix the type.
anyForAssertion as Result satisfies Expected;
anyForAssertion as Expected satisfies Result;
// @ts-expect-error -- TODO: remove this comment and fix the type.
assert<Equals<Result, Expected>>(true);

export { omitNullishValues };
