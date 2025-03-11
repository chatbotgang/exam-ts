// *Problem*:
//
// Please enhance the type definition of the makeApi function to improve
// developer experience.
//
// - Third-party TypeScript utilities are permitted.
//
// - Please make the API accessible with `api.query.[alias]` and
//   `api.mutation.[alias]`.
//  - If `(endpoint.method === "get")`, it's a query;
//  - Otherwise, it's a mutation.

import type { Equals } from "tsafe";
import { assert } from "tsafe";
import { z } from "zod";

function noop(..._args: Array<any>) {}

interface BaseEndpoint {
  alias: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  path: string;
  parameters: z.ZodSchema;
  response: z.ZodSchema;
}

/**
 * TODO: Enhance the type definition of the makeApi function to improve developer experience.
 */
interface ApiSdk<_TApi extends Array<BaseEndpoint>> {
  query: Record<string, (params?: any) => Promise<any>>;
  mutation: Record<string, (params?: any) => Promise<any>>;
}

function makeApi<const TApi extends Array<BaseEndpoint>>(
  api: TApi,
): ApiSdk<TApi> {
  noop(api);
  // Ignore the implementation here.
  const proxy: any = new Proxy(noop, {
    get() {
      return proxy;
    },
  });
  return proxy;
}

const api = makeApi([
  {
    alias: "getItem",
    method: "get",
    path: "/some/where/to/request",
    parameters: z.object({
      foo: z.string(),
      bar: z.number(),
      baz: z.date(),
    }),
    response: z.object({
      foo: z.string(),
      bar: z.number(),
      baz: z.coerce.date(),
    }),
  },
  {
    alias: "createItem",
    method: "post",
    path: "/some/where/to/request",
    parameters: z.object({
      update: z.string(),
    }),
    response: z.object({
      result: z.object({
        foo: z.string(),
        bar: z.number(),
        baz: z.coerce.date(),
      }),
    }),
  },
  {
    alias: "removeItem",
    method: "delete",
    path: "/some/where/to/request",
    parameters: z.void(),
    response: z.void(),
  },
]);

// - Ensure that the endpoints have type-safe parameters and responses, as shown
//   in the following code example.
(async () => {
  // @ts-expect-error -- TODO: remove this comment and fix the type.
  const getItemResult = await api.query.getItem({
    //  ^?const getItemResult: { foo: string; bar: number; baz: Date; }
    foo: "foo",
    bar: Math.random(),
    baz: new Date(),
  });
  // @ts-expect-error -- TODO: remove this comment and fix the type.
  assert<Equals<typeof getItemResult, { foo: string; bar: number; baz: Date }>>(
    true,
  );
  // @ts-expect-error -- TODO: remove this comment and fix the type.
  const createItemResult = await api.mutation.createItem({
    //  ^?const createItemResult: { result: { foo: string; bar: number; baz: Date; }; }
    update: "qux",
  });
  assert<
    // @ts-expect-error -- TODO: remove this comment and fix the type.
    Equals<
      typeof createItemResult,
      { result: { foo: string; bar: number; baz: Date } }
    >
  >(true);
  // @ts-expect-error -- TODO: remove this comment and fix the type.
  const removeItemResult = await api.mutation.removeItem();
  // @ts-expect-error -- TODO: remove this comment and fix the type.
  assert<Equals<typeof removeItemResult, void>>(true);
})();
