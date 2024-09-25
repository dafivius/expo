/**
 * The main routing type for Expo Router.
 *
 * @internal:
 */
export namespace ExpoRouter {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface __routes {}
}

/**
 * The main routing type for Expo Router. Includes all available routes with strongly typed parameters.
 *
 * A Href can either be a string or an object.
 *
 * The generic will be removed in 4.0
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Href<T = string> = ExpoRouter.__routes extends { Href: any }
  ? ExpoRouter.__routes['Href']
  : string | { pathname: string; params?: UnknownInputParams };

export type HrefParams<T extends string> = ExpoRouter.__routes extends {
  HrefParams: Record<string, object>;
}
  ? ExpoRouter.__routes['HrefParams'][T]
  : Record<string, UnknownInputParams>;

/**
 * Routes can have known inputs (e.g query params)
 * Unlike outputs, inputs can be undefined or null
 */
export type UnknownInputParams = Record<
  string,
  string | number | undefined | null | (string | number)[]
>;

/**
 * Routes can have unknown outputs (e.g query params)
 * Unlike inputs, outputs can't be undefined or null
 */
export type UnknownOutputParams = Record<string, string | string[]>;

export type RouteParams<Path extends string> = HrefParams<Path>;

/**
 * @deprecated Use RouteParams or StrictRouteParams instead
 */
export type SearchParams<T extends string = never> = RouteParams<T>;

export type RouteSegments<PathOrStringArray extends string | string[]> =
  PathOrStringArray extends string[]
    ? PathOrStringArray
    : PathOrStringArray extends `/${infer PartA}`
      ? RouteSegments<PartA>
      : PathOrStringArray extends `${infer PartA}/${infer PartB}`
        ? [PartA, ...RouteSegments<PartB>]
        : [PathOrStringArray];
