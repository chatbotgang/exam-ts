// Please complete the generic type `RoutesToTo` to infer routes and ensure type safety for `to`.
//
// - When the path contains `/:id`, the parameters should be inferred as `{ id: string }`.
// - If a Zod schema is provided in `defineRoutes` for the `parameters`, it should override the default inference.
//   - Example: `{ path: "/foo/:bar", parameters: z.object({ bar: z.number() }) }`
// - If `parameters` are not defined or inferred, they should be omitted.

import { z } from "zod";

interface BaseRouteDefinition {
  path: string;
  parameters?: z.ZodSchema;
}

interface RouterDefinition {}

function defineRoutes<const TRoutes extends Array<BaseRouteDefinition>>(
  routes: TRoutes,
): TRoutes {
  return routes;
}

/**
 * TODO: Finish the generic type `RoutesToTo` to make the test cases pass.
 */
type RoutesToTo<_TRoutes extends Array<BaseRouteDefinition>> = never;

type To = RouterDefinition extends { routes: infer TRoutes }
  ? TRoutes extends Array<BaseRouteDefinition>
    ? RoutesToTo<TRoutes>
    : never
  : {
      path: string;
      parameters?: Record<string, any>;
    };

const TypedToSchema = z.string().brand("to");

function to<T extends To>(to: T): z.infer<typeof TypedToSchema> {
  // We don't care the runtime implementation here.
  return to as any;
}

const routes = defineRoutes([
  {
    path: "/",
  },
  {
    path: "/foo/:id",
  },
  {
    path: "/bar/:barId/baz/:bazId",
    parameters: z.object({
      bazId: z.number(),
    }),
  },
]);

routes satisfies Array<BaseRouteDefinition>;

interface RouterDefinition {
  // TODO: uncomment the following line to make the router type-safe.
  // routes: typeof routes;
}

to({
  path: "/",
});

to({
  path: "/foo/:id",
  parameters: {
    id: "1",
  },
});

to({
  path: "/bar/:barId/baz/:bazId",
  parameters: {
    barId: "1",
    bazId: 2,
  },
});
