
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Animal
 * 
 */
export type Animal = $Result.DefaultSelection<Prisma.$AnimalPayload>
/**
 * Model Birth
 * 
 */
export type Birth = $Result.DefaultSelection<Prisma.$BirthPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model EventAnimal
 * 
 */
export type EventAnimal = $Result.DefaultSelection<Prisma.$EventAnimalPayload>
/**
 * Model Lote
 * 
 */
export type Lote = $Result.DefaultSelection<Prisma.$LotePayload>
/**
 * Model Farm
 * 
 */
export type Farm = $Result.DefaultSelection<Prisma.$FarmPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  OWNER: 'OWNER',
  EMPLOYEE: 'EMPLOYEE'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Animals
 * const animals = await prisma.animal.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Animals
   * const animals = await prisma.animal.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.animal`: Exposes CRUD operations for the **Animal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Animals
    * const animals = await prisma.animal.findMany()
    * ```
    */
  get animal(): Prisma.AnimalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.birth`: Exposes CRUD operations for the **Birth** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Births
    * const births = await prisma.birth.findMany()
    * ```
    */
  get birth(): Prisma.BirthDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventAnimal`: Exposes CRUD operations for the **EventAnimal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventAnimals
    * const eventAnimals = await prisma.eventAnimal.findMany()
    * ```
    */
  get eventAnimal(): Prisma.EventAnimalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lote`: Exposes CRUD operations for the **Lote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lotes
    * const lotes = await prisma.lote.findMany()
    * ```
    */
  get lote(): Prisma.LoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.farm`: Exposes CRUD operations for the **Farm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Farms
    * const farms = await prisma.farm.findMany()
    * ```
    */
  get farm(): Prisma.FarmDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Animal: 'Animal',
    Birth: 'Birth',
    Transaction: 'Transaction',
    Event: 'Event',
    EventAnimal: 'EventAnimal',
    Lote: 'Lote',
    Farm: 'Farm',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "animal" | "birth" | "transaction" | "event" | "eventAnimal" | "lote" | "farm" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Animal: {
        payload: Prisma.$AnimalPayload<ExtArgs>
        fields: Prisma.AnimalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnimalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnimalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          findFirst: {
            args: Prisma.AnimalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnimalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          findMany: {
            args: Prisma.AnimalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>[]
          }
          create: {
            args: Prisma.AnimalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          createMany: {
            args: Prisma.AnimalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnimalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>[]
          }
          delete: {
            args: Prisma.AnimalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          update: {
            args: Prisma.AnimalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          deleteMany: {
            args: Prisma.AnimalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnimalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnimalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>[]
          }
          upsert: {
            args: Prisma.AnimalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          aggregate: {
            args: Prisma.AnimalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnimal>
          }
          groupBy: {
            args: Prisma.AnimalGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnimalGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnimalCountArgs<ExtArgs>
            result: $Utils.Optional<AnimalCountAggregateOutputType> | number
          }
        }
      }
      Birth: {
        payload: Prisma.$BirthPayload<ExtArgs>
        fields: Prisma.BirthFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BirthFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BirthFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>
          }
          findFirst: {
            args: Prisma.BirthFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BirthFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>
          }
          findMany: {
            args: Prisma.BirthFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>[]
          }
          create: {
            args: Prisma.BirthCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>
          }
          createMany: {
            args: Prisma.BirthCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BirthCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>[]
          }
          delete: {
            args: Prisma.BirthDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>
          }
          update: {
            args: Prisma.BirthUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>
          }
          deleteMany: {
            args: Prisma.BirthDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BirthUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BirthUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>[]
          }
          upsert: {
            args: Prisma.BirthUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>
          }
          aggregate: {
            args: Prisma.BirthAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBirth>
          }
          groupBy: {
            args: Prisma.BirthGroupByArgs<ExtArgs>
            result: $Utils.Optional<BirthGroupByOutputType>[]
          }
          count: {
            args: Prisma.BirthCountArgs<ExtArgs>
            result: $Utils.Optional<BirthCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      EventAnimal: {
        payload: Prisma.$EventAnimalPayload<ExtArgs>
        fields: Prisma.EventAnimalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventAnimalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAnimalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventAnimalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAnimalPayload>
          }
          findFirst: {
            args: Prisma.EventAnimalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAnimalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventAnimalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAnimalPayload>
          }
          findMany: {
            args: Prisma.EventAnimalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAnimalPayload>[]
          }
          create: {
            args: Prisma.EventAnimalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAnimalPayload>
          }
          createMany: {
            args: Prisma.EventAnimalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventAnimalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAnimalPayload>[]
          }
          delete: {
            args: Prisma.EventAnimalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAnimalPayload>
          }
          update: {
            args: Prisma.EventAnimalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAnimalPayload>
          }
          deleteMany: {
            args: Prisma.EventAnimalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventAnimalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventAnimalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAnimalPayload>[]
          }
          upsert: {
            args: Prisma.EventAnimalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAnimalPayload>
          }
          aggregate: {
            args: Prisma.EventAnimalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventAnimal>
          }
          groupBy: {
            args: Prisma.EventAnimalGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventAnimalGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventAnimalCountArgs<ExtArgs>
            result: $Utils.Optional<EventAnimalCountAggregateOutputType> | number
          }
        }
      }
      Lote: {
        payload: Prisma.$LotePayload<ExtArgs>
        fields: Prisma.LoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          findFirst: {
            args: Prisma.LoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          findMany: {
            args: Prisma.LoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>[]
          }
          create: {
            args: Prisma.LoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          createMany: {
            args: Prisma.LoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>[]
          }
          delete: {
            args: Prisma.LoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          update: {
            args: Prisma.LoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          deleteMany: {
            args: Prisma.LoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>[]
          }
          upsert: {
            args: Prisma.LoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          aggregate: {
            args: Prisma.LoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLote>
          }
          groupBy: {
            args: Prisma.LoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoteCountArgs<ExtArgs>
            result: $Utils.Optional<LoteCountAggregateOutputType> | number
          }
        }
      }
      Farm: {
        payload: Prisma.$FarmPayload<ExtArgs>
        fields: Prisma.FarmFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FarmFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FarmFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          findFirst: {
            args: Prisma.FarmFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FarmFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          findMany: {
            args: Prisma.FarmFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          create: {
            args: Prisma.FarmCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          createMany: {
            args: Prisma.FarmCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FarmCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          delete: {
            args: Prisma.FarmDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          update: {
            args: Prisma.FarmUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          deleteMany: {
            args: Prisma.FarmDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FarmUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FarmUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          upsert: {
            args: Prisma.FarmUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          aggregate: {
            args: Prisma.FarmAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFarm>
          }
          groupBy: {
            args: Prisma.FarmGroupByArgs<ExtArgs>
            result: $Utils.Optional<FarmGroupByOutputType>[]
          }
          count: {
            args: Prisma.FarmCountArgs<ExtArgs>
            result: $Utils.Optional<FarmCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    animal?: AnimalOmit
    birth?: BirthOmit
    transaction?: TransactionOmit
    event?: EventOmit
    eventAnimal?: EventAnimalOmit
    lote?: LoteOmit
    farm?: FarmOmit
    user?: UserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AnimalCountOutputType
   */

  export type AnimalCountOutputType = {
    motherOf: number
    fatherOf: number
    transactions: number
    events: number
    Birth: number
  }

  export type AnimalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    motherOf?: boolean | AnimalCountOutputTypeCountMotherOfArgs
    fatherOf?: boolean | AnimalCountOutputTypeCountFatherOfArgs
    transactions?: boolean | AnimalCountOutputTypeCountTransactionsArgs
    events?: boolean | AnimalCountOutputTypeCountEventsArgs
    Birth?: boolean | AnimalCountOutputTypeCountBirthArgs
  }

  // Custom InputTypes
  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimalCountOutputType
     */
    select?: AnimalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeCountMotherOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BirthWhereInput
  }

  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeCountFatherOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BirthWhereInput
  }

  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventAnimalWhereInput
  }

  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeCountBirthArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BirthWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    animals: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animals?: boolean | EventCountOutputTypeCountAnimalsArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountAnimalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventAnimalWhereInput
  }


  /**
   * Count Type LoteCountOutputType
   */

  export type LoteCountOutputType = {
    animais: number
  }

  export type LoteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animais?: boolean | LoteCountOutputTypeCountAnimaisArgs
  }

  // Custom InputTypes
  /**
   * LoteCountOutputType without action
   */
  export type LoteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoteCountOutputType
     */
    select?: LoteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LoteCountOutputType without action
   */
  export type LoteCountOutputTypeCountAnimaisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimalWhereInput
  }


  /**
   * Count Type FarmCountOutputType
   */

  export type FarmCountOutputType = {
    users: number
    animals: number
    lotes: number
    events: number
    transactions: number
  }

  export type FarmCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | FarmCountOutputTypeCountUsersArgs
    animals?: boolean | FarmCountOutputTypeCountAnimalsArgs
    lotes?: boolean | FarmCountOutputTypeCountLotesArgs
    events?: boolean | FarmCountOutputTypeCountEventsArgs
    transactions?: boolean | FarmCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmCountOutputType
     */
    select?: FarmCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountAnimalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimalWhereInput
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountLotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoteWhereInput
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Animal
   */

  export type AggregateAnimal = {
    _count: AnimalCountAggregateOutputType | null
    _avg: AnimalAvgAggregateOutputType | null
    _sum: AnimalSumAggregateOutputType | null
    _min: AnimalMinAggregateOutputType | null
    _max: AnimalMaxAggregateOutputType | null
  }

  export type AnimalAvgAggregateOutputType = {
    weight: number | null
    purchaseValue: number | null
  }

  export type AnimalSumAggregateOutputType = {
    weight: number | null
    purchaseValue: number | null
  }

  export type AnimalMinAggregateOutputType = {
    id: string | null
    name: string | null
    tag: string | null
    breed: string | null
    gender: string | null
    birthDate: Date | null
    status: string | null
    reproductiveStatus: string | null
    inseminationDate: Date | null
    expectedBirthDate: Date | null
    abortionDate: Date | null
    weight: number | null
    notes: string | null
    purchaseDate: Date | null
    purchaseValue: number | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    farmId: string | null
    loteId: string | null
  }

  export type AnimalMaxAggregateOutputType = {
    id: string | null
    name: string | null
    tag: string | null
    breed: string | null
    gender: string | null
    birthDate: Date | null
    status: string | null
    reproductiveStatus: string | null
    inseminationDate: Date | null
    expectedBirthDate: Date | null
    abortionDate: Date | null
    weight: number | null
    notes: string | null
    purchaseDate: Date | null
    purchaseValue: number | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    farmId: string | null
    loteId: string | null
  }

  export type AnimalCountAggregateOutputType = {
    id: number
    name: number
    tag: number
    breed: number
    gender: number
    birthDate: number
    status: number
    reproductiveStatus: number
    inseminationDate: number
    expectedBirthDate: number
    abortionDate: number
    weight: number
    notes: number
    purchaseDate: number
    purchaseValue: number
    active: number
    createdAt: number
    updatedAt: number
    farmId: number
    loteId: number
    _all: number
  }


  export type AnimalAvgAggregateInputType = {
    weight?: true
    purchaseValue?: true
  }

  export type AnimalSumAggregateInputType = {
    weight?: true
    purchaseValue?: true
  }

  export type AnimalMinAggregateInputType = {
    id?: true
    name?: true
    tag?: true
    breed?: true
    gender?: true
    birthDate?: true
    status?: true
    reproductiveStatus?: true
    inseminationDate?: true
    expectedBirthDate?: true
    abortionDate?: true
    weight?: true
    notes?: true
    purchaseDate?: true
    purchaseValue?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    farmId?: true
    loteId?: true
  }

  export type AnimalMaxAggregateInputType = {
    id?: true
    name?: true
    tag?: true
    breed?: true
    gender?: true
    birthDate?: true
    status?: true
    reproductiveStatus?: true
    inseminationDate?: true
    expectedBirthDate?: true
    abortionDate?: true
    weight?: true
    notes?: true
    purchaseDate?: true
    purchaseValue?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    farmId?: true
    loteId?: true
  }

  export type AnimalCountAggregateInputType = {
    id?: true
    name?: true
    tag?: true
    breed?: true
    gender?: true
    birthDate?: true
    status?: true
    reproductiveStatus?: true
    inseminationDate?: true
    expectedBirthDate?: true
    abortionDate?: true
    weight?: true
    notes?: true
    purchaseDate?: true
    purchaseValue?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    farmId?: true
    loteId?: true
    _all?: true
  }

  export type AnimalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Animal to aggregate.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Animals
    **/
    _count?: true | AnimalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnimalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnimalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnimalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnimalMaxAggregateInputType
  }

  export type GetAnimalAggregateType<T extends AnimalAggregateArgs> = {
        [P in keyof T & keyof AggregateAnimal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnimal[P]>
      : GetScalarType<T[P], AggregateAnimal[P]>
  }




  export type AnimalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimalWhereInput
    orderBy?: AnimalOrderByWithAggregationInput | AnimalOrderByWithAggregationInput[]
    by: AnimalScalarFieldEnum[] | AnimalScalarFieldEnum
    having?: AnimalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnimalCountAggregateInputType | true
    _avg?: AnimalAvgAggregateInputType
    _sum?: AnimalSumAggregateInputType
    _min?: AnimalMinAggregateInputType
    _max?: AnimalMaxAggregateInputType
  }

  export type AnimalGroupByOutputType = {
    id: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date
    status: string
    reproductiveStatus: string | null
    inseminationDate: Date | null
    expectedBirthDate: Date | null
    abortionDate: Date | null
    weight: number | null
    notes: string | null
    purchaseDate: Date | null
    purchaseValue: number | null
    active: boolean
    createdAt: Date
    updatedAt: Date
    farmId: string
    loteId: string | null
    _count: AnimalCountAggregateOutputType | null
    _avg: AnimalAvgAggregateOutputType | null
    _sum: AnimalSumAggregateOutputType | null
    _min: AnimalMinAggregateOutputType | null
    _max: AnimalMaxAggregateOutputType | null
  }

  type GetAnimalGroupByPayload<T extends AnimalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnimalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnimalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnimalGroupByOutputType[P]>
            : GetScalarType<T[P], AnimalGroupByOutputType[P]>
        }
      >
    >


  export type AnimalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tag?: boolean
    breed?: boolean
    gender?: boolean
    birthDate?: boolean
    status?: boolean
    reproductiveStatus?: boolean
    inseminationDate?: boolean
    expectedBirthDate?: boolean
    abortionDate?: boolean
    weight?: boolean
    notes?: boolean
    purchaseDate?: boolean
    purchaseValue?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    loteId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    motherOf?: boolean | Animal$motherOfArgs<ExtArgs>
    fatherOf?: boolean | Animal$fatherOfArgs<ExtArgs>
    childOf?: boolean | Animal$childOfArgs<ExtArgs>
    transactions?: boolean | Animal$transactionsArgs<ExtArgs>
    events?: boolean | Animal$eventsArgs<ExtArgs>
    Birth?: boolean | Animal$BirthArgs<ExtArgs>
    lote?: boolean | Animal$loteArgs<ExtArgs>
    _count?: boolean | AnimalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["animal"]>

  export type AnimalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tag?: boolean
    breed?: boolean
    gender?: boolean
    birthDate?: boolean
    status?: boolean
    reproductiveStatus?: boolean
    inseminationDate?: boolean
    expectedBirthDate?: boolean
    abortionDate?: boolean
    weight?: boolean
    notes?: boolean
    purchaseDate?: boolean
    purchaseValue?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    loteId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    lote?: boolean | Animal$loteArgs<ExtArgs>
  }, ExtArgs["result"]["animal"]>

  export type AnimalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tag?: boolean
    breed?: boolean
    gender?: boolean
    birthDate?: boolean
    status?: boolean
    reproductiveStatus?: boolean
    inseminationDate?: boolean
    expectedBirthDate?: boolean
    abortionDate?: boolean
    weight?: boolean
    notes?: boolean
    purchaseDate?: boolean
    purchaseValue?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    loteId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    lote?: boolean | Animal$loteArgs<ExtArgs>
  }, ExtArgs["result"]["animal"]>

  export type AnimalSelectScalar = {
    id?: boolean
    name?: boolean
    tag?: boolean
    breed?: boolean
    gender?: boolean
    birthDate?: boolean
    status?: boolean
    reproductiveStatus?: boolean
    inseminationDate?: boolean
    expectedBirthDate?: boolean
    abortionDate?: boolean
    weight?: boolean
    notes?: boolean
    purchaseDate?: boolean
    purchaseValue?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    loteId?: boolean
  }

  export type AnimalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "tag" | "breed" | "gender" | "birthDate" | "status" | "reproductiveStatus" | "inseminationDate" | "expectedBirthDate" | "abortionDate" | "weight" | "notes" | "purchaseDate" | "purchaseValue" | "active" | "createdAt" | "updatedAt" | "farmId" | "loteId", ExtArgs["result"]["animal"]>
  export type AnimalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    motherOf?: boolean | Animal$motherOfArgs<ExtArgs>
    fatherOf?: boolean | Animal$fatherOfArgs<ExtArgs>
    childOf?: boolean | Animal$childOfArgs<ExtArgs>
    transactions?: boolean | Animal$transactionsArgs<ExtArgs>
    events?: boolean | Animal$eventsArgs<ExtArgs>
    Birth?: boolean | Animal$BirthArgs<ExtArgs>
    lote?: boolean | Animal$loteArgs<ExtArgs>
    _count?: boolean | AnimalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AnimalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    lote?: boolean | Animal$loteArgs<ExtArgs>
  }
  export type AnimalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    lote?: boolean | Animal$loteArgs<ExtArgs>
  }

  export type $AnimalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Animal"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
      motherOf: Prisma.$BirthPayload<ExtArgs>[]
      fatherOf: Prisma.$BirthPayload<ExtArgs>[]
      childOf: Prisma.$BirthPayload<ExtArgs> | null
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      events: Prisma.$EventAnimalPayload<ExtArgs>[]
      Birth: Prisma.$BirthPayload<ExtArgs>[]
      lote: Prisma.$LotePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      tag: string
      breed: string
      gender: string
      birthDate: Date
      status: string
      reproductiveStatus: string | null
      inseminationDate: Date | null
      expectedBirthDate: Date | null
      abortionDate: Date | null
      weight: number | null
      notes: string | null
      purchaseDate: Date | null
      purchaseValue: number | null
      active: boolean
      createdAt: Date
      updatedAt: Date
      farmId: string
      loteId: string | null
    }, ExtArgs["result"]["animal"]>
    composites: {}
  }

  type AnimalGetPayload<S extends boolean | null | undefined | AnimalDefaultArgs> = $Result.GetResult<Prisma.$AnimalPayload, S>

  type AnimalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnimalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnimalCountAggregateInputType | true
    }

  export interface AnimalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Animal'], meta: { name: 'Animal' } }
    /**
     * Find zero or one Animal that matches the filter.
     * @param {AnimalFindUniqueArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnimalFindUniqueArgs>(args: SelectSubset<T, AnimalFindUniqueArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Animal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnimalFindUniqueOrThrowArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnimalFindUniqueOrThrowArgs>(args: SelectSubset<T, AnimalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Animal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalFindFirstArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnimalFindFirstArgs>(args?: SelectSubset<T, AnimalFindFirstArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Animal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalFindFirstOrThrowArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnimalFindFirstOrThrowArgs>(args?: SelectSubset<T, AnimalFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Animals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Animals
     * const animals = await prisma.animal.findMany()
     * 
     * // Get first 10 Animals
     * const animals = await prisma.animal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const animalWithIdOnly = await prisma.animal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnimalFindManyArgs>(args?: SelectSubset<T, AnimalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Animal.
     * @param {AnimalCreateArgs} args - Arguments to create a Animal.
     * @example
     * // Create one Animal
     * const Animal = await prisma.animal.create({
     *   data: {
     *     // ... data to create a Animal
     *   }
     * })
     * 
     */
    create<T extends AnimalCreateArgs>(args: SelectSubset<T, AnimalCreateArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Animals.
     * @param {AnimalCreateManyArgs} args - Arguments to create many Animals.
     * @example
     * // Create many Animals
     * const animal = await prisma.animal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnimalCreateManyArgs>(args?: SelectSubset<T, AnimalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Animals and returns the data saved in the database.
     * @param {AnimalCreateManyAndReturnArgs} args - Arguments to create many Animals.
     * @example
     * // Create many Animals
     * const animal = await prisma.animal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Animals and only return the `id`
     * const animalWithIdOnly = await prisma.animal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnimalCreateManyAndReturnArgs>(args?: SelectSubset<T, AnimalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Animal.
     * @param {AnimalDeleteArgs} args - Arguments to delete one Animal.
     * @example
     * // Delete one Animal
     * const Animal = await prisma.animal.delete({
     *   where: {
     *     // ... filter to delete one Animal
     *   }
     * })
     * 
     */
    delete<T extends AnimalDeleteArgs>(args: SelectSubset<T, AnimalDeleteArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Animal.
     * @param {AnimalUpdateArgs} args - Arguments to update one Animal.
     * @example
     * // Update one Animal
     * const animal = await prisma.animal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnimalUpdateArgs>(args: SelectSubset<T, AnimalUpdateArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Animals.
     * @param {AnimalDeleteManyArgs} args - Arguments to filter Animals to delete.
     * @example
     * // Delete a few Animals
     * const { count } = await prisma.animal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnimalDeleteManyArgs>(args?: SelectSubset<T, AnimalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Animals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Animals
     * const animal = await prisma.animal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnimalUpdateManyArgs>(args: SelectSubset<T, AnimalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Animals and returns the data updated in the database.
     * @param {AnimalUpdateManyAndReturnArgs} args - Arguments to update many Animals.
     * @example
     * // Update many Animals
     * const animal = await prisma.animal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Animals and only return the `id`
     * const animalWithIdOnly = await prisma.animal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnimalUpdateManyAndReturnArgs>(args: SelectSubset<T, AnimalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Animal.
     * @param {AnimalUpsertArgs} args - Arguments to update or create a Animal.
     * @example
     * // Update or create a Animal
     * const animal = await prisma.animal.upsert({
     *   create: {
     *     // ... data to create a Animal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Animal we want to update
     *   }
     * })
     */
    upsert<T extends AnimalUpsertArgs>(args: SelectSubset<T, AnimalUpsertArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Animals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalCountArgs} args - Arguments to filter Animals to count.
     * @example
     * // Count the number of Animals
     * const count = await prisma.animal.count({
     *   where: {
     *     // ... the filter for the Animals we want to count
     *   }
     * })
    **/
    count<T extends AnimalCountArgs>(
      args?: Subset<T, AnimalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnimalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Animal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnimalAggregateArgs>(args: Subset<T, AnimalAggregateArgs>): Prisma.PrismaPromise<GetAnimalAggregateType<T>>

    /**
     * Group by Animal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnimalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnimalGroupByArgs['orderBy'] }
        : { orderBy?: AnimalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnimalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnimalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Animal model
   */
  readonly fields: AnimalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Animal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnimalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    motherOf<T extends Animal$motherOfArgs<ExtArgs> = {}>(args?: Subset<T, Animal$motherOfArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fatherOf<T extends Animal$fatherOfArgs<ExtArgs> = {}>(args?: Subset<T, Animal$fatherOfArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    childOf<T extends Animal$childOfArgs<ExtArgs> = {}>(args?: Subset<T, Animal$childOfArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    transactions<T extends Animal$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Animal$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends Animal$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Animal$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAnimalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Birth<T extends Animal$BirthArgs<ExtArgs> = {}>(args?: Subset<T, Animal$BirthArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lote<T extends Animal$loteArgs<ExtArgs> = {}>(args?: Subset<T, Animal$loteArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Animal model
   */
  interface AnimalFieldRefs {
    readonly id: FieldRef<"Animal", 'String'>
    readonly name: FieldRef<"Animal", 'String'>
    readonly tag: FieldRef<"Animal", 'String'>
    readonly breed: FieldRef<"Animal", 'String'>
    readonly gender: FieldRef<"Animal", 'String'>
    readonly birthDate: FieldRef<"Animal", 'DateTime'>
    readonly status: FieldRef<"Animal", 'String'>
    readonly reproductiveStatus: FieldRef<"Animal", 'String'>
    readonly inseminationDate: FieldRef<"Animal", 'DateTime'>
    readonly expectedBirthDate: FieldRef<"Animal", 'DateTime'>
    readonly abortionDate: FieldRef<"Animal", 'DateTime'>
    readonly weight: FieldRef<"Animal", 'Float'>
    readonly notes: FieldRef<"Animal", 'String'>
    readonly purchaseDate: FieldRef<"Animal", 'DateTime'>
    readonly purchaseValue: FieldRef<"Animal", 'Float'>
    readonly active: FieldRef<"Animal", 'Boolean'>
    readonly createdAt: FieldRef<"Animal", 'DateTime'>
    readonly updatedAt: FieldRef<"Animal", 'DateTime'>
    readonly farmId: FieldRef<"Animal", 'String'>
    readonly loteId: FieldRef<"Animal", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Animal findUnique
   */
  export type AnimalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal findUniqueOrThrow
   */
  export type AnimalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal findFirst
   */
  export type AnimalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Animals.
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Animals.
     */
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Animal findFirstOrThrow
   */
  export type AnimalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Animals.
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Animals.
     */
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Animal findMany
   */
  export type AnimalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animals to fetch.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Animals.
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Animal create
   */
  export type AnimalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * The data needed to create a Animal.
     */
    data: XOR<AnimalCreateInput, AnimalUncheckedCreateInput>
  }

  /**
   * Animal createMany
   */
  export type AnimalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Animals.
     */
    data: AnimalCreateManyInput | AnimalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Animal createManyAndReturn
   */
  export type AnimalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * The data used to create many Animals.
     */
    data: AnimalCreateManyInput | AnimalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Animal update
   */
  export type AnimalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * The data needed to update a Animal.
     */
    data: XOR<AnimalUpdateInput, AnimalUncheckedUpdateInput>
    /**
     * Choose, which Animal to update.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal updateMany
   */
  export type AnimalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Animals.
     */
    data: XOR<AnimalUpdateManyMutationInput, AnimalUncheckedUpdateManyInput>
    /**
     * Filter which Animals to update
     */
    where?: AnimalWhereInput
    /**
     * Limit how many Animals to update.
     */
    limit?: number
  }

  /**
   * Animal updateManyAndReturn
   */
  export type AnimalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * The data used to update Animals.
     */
    data: XOR<AnimalUpdateManyMutationInput, AnimalUncheckedUpdateManyInput>
    /**
     * Filter which Animals to update
     */
    where?: AnimalWhereInput
    /**
     * Limit how many Animals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Animal upsert
   */
  export type AnimalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * The filter to search for the Animal to update in case it exists.
     */
    where: AnimalWhereUniqueInput
    /**
     * In case the Animal found by the `where` argument doesn't exist, create a new Animal with this data.
     */
    create: XOR<AnimalCreateInput, AnimalUncheckedCreateInput>
    /**
     * In case the Animal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnimalUpdateInput, AnimalUncheckedUpdateInput>
  }

  /**
   * Animal delete
   */
  export type AnimalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter which Animal to delete.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal deleteMany
   */
  export type AnimalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Animals to delete
     */
    where?: AnimalWhereInput
    /**
     * Limit how many Animals to delete.
     */
    limit?: number
  }

  /**
   * Animal.motherOf
   */
  export type Animal$motherOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthInclude<ExtArgs> | null
    where?: BirthWhereInput
    orderBy?: BirthOrderByWithRelationInput | BirthOrderByWithRelationInput[]
    cursor?: BirthWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BirthScalarFieldEnum | BirthScalarFieldEnum[]
  }

  /**
   * Animal.fatherOf
   */
  export type Animal$fatherOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthInclude<ExtArgs> | null
    where?: BirthWhereInput
    orderBy?: BirthOrderByWithRelationInput | BirthOrderByWithRelationInput[]
    cursor?: BirthWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BirthScalarFieldEnum | BirthScalarFieldEnum[]
  }

  /**
   * Animal.childOf
   */
  export type Animal$childOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthInclude<ExtArgs> | null
    where?: BirthWhereInput
  }

  /**
   * Animal.transactions
   */
  export type Animal$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Animal.events
   */
  export type Animal$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnimal
     */
    select?: EventAnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAnimal
     */
    omit?: EventAnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAnimalInclude<ExtArgs> | null
    where?: EventAnimalWhereInput
    orderBy?: EventAnimalOrderByWithRelationInput | EventAnimalOrderByWithRelationInput[]
    cursor?: EventAnimalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventAnimalScalarFieldEnum | EventAnimalScalarFieldEnum[]
  }

  /**
   * Animal.Birth
   */
  export type Animal$BirthArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthInclude<ExtArgs> | null
    where?: BirthWhereInput
    orderBy?: BirthOrderByWithRelationInput | BirthOrderByWithRelationInput[]
    cursor?: BirthWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BirthScalarFieldEnum | BirthScalarFieldEnum[]
  }

  /**
   * Animal.lote
   */
  export type Animal$loteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    where?: LoteWhereInput
  }

  /**
   * Animal without action
   */
  export type AnimalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
  }


  /**
   * Model Birth
   */

  export type AggregateBirth = {
    _count: BirthCountAggregateOutputType | null
    _min: BirthMinAggregateOutputType | null
    _max: BirthMaxAggregateOutputType | null
  }

  export type BirthMinAggregateOutputType = {
    id: string | null
    birthDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    motherId: string | null
    fatherId: string | null
    childId: string | null
    animalId: string | null
  }

  export type BirthMaxAggregateOutputType = {
    id: string | null
    birthDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    motherId: string | null
    fatherId: string | null
    childId: string | null
    animalId: string | null
  }

  export type BirthCountAggregateOutputType = {
    id: number
    birthDate: number
    createdAt: number
    updatedAt: number
    motherId: number
    fatherId: number
    childId: number
    animalId: number
    _all: number
  }


  export type BirthMinAggregateInputType = {
    id?: true
    birthDate?: true
    createdAt?: true
    updatedAt?: true
    motherId?: true
    fatherId?: true
    childId?: true
    animalId?: true
  }

  export type BirthMaxAggregateInputType = {
    id?: true
    birthDate?: true
    createdAt?: true
    updatedAt?: true
    motherId?: true
    fatherId?: true
    childId?: true
    animalId?: true
  }

  export type BirthCountAggregateInputType = {
    id?: true
    birthDate?: true
    createdAt?: true
    updatedAt?: true
    motherId?: true
    fatherId?: true
    childId?: true
    animalId?: true
    _all?: true
  }

  export type BirthAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Birth to aggregate.
     */
    where?: BirthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Births to fetch.
     */
    orderBy?: BirthOrderByWithRelationInput | BirthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BirthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Births from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Births.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Births
    **/
    _count?: true | BirthCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BirthMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BirthMaxAggregateInputType
  }

  export type GetBirthAggregateType<T extends BirthAggregateArgs> = {
        [P in keyof T & keyof AggregateBirth]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBirth[P]>
      : GetScalarType<T[P], AggregateBirth[P]>
  }




  export type BirthGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BirthWhereInput
    orderBy?: BirthOrderByWithAggregationInput | BirthOrderByWithAggregationInput[]
    by: BirthScalarFieldEnum[] | BirthScalarFieldEnum
    having?: BirthScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BirthCountAggregateInputType | true
    _min?: BirthMinAggregateInputType
    _max?: BirthMaxAggregateInputType
  }

  export type BirthGroupByOutputType = {
    id: string
    birthDate: Date
    createdAt: Date
    updatedAt: Date
    motherId: string
    fatherId: string
    childId: string
    animalId: string | null
    _count: BirthCountAggregateOutputType | null
    _min: BirthMinAggregateOutputType | null
    _max: BirthMaxAggregateOutputType | null
  }

  type GetBirthGroupByPayload<T extends BirthGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BirthGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BirthGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BirthGroupByOutputType[P]>
            : GetScalarType<T[P], BirthGroupByOutputType[P]>
        }
      >
    >


  export type BirthSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    birthDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    motherId?: boolean
    fatherId?: boolean
    childId?: boolean
    animalId?: boolean
    mother?: boolean | AnimalDefaultArgs<ExtArgs>
    father?: boolean | AnimalDefaultArgs<ExtArgs>
    child?: boolean | AnimalDefaultArgs<ExtArgs>
    Animal?: boolean | Birth$AnimalArgs<ExtArgs>
  }, ExtArgs["result"]["birth"]>

  export type BirthSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    birthDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    motherId?: boolean
    fatherId?: boolean
    childId?: boolean
    animalId?: boolean
    mother?: boolean | AnimalDefaultArgs<ExtArgs>
    father?: boolean | AnimalDefaultArgs<ExtArgs>
    child?: boolean | AnimalDefaultArgs<ExtArgs>
    Animal?: boolean | Birth$AnimalArgs<ExtArgs>
  }, ExtArgs["result"]["birth"]>

  export type BirthSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    birthDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    motherId?: boolean
    fatherId?: boolean
    childId?: boolean
    animalId?: boolean
    mother?: boolean | AnimalDefaultArgs<ExtArgs>
    father?: boolean | AnimalDefaultArgs<ExtArgs>
    child?: boolean | AnimalDefaultArgs<ExtArgs>
    Animal?: boolean | Birth$AnimalArgs<ExtArgs>
  }, ExtArgs["result"]["birth"]>

  export type BirthSelectScalar = {
    id?: boolean
    birthDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    motherId?: boolean
    fatherId?: boolean
    childId?: boolean
    animalId?: boolean
  }

  export type BirthOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "birthDate" | "createdAt" | "updatedAt" | "motherId" | "fatherId" | "childId" | "animalId", ExtArgs["result"]["birth"]>
  export type BirthInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mother?: boolean | AnimalDefaultArgs<ExtArgs>
    father?: boolean | AnimalDefaultArgs<ExtArgs>
    child?: boolean | AnimalDefaultArgs<ExtArgs>
    Animal?: boolean | Birth$AnimalArgs<ExtArgs>
  }
  export type BirthIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mother?: boolean | AnimalDefaultArgs<ExtArgs>
    father?: boolean | AnimalDefaultArgs<ExtArgs>
    child?: boolean | AnimalDefaultArgs<ExtArgs>
    Animal?: boolean | Birth$AnimalArgs<ExtArgs>
  }
  export type BirthIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mother?: boolean | AnimalDefaultArgs<ExtArgs>
    father?: boolean | AnimalDefaultArgs<ExtArgs>
    child?: boolean | AnimalDefaultArgs<ExtArgs>
    Animal?: boolean | Birth$AnimalArgs<ExtArgs>
  }

  export type $BirthPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Birth"
    objects: {
      mother: Prisma.$AnimalPayload<ExtArgs>
      father: Prisma.$AnimalPayload<ExtArgs>
      child: Prisma.$AnimalPayload<ExtArgs>
      Animal: Prisma.$AnimalPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      birthDate: Date
      createdAt: Date
      updatedAt: Date
      motherId: string
      fatherId: string
      childId: string
      animalId: string | null
    }, ExtArgs["result"]["birth"]>
    composites: {}
  }

  type BirthGetPayload<S extends boolean | null | undefined | BirthDefaultArgs> = $Result.GetResult<Prisma.$BirthPayload, S>

  type BirthCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BirthFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BirthCountAggregateInputType | true
    }

  export interface BirthDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Birth'], meta: { name: 'Birth' } }
    /**
     * Find zero or one Birth that matches the filter.
     * @param {BirthFindUniqueArgs} args - Arguments to find a Birth
     * @example
     * // Get one Birth
     * const birth = await prisma.birth.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BirthFindUniqueArgs>(args: SelectSubset<T, BirthFindUniqueArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Birth that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BirthFindUniqueOrThrowArgs} args - Arguments to find a Birth
     * @example
     * // Get one Birth
     * const birth = await prisma.birth.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BirthFindUniqueOrThrowArgs>(args: SelectSubset<T, BirthFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Birth that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BirthFindFirstArgs} args - Arguments to find a Birth
     * @example
     * // Get one Birth
     * const birth = await prisma.birth.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BirthFindFirstArgs>(args?: SelectSubset<T, BirthFindFirstArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Birth that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BirthFindFirstOrThrowArgs} args - Arguments to find a Birth
     * @example
     * // Get one Birth
     * const birth = await prisma.birth.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BirthFindFirstOrThrowArgs>(args?: SelectSubset<T, BirthFindFirstOrThrowArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Births that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BirthFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Births
     * const births = await prisma.birth.findMany()
     * 
     * // Get first 10 Births
     * const births = await prisma.birth.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const birthWithIdOnly = await prisma.birth.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BirthFindManyArgs>(args?: SelectSubset<T, BirthFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Birth.
     * @param {BirthCreateArgs} args - Arguments to create a Birth.
     * @example
     * // Create one Birth
     * const Birth = await prisma.birth.create({
     *   data: {
     *     // ... data to create a Birth
     *   }
     * })
     * 
     */
    create<T extends BirthCreateArgs>(args: SelectSubset<T, BirthCreateArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Births.
     * @param {BirthCreateManyArgs} args - Arguments to create many Births.
     * @example
     * // Create many Births
     * const birth = await prisma.birth.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BirthCreateManyArgs>(args?: SelectSubset<T, BirthCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Births and returns the data saved in the database.
     * @param {BirthCreateManyAndReturnArgs} args - Arguments to create many Births.
     * @example
     * // Create many Births
     * const birth = await prisma.birth.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Births and only return the `id`
     * const birthWithIdOnly = await prisma.birth.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BirthCreateManyAndReturnArgs>(args?: SelectSubset<T, BirthCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Birth.
     * @param {BirthDeleteArgs} args - Arguments to delete one Birth.
     * @example
     * // Delete one Birth
     * const Birth = await prisma.birth.delete({
     *   where: {
     *     // ... filter to delete one Birth
     *   }
     * })
     * 
     */
    delete<T extends BirthDeleteArgs>(args: SelectSubset<T, BirthDeleteArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Birth.
     * @param {BirthUpdateArgs} args - Arguments to update one Birth.
     * @example
     * // Update one Birth
     * const birth = await prisma.birth.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BirthUpdateArgs>(args: SelectSubset<T, BirthUpdateArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Births.
     * @param {BirthDeleteManyArgs} args - Arguments to filter Births to delete.
     * @example
     * // Delete a few Births
     * const { count } = await prisma.birth.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BirthDeleteManyArgs>(args?: SelectSubset<T, BirthDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Births.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BirthUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Births
     * const birth = await prisma.birth.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BirthUpdateManyArgs>(args: SelectSubset<T, BirthUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Births and returns the data updated in the database.
     * @param {BirthUpdateManyAndReturnArgs} args - Arguments to update many Births.
     * @example
     * // Update many Births
     * const birth = await prisma.birth.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Births and only return the `id`
     * const birthWithIdOnly = await prisma.birth.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BirthUpdateManyAndReturnArgs>(args: SelectSubset<T, BirthUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Birth.
     * @param {BirthUpsertArgs} args - Arguments to update or create a Birth.
     * @example
     * // Update or create a Birth
     * const birth = await prisma.birth.upsert({
     *   create: {
     *     // ... data to create a Birth
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Birth we want to update
     *   }
     * })
     */
    upsert<T extends BirthUpsertArgs>(args: SelectSubset<T, BirthUpsertArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Births.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BirthCountArgs} args - Arguments to filter Births to count.
     * @example
     * // Count the number of Births
     * const count = await prisma.birth.count({
     *   where: {
     *     // ... the filter for the Births we want to count
     *   }
     * })
    **/
    count<T extends BirthCountArgs>(
      args?: Subset<T, BirthCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BirthCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Birth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BirthAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BirthAggregateArgs>(args: Subset<T, BirthAggregateArgs>): Prisma.PrismaPromise<GetBirthAggregateType<T>>

    /**
     * Group by Birth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BirthGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BirthGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BirthGroupByArgs['orderBy'] }
        : { orderBy?: BirthGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BirthGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBirthGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Birth model
   */
  readonly fields: BirthFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Birth.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BirthClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mother<T extends AnimalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimalDefaultArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    father<T extends AnimalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimalDefaultArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    child<T extends AnimalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimalDefaultArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Animal<T extends Birth$AnimalArgs<ExtArgs> = {}>(args?: Subset<T, Birth$AnimalArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Birth model
   */
  interface BirthFieldRefs {
    readonly id: FieldRef<"Birth", 'String'>
    readonly birthDate: FieldRef<"Birth", 'DateTime'>
    readonly createdAt: FieldRef<"Birth", 'DateTime'>
    readonly updatedAt: FieldRef<"Birth", 'DateTime'>
    readonly motherId: FieldRef<"Birth", 'String'>
    readonly fatherId: FieldRef<"Birth", 'String'>
    readonly childId: FieldRef<"Birth", 'String'>
    readonly animalId: FieldRef<"Birth", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Birth findUnique
   */
  export type BirthFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthInclude<ExtArgs> | null
    /**
     * Filter, which Birth to fetch.
     */
    where: BirthWhereUniqueInput
  }

  /**
   * Birth findUniqueOrThrow
   */
  export type BirthFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthInclude<ExtArgs> | null
    /**
     * Filter, which Birth to fetch.
     */
    where: BirthWhereUniqueInput
  }

  /**
   * Birth findFirst
   */
  export type BirthFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthInclude<ExtArgs> | null
    /**
     * Filter, which Birth to fetch.
     */
    where?: BirthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Births to fetch.
     */
    orderBy?: BirthOrderByWithRelationInput | BirthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Births.
     */
    cursor?: BirthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Births from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Births.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Births.
     */
    distinct?: BirthScalarFieldEnum | BirthScalarFieldEnum[]
  }

  /**
   * Birth findFirstOrThrow
   */
  export type BirthFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthInclude<ExtArgs> | null
    /**
     * Filter, which Birth to fetch.
     */
    where?: BirthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Births to fetch.
     */
    orderBy?: BirthOrderByWithRelationInput | BirthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Births.
     */
    cursor?: BirthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Births from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Births.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Births.
     */
    distinct?: BirthScalarFieldEnum | BirthScalarFieldEnum[]
  }

  /**
   * Birth findMany
   */
  export type BirthFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthInclude<ExtArgs> | null
    /**
     * Filter, which Births to fetch.
     */
    where?: BirthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Births to fetch.
     */
    orderBy?: BirthOrderByWithRelationInput | BirthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Births.
     */
    cursor?: BirthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Births from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Births.
     */
    skip?: number
    distinct?: BirthScalarFieldEnum | BirthScalarFieldEnum[]
  }

  /**
   * Birth create
   */
  export type BirthCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthInclude<ExtArgs> | null
    /**
     * The data needed to create a Birth.
     */
    data: XOR<BirthCreateInput, BirthUncheckedCreateInput>
  }

  /**
   * Birth createMany
   */
  export type BirthCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Births.
     */
    data: BirthCreateManyInput | BirthCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Birth createManyAndReturn
   */
  export type BirthCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * The data used to create many Births.
     */
    data: BirthCreateManyInput | BirthCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Birth update
   */
  export type BirthUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthInclude<ExtArgs> | null
    /**
     * The data needed to update a Birth.
     */
    data: XOR<BirthUpdateInput, BirthUncheckedUpdateInput>
    /**
     * Choose, which Birth to update.
     */
    where: BirthWhereUniqueInput
  }

  /**
   * Birth updateMany
   */
  export type BirthUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Births.
     */
    data: XOR<BirthUpdateManyMutationInput, BirthUncheckedUpdateManyInput>
    /**
     * Filter which Births to update
     */
    where?: BirthWhereInput
    /**
     * Limit how many Births to update.
     */
    limit?: number
  }

  /**
   * Birth updateManyAndReturn
   */
  export type BirthUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * The data used to update Births.
     */
    data: XOR<BirthUpdateManyMutationInput, BirthUncheckedUpdateManyInput>
    /**
     * Filter which Births to update
     */
    where?: BirthWhereInput
    /**
     * Limit how many Births to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Birth upsert
   */
  export type BirthUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthInclude<ExtArgs> | null
    /**
     * The filter to search for the Birth to update in case it exists.
     */
    where: BirthWhereUniqueInput
    /**
     * In case the Birth found by the `where` argument doesn't exist, create a new Birth with this data.
     */
    create: XOR<BirthCreateInput, BirthUncheckedCreateInput>
    /**
     * In case the Birth was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BirthUpdateInput, BirthUncheckedUpdateInput>
  }

  /**
   * Birth delete
   */
  export type BirthDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthInclude<ExtArgs> | null
    /**
     * Filter which Birth to delete.
     */
    where: BirthWhereUniqueInput
  }

  /**
   * Birth deleteMany
   */
  export type BirthDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Births to delete
     */
    where?: BirthWhereInput
    /**
     * Limit how many Births to delete.
     */
    limit?: number
  }

  /**
   * Birth.Animal
   */
  export type Birth$AnimalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    where?: AnimalWhereInput
  }

  /**
   * Birth without action
   */
  export type BirthDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BirthInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    value: number | null
  }

  export type TransactionSumAggregateOutputType = {
    value: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    type: string | null
    date: Date | null
    value: number | null
    person: string | null
    createdAt: Date | null
    updatedAt: Date | null
    farmId: string | null
    animalId: string | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    type: string | null
    date: Date | null
    value: number | null
    person: string | null
    createdAt: Date | null
    updatedAt: Date | null
    farmId: string | null
    animalId: string | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    type: number
    date: number
    value: number
    person: number
    createdAt: number
    updatedAt: number
    farmId: number
    animalId: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    value?: true
  }

  export type TransactionSumAggregateInputType = {
    value?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    type?: true
    date?: true
    value?: true
    person?: true
    createdAt?: true
    updatedAt?: true
    farmId?: true
    animalId?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    type?: true
    date?: true
    value?: true
    person?: true
    createdAt?: true
    updatedAt?: true
    farmId?: true
    animalId?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    type?: true
    date?: true
    value?: true
    person?: true
    createdAt?: true
    updatedAt?: true
    farmId?: true
    animalId?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    type: string
    date: Date
    value: number
    person: string
    createdAt: Date
    updatedAt: Date
    farmId: string
    animalId: string
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    date?: boolean
    value?: boolean
    person?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    animalId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    date?: boolean
    value?: boolean
    person?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    animalId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    date?: boolean
    value?: boolean
    person?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    animalId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    type?: boolean
    date?: boolean
    value?: boolean
    person?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    animalId?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "date" | "value" | "person" | "createdAt" | "updatedAt" | "farmId" | "animalId", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
      animal: Prisma.$AnimalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      date: Date
      value: number
      person: string
      createdAt: Date
      updatedAt: Date
      farmId: string
      animalId: string
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    animal<T extends AnimalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimalDefaultArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'String'>
    readonly date: FieldRef<"Transaction", 'DateTime'>
    readonly value: FieldRef<"Transaction", 'Float'>
    readonly person: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly updatedAt: FieldRef<"Transaction", 'DateTime'>
    readonly farmId: FieldRef<"Transaction", 'String'>
    readonly animalId: FieldRef<"Transaction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    title: string | null
    type: string | null
    date: Date | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    farmId: string | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    title: string | null
    type: string | null
    date: Date | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    farmId: string | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    title: number
    type: number
    date: number
    description: number
    createdAt: number
    updatedAt: number
    farmId: number
    _all: number
  }


  export type EventMinAggregateInputType = {
    id?: true
    title?: true
    type?: true
    date?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    farmId?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    title?: true
    type?: true
    date?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    farmId?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    title?: true
    type?: true
    date?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    farmId?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    title: string
    type: string
    date: Date
    description: string
    createdAt: Date
    updatedAt: Date
    farmId: string
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    type?: boolean
    date?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    animals?: boolean | Event$animalsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    type?: boolean
    date?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    type?: boolean
    date?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    title?: boolean
    type?: boolean
    date?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "type" | "date" | "description" | "createdAt" | "updatedAt" | "farmId", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    animals?: boolean | Event$animalsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
      animals: Prisma.$EventAnimalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      type: string
      date: Date
      description: string
      createdAt: Date
      updatedAt: Date
      farmId: string
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    animals<T extends Event$animalsArgs<ExtArgs> = {}>(args?: Subset<T, Event$animalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAnimalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly title: FieldRef<"Event", 'String'>
    readonly type: FieldRef<"Event", 'String'>
    readonly date: FieldRef<"Event", 'DateTime'>
    readonly description: FieldRef<"Event", 'String'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
    readonly updatedAt: FieldRef<"Event", 'DateTime'>
    readonly farmId: FieldRef<"Event", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.animals
   */
  export type Event$animalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnimal
     */
    select?: EventAnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAnimal
     */
    omit?: EventAnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAnimalInclude<ExtArgs> | null
    where?: EventAnimalWhereInput
    orderBy?: EventAnimalOrderByWithRelationInput | EventAnimalOrderByWithRelationInput[]
    cursor?: EventAnimalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventAnimalScalarFieldEnum | EventAnimalScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model EventAnimal
   */

  export type AggregateEventAnimal = {
    _count: EventAnimalCountAggregateOutputType | null
    _min: EventAnimalMinAggregateOutputType | null
    _max: EventAnimalMaxAggregateOutputType | null
  }

  export type EventAnimalMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    eventId: string | null
    animalId: string | null
  }

  export type EventAnimalMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    eventId: string | null
    animalId: string | null
  }

  export type EventAnimalCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    eventId: number
    animalId: number
    _all: number
  }


  export type EventAnimalMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    animalId?: true
  }

  export type EventAnimalMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    animalId?: true
  }

  export type EventAnimalCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    animalId?: true
    _all?: true
  }

  export type EventAnimalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventAnimal to aggregate.
     */
    where?: EventAnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAnimals to fetch.
     */
    orderBy?: EventAnimalOrderByWithRelationInput | EventAnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventAnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAnimals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAnimals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventAnimals
    **/
    _count?: true | EventAnimalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventAnimalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventAnimalMaxAggregateInputType
  }

  export type GetEventAnimalAggregateType<T extends EventAnimalAggregateArgs> = {
        [P in keyof T & keyof AggregateEventAnimal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventAnimal[P]>
      : GetScalarType<T[P], AggregateEventAnimal[P]>
  }




  export type EventAnimalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventAnimalWhereInput
    orderBy?: EventAnimalOrderByWithAggregationInput | EventAnimalOrderByWithAggregationInput[]
    by: EventAnimalScalarFieldEnum[] | EventAnimalScalarFieldEnum
    having?: EventAnimalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventAnimalCountAggregateInputType | true
    _min?: EventAnimalMinAggregateInputType
    _max?: EventAnimalMaxAggregateInputType
  }

  export type EventAnimalGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    eventId: string
    animalId: string
    _count: EventAnimalCountAggregateOutputType | null
    _min: EventAnimalMinAggregateOutputType | null
    _max: EventAnimalMaxAggregateOutputType | null
  }

  type GetEventAnimalGroupByPayload<T extends EventAnimalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventAnimalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventAnimalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventAnimalGroupByOutputType[P]>
            : GetScalarType<T[P], EventAnimalGroupByOutputType[P]>
        }
      >
    >


  export type EventAnimalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventId?: boolean
    animalId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventAnimal"]>

  export type EventAnimalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventId?: boolean
    animalId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventAnimal"]>

  export type EventAnimalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventId?: boolean
    animalId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventAnimal"]>

  export type EventAnimalSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventId?: boolean
    animalId?: boolean
  }

  export type EventAnimalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "eventId" | "animalId", ExtArgs["result"]["eventAnimal"]>
  export type EventAnimalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }
  export type EventAnimalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }
  export type EventAnimalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }

  export type $EventAnimalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventAnimal"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
      animal: Prisma.$AnimalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      eventId: string
      animalId: string
    }, ExtArgs["result"]["eventAnimal"]>
    composites: {}
  }

  type EventAnimalGetPayload<S extends boolean | null | undefined | EventAnimalDefaultArgs> = $Result.GetResult<Prisma.$EventAnimalPayload, S>

  type EventAnimalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventAnimalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventAnimalCountAggregateInputType | true
    }

  export interface EventAnimalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventAnimal'], meta: { name: 'EventAnimal' } }
    /**
     * Find zero or one EventAnimal that matches the filter.
     * @param {EventAnimalFindUniqueArgs} args - Arguments to find a EventAnimal
     * @example
     * // Get one EventAnimal
     * const eventAnimal = await prisma.eventAnimal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventAnimalFindUniqueArgs>(args: SelectSubset<T, EventAnimalFindUniqueArgs<ExtArgs>>): Prisma__EventAnimalClient<$Result.GetResult<Prisma.$EventAnimalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventAnimal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventAnimalFindUniqueOrThrowArgs} args - Arguments to find a EventAnimal
     * @example
     * // Get one EventAnimal
     * const eventAnimal = await prisma.eventAnimal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventAnimalFindUniqueOrThrowArgs>(args: SelectSubset<T, EventAnimalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventAnimalClient<$Result.GetResult<Prisma.$EventAnimalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventAnimal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAnimalFindFirstArgs} args - Arguments to find a EventAnimal
     * @example
     * // Get one EventAnimal
     * const eventAnimal = await prisma.eventAnimal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventAnimalFindFirstArgs>(args?: SelectSubset<T, EventAnimalFindFirstArgs<ExtArgs>>): Prisma__EventAnimalClient<$Result.GetResult<Prisma.$EventAnimalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventAnimal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAnimalFindFirstOrThrowArgs} args - Arguments to find a EventAnimal
     * @example
     * // Get one EventAnimal
     * const eventAnimal = await prisma.eventAnimal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventAnimalFindFirstOrThrowArgs>(args?: SelectSubset<T, EventAnimalFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventAnimalClient<$Result.GetResult<Prisma.$EventAnimalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventAnimals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAnimalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventAnimals
     * const eventAnimals = await prisma.eventAnimal.findMany()
     * 
     * // Get first 10 EventAnimals
     * const eventAnimals = await prisma.eventAnimal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventAnimalWithIdOnly = await prisma.eventAnimal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventAnimalFindManyArgs>(args?: SelectSubset<T, EventAnimalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAnimalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventAnimal.
     * @param {EventAnimalCreateArgs} args - Arguments to create a EventAnimal.
     * @example
     * // Create one EventAnimal
     * const EventAnimal = await prisma.eventAnimal.create({
     *   data: {
     *     // ... data to create a EventAnimal
     *   }
     * })
     * 
     */
    create<T extends EventAnimalCreateArgs>(args: SelectSubset<T, EventAnimalCreateArgs<ExtArgs>>): Prisma__EventAnimalClient<$Result.GetResult<Prisma.$EventAnimalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventAnimals.
     * @param {EventAnimalCreateManyArgs} args - Arguments to create many EventAnimals.
     * @example
     * // Create many EventAnimals
     * const eventAnimal = await prisma.eventAnimal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventAnimalCreateManyArgs>(args?: SelectSubset<T, EventAnimalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventAnimals and returns the data saved in the database.
     * @param {EventAnimalCreateManyAndReturnArgs} args - Arguments to create many EventAnimals.
     * @example
     * // Create many EventAnimals
     * const eventAnimal = await prisma.eventAnimal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventAnimals and only return the `id`
     * const eventAnimalWithIdOnly = await prisma.eventAnimal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventAnimalCreateManyAndReturnArgs>(args?: SelectSubset<T, EventAnimalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAnimalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventAnimal.
     * @param {EventAnimalDeleteArgs} args - Arguments to delete one EventAnimal.
     * @example
     * // Delete one EventAnimal
     * const EventAnimal = await prisma.eventAnimal.delete({
     *   where: {
     *     // ... filter to delete one EventAnimal
     *   }
     * })
     * 
     */
    delete<T extends EventAnimalDeleteArgs>(args: SelectSubset<T, EventAnimalDeleteArgs<ExtArgs>>): Prisma__EventAnimalClient<$Result.GetResult<Prisma.$EventAnimalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventAnimal.
     * @param {EventAnimalUpdateArgs} args - Arguments to update one EventAnimal.
     * @example
     * // Update one EventAnimal
     * const eventAnimal = await prisma.eventAnimal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventAnimalUpdateArgs>(args: SelectSubset<T, EventAnimalUpdateArgs<ExtArgs>>): Prisma__EventAnimalClient<$Result.GetResult<Prisma.$EventAnimalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventAnimals.
     * @param {EventAnimalDeleteManyArgs} args - Arguments to filter EventAnimals to delete.
     * @example
     * // Delete a few EventAnimals
     * const { count } = await prisma.eventAnimal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventAnimalDeleteManyArgs>(args?: SelectSubset<T, EventAnimalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventAnimals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAnimalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventAnimals
     * const eventAnimal = await prisma.eventAnimal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventAnimalUpdateManyArgs>(args: SelectSubset<T, EventAnimalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventAnimals and returns the data updated in the database.
     * @param {EventAnimalUpdateManyAndReturnArgs} args - Arguments to update many EventAnimals.
     * @example
     * // Update many EventAnimals
     * const eventAnimal = await prisma.eventAnimal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventAnimals and only return the `id`
     * const eventAnimalWithIdOnly = await prisma.eventAnimal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventAnimalUpdateManyAndReturnArgs>(args: SelectSubset<T, EventAnimalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAnimalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventAnimal.
     * @param {EventAnimalUpsertArgs} args - Arguments to update or create a EventAnimal.
     * @example
     * // Update or create a EventAnimal
     * const eventAnimal = await prisma.eventAnimal.upsert({
     *   create: {
     *     // ... data to create a EventAnimal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventAnimal we want to update
     *   }
     * })
     */
    upsert<T extends EventAnimalUpsertArgs>(args: SelectSubset<T, EventAnimalUpsertArgs<ExtArgs>>): Prisma__EventAnimalClient<$Result.GetResult<Prisma.$EventAnimalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventAnimals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAnimalCountArgs} args - Arguments to filter EventAnimals to count.
     * @example
     * // Count the number of EventAnimals
     * const count = await prisma.eventAnimal.count({
     *   where: {
     *     // ... the filter for the EventAnimals we want to count
     *   }
     * })
    **/
    count<T extends EventAnimalCountArgs>(
      args?: Subset<T, EventAnimalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventAnimalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventAnimal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAnimalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAnimalAggregateArgs>(args: Subset<T, EventAnimalAggregateArgs>): Prisma.PrismaPromise<GetEventAnimalAggregateType<T>>

    /**
     * Group by EventAnimal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAnimalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventAnimalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventAnimalGroupByArgs['orderBy'] }
        : { orderBy?: EventAnimalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventAnimalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventAnimalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventAnimal model
   */
  readonly fields: EventAnimalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventAnimal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventAnimalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    animal<T extends AnimalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimalDefaultArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EventAnimal model
   */
  interface EventAnimalFieldRefs {
    readonly id: FieldRef<"EventAnimal", 'String'>
    readonly createdAt: FieldRef<"EventAnimal", 'DateTime'>
    readonly updatedAt: FieldRef<"EventAnimal", 'DateTime'>
    readonly eventId: FieldRef<"EventAnimal", 'String'>
    readonly animalId: FieldRef<"EventAnimal", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EventAnimal findUnique
   */
  export type EventAnimalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnimal
     */
    select?: EventAnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAnimal
     */
    omit?: EventAnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAnimalInclude<ExtArgs> | null
    /**
     * Filter, which EventAnimal to fetch.
     */
    where: EventAnimalWhereUniqueInput
  }

  /**
   * EventAnimal findUniqueOrThrow
   */
  export type EventAnimalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnimal
     */
    select?: EventAnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAnimal
     */
    omit?: EventAnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAnimalInclude<ExtArgs> | null
    /**
     * Filter, which EventAnimal to fetch.
     */
    where: EventAnimalWhereUniqueInput
  }

  /**
   * EventAnimal findFirst
   */
  export type EventAnimalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnimal
     */
    select?: EventAnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAnimal
     */
    omit?: EventAnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAnimalInclude<ExtArgs> | null
    /**
     * Filter, which EventAnimal to fetch.
     */
    where?: EventAnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAnimals to fetch.
     */
    orderBy?: EventAnimalOrderByWithRelationInput | EventAnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventAnimals.
     */
    cursor?: EventAnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAnimals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAnimals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventAnimals.
     */
    distinct?: EventAnimalScalarFieldEnum | EventAnimalScalarFieldEnum[]
  }

  /**
   * EventAnimal findFirstOrThrow
   */
  export type EventAnimalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnimal
     */
    select?: EventAnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAnimal
     */
    omit?: EventAnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAnimalInclude<ExtArgs> | null
    /**
     * Filter, which EventAnimal to fetch.
     */
    where?: EventAnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAnimals to fetch.
     */
    orderBy?: EventAnimalOrderByWithRelationInput | EventAnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventAnimals.
     */
    cursor?: EventAnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAnimals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAnimals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventAnimals.
     */
    distinct?: EventAnimalScalarFieldEnum | EventAnimalScalarFieldEnum[]
  }

  /**
   * EventAnimal findMany
   */
  export type EventAnimalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnimal
     */
    select?: EventAnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAnimal
     */
    omit?: EventAnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAnimalInclude<ExtArgs> | null
    /**
     * Filter, which EventAnimals to fetch.
     */
    where?: EventAnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAnimals to fetch.
     */
    orderBy?: EventAnimalOrderByWithRelationInput | EventAnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventAnimals.
     */
    cursor?: EventAnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAnimals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAnimals.
     */
    skip?: number
    distinct?: EventAnimalScalarFieldEnum | EventAnimalScalarFieldEnum[]
  }

  /**
   * EventAnimal create
   */
  export type EventAnimalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnimal
     */
    select?: EventAnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAnimal
     */
    omit?: EventAnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAnimalInclude<ExtArgs> | null
    /**
     * The data needed to create a EventAnimal.
     */
    data: XOR<EventAnimalCreateInput, EventAnimalUncheckedCreateInput>
  }

  /**
   * EventAnimal createMany
   */
  export type EventAnimalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventAnimals.
     */
    data: EventAnimalCreateManyInput | EventAnimalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventAnimal createManyAndReturn
   */
  export type EventAnimalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnimal
     */
    select?: EventAnimalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventAnimal
     */
    omit?: EventAnimalOmit<ExtArgs> | null
    /**
     * The data used to create many EventAnimals.
     */
    data: EventAnimalCreateManyInput | EventAnimalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAnimalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventAnimal update
   */
  export type EventAnimalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnimal
     */
    select?: EventAnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAnimal
     */
    omit?: EventAnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAnimalInclude<ExtArgs> | null
    /**
     * The data needed to update a EventAnimal.
     */
    data: XOR<EventAnimalUpdateInput, EventAnimalUncheckedUpdateInput>
    /**
     * Choose, which EventAnimal to update.
     */
    where: EventAnimalWhereUniqueInput
  }

  /**
   * EventAnimal updateMany
   */
  export type EventAnimalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventAnimals.
     */
    data: XOR<EventAnimalUpdateManyMutationInput, EventAnimalUncheckedUpdateManyInput>
    /**
     * Filter which EventAnimals to update
     */
    where?: EventAnimalWhereInput
    /**
     * Limit how many EventAnimals to update.
     */
    limit?: number
  }

  /**
   * EventAnimal updateManyAndReturn
   */
  export type EventAnimalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnimal
     */
    select?: EventAnimalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventAnimal
     */
    omit?: EventAnimalOmit<ExtArgs> | null
    /**
     * The data used to update EventAnimals.
     */
    data: XOR<EventAnimalUpdateManyMutationInput, EventAnimalUncheckedUpdateManyInput>
    /**
     * Filter which EventAnimals to update
     */
    where?: EventAnimalWhereInput
    /**
     * Limit how many EventAnimals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAnimalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventAnimal upsert
   */
  export type EventAnimalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnimal
     */
    select?: EventAnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAnimal
     */
    omit?: EventAnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAnimalInclude<ExtArgs> | null
    /**
     * The filter to search for the EventAnimal to update in case it exists.
     */
    where: EventAnimalWhereUniqueInput
    /**
     * In case the EventAnimal found by the `where` argument doesn't exist, create a new EventAnimal with this data.
     */
    create: XOR<EventAnimalCreateInput, EventAnimalUncheckedCreateInput>
    /**
     * In case the EventAnimal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventAnimalUpdateInput, EventAnimalUncheckedUpdateInput>
  }

  /**
   * EventAnimal delete
   */
  export type EventAnimalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnimal
     */
    select?: EventAnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAnimal
     */
    omit?: EventAnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAnimalInclude<ExtArgs> | null
    /**
     * Filter which EventAnimal to delete.
     */
    where: EventAnimalWhereUniqueInput
  }

  /**
   * EventAnimal deleteMany
   */
  export type EventAnimalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventAnimals to delete
     */
    where?: EventAnimalWhereInput
    /**
     * Limit how many EventAnimals to delete.
     */
    limit?: number
  }

  /**
   * EventAnimal without action
   */
  export type EventAnimalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnimal
     */
    select?: EventAnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAnimal
     */
    omit?: EventAnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAnimalInclude<ExtArgs> | null
  }


  /**
   * Model Lote
   */

  export type AggregateLote = {
    _count: LoteCountAggregateOutputType | null
    _min: LoteMinAggregateOutputType | null
    _max: LoteMaxAggregateOutputType | null
  }

  export type LoteMinAggregateOutputType = {
    id: string | null
    nome: string | null
    descricao: string | null
    finalidade: string | null
    createdAt: Date | null
    updatedAt: Date | null
    farmId: string | null
  }

  export type LoteMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    descricao: string | null
    finalidade: string | null
    createdAt: Date | null
    updatedAt: Date | null
    farmId: string | null
  }

  export type LoteCountAggregateOutputType = {
    id: number
    nome: number
    descricao: number
    finalidade: number
    createdAt: number
    updatedAt: number
    farmId: number
    _all: number
  }


  export type LoteMinAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    finalidade?: true
    createdAt?: true
    updatedAt?: true
    farmId?: true
  }

  export type LoteMaxAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    finalidade?: true
    createdAt?: true
    updatedAt?: true
    farmId?: true
  }

  export type LoteCountAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    finalidade?: true
    createdAt?: true
    updatedAt?: true
    farmId?: true
    _all?: true
  }

  export type LoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lote to aggregate.
     */
    where?: LoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LoteOrderByWithRelationInput | LoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lotes
    **/
    _count?: true | LoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoteMaxAggregateInputType
  }

  export type GetLoteAggregateType<T extends LoteAggregateArgs> = {
        [P in keyof T & keyof AggregateLote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLote[P]>
      : GetScalarType<T[P], AggregateLote[P]>
  }




  export type LoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoteWhereInput
    orderBy?: LoteOrderByWithAggregationInput | LoteOrderByWithAggregationInput[]
    by: LoteScalarFieldEnum[] | LoteScalarFieldEnum
    having?: LoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoteCountAggregateInputType | true
    _min?: LoteMinAggregateInputType
    _max?: LoteMaxAggregateInputType
  }

  export type LoteGroupByOutputType = {
    id: string
    nome: string
    descricao: string | null
    finalidade: string
    createdAt: Date
    updatedAt: Date
    farmId: string
    _count: LoteCountAggregateOutputType | null
    _min: LoteMinAggregateOutputType | null
    _max: LoteMaxAggregateOutputType | null
  }

  type GetLoteGroupByPayload<T extends LoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoteGroupByOutputType[P]>
            : GetScalarType<T[P], LoteGroupByOutputType[P]>
        }
      >
    >


  export type LoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    finalidade?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    animais?: boolean | Lote$animaisArgs<ExtArgs>
    _count?: boolean | LoteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lote"]>

  export type LoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    finalidade?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lote"]>

  export type LoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    finalidade?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lote"]>

  export type LoteSelectScalar = {
    id?: boolean
    nome?: boolean
    descricao?: boolean
    finalidade?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
  }

  export type LoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "descricao" | "finalidade" | "createdAt" | "updatedAt" | "farmId", ExtArgs["result"]["lote"]>
  export type LoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    animais?: boolean | Lote$animaisArgs<ExtArgs>
    _count?: boolean | LoteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }
  export type LoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }

  export type $LotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lote"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
      animais: Prisma.$AnimalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      descricao: string | null
      finalidade: string
      createdAt: Date
      updatedAt: Date
      farmId: string
    }, ExtArgs["result"]["lote"]>
    composites: {}
  }

  type LoteGetPayload<S extends boolean | null | undefined | LoteDefaultArgs> = $Result.GetResult<Prisma.$LotePayload, S>

  type LoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoteCountAggregateInputType | true
    }

  export interface LoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lote'], meta: { name: 'Lote' } }
    /**
     * Find zero or one Lote that matches the filter.
     * @param {LoteFindUniqueArgs} args - Arguments to find a Lote
     * @example
     * // Get one Lote
     * const lote = await prisma.lote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoteFindUniqueArgs>(args: SelectSubset<T, LoteFindUniqueArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoteFindUniqueOrThrowArgs} args - Arguments to find a Lote
     * @example
     * // Get one Lote
     * const lote = await prisma.lote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoteFindUniqueOrThrowArgs>(args: SelectSubset<T, LoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteFindFirstArgs} args - Arguments to find a Lote
     * @example
     * // Get one Lote
     * const lote = await prisma.lote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoteFindFirstArgs>(args?: SelectSubset<T, LoteFindFirstArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteFindFirstOrThrowArgs} args - Arguments to find a Lote
     * @example
     * // Get one Lote
     * const lote = await prisma.lote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoteFindFirstOrThrowArgs>(args?: SelectSubset<T, LoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Lotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lotes
     * const lotes = await prisma.lote.findMany()
     * 
     * // Get first 10 Lotes
     * const lotes = await prisma.lote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loteWithIdOnly = await prisma.lote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoteFindManyArgs>(args?: SelectSubset<T, LoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lote.
     * @param {LoteCreateArgs} args - Arguments to create a Lote.
     * @example
     * // Create one Lote
     * const Lote = await prisma.lote.create({
     *   data: {
     *     // ... data to create a Lote
     *   }
     * })
     * 
     */
    create<T extends LoteCreateArgs>(args: SelectSubset<T, LoteCreateArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Lotes.
     * @param {LoteCreateManyArgs} args - Arguments to create many Lotes.
     * @example
     * // Create many Lotes
     * const lote = await prisma.lote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoteCreateManyArgs>(args?: SelectSubset<T, LoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lotes and returns the data saved in the database.
     * @param {LoteCreateManyAndReturnArgs} args - Arguments to create many Lotes.
     * @example
     * // Create many Lotes
     * const lote = await prisma.lote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lotes and only return the `id`
     * const loteWithIdOnly = await prisma.lote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoteCreateManyAndReturnArgs>(args?: SelectSubset<T, LoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lote.
     * @param {LoteDeleteArgs} args - Arguments to delete one Lote.
     * @example
     * // Delete one Lote
     * const Lote = await prisma.lote.delete({
     *   where: {
     *     // ... filter to delete one Lote
     *   }
     * })
     * 
     */
    delete<T extends LoteDeleteArgs>(args: SelectSubset<T, LoteDeleteArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lote.
     * @param {LoteUpdateArgs} args - Arguments to update one Lote.
     * @example
     * // Update one Lote
     * const lote = await prisma.lote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoteUpdateArgs>(args: SelectSubset<T, LoteUpdateArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Lotes.
     * @param {LoteDeleteManyArgs} args - Arguments to filter Lotes to delete.
     * @example
     * // Delete a few Lotes
     * const { count } = await prisma.lote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoteDeleteManyArgs>(args?: SelectSubset<T, LoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lotes
     * const lote = await prisma.lote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoteUpdateManyArgs>(args: SelectSubset<T, LoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lotes and returns the data updated in the database.
     * @param {LoteUpdateManyAndReturnArgs} args - Arguments to update many Lotes.
     * @example
     * // Update many Lotes
     * const lote = await prisma.lote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Lotes and only return the `id`
     * const loteWithIdOnly = await prisma.lote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoteUpdateManyAndReturnArgs>(args: SelectSubset<T, LoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lote.
     * @param {LoteUpsertArgs} args - Arguments to update or create a Lote.
     * @example
     * // Update or create a Lote
     * const lote = await prisma.lote.upsert({
     *   create: {
     *     // ... data to create a Lote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lote we want to update
     *   }
     * })
     */
    upsert<T extends LoteUpsertArgs>(args: SelectSubset<T, LoteUpsertArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Lotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteCountArgs} args - Arguments to filter Lotes to count.
     * @example
     * // Count the number of Lotes
     * const count = await prisma.lote.count({
     *   where: {
     *     // ... the filter for the Lotes we want to count
     *   }
     * })
    **/
    count<T extends LoteCountArgs>(
      args?: Subset<T, LoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoteAggregateArgs>(args: Subset<T, LoteAggregateArgs>): Prisma.PrismaPromise<GetLoteAggregateType<T>>

    /**
     * Group by Lote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoteGroupByArgs['orderBy'] }
        : { orderBy?: LoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lote model
   */
  readonly fields: LoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    animais<T extends Lote$animaisArgs<ExtArgs> = {}>(args?: Subset<T, Lote$animaisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lote model
   */
  interface LoteFieldRefs {
    readonly id: FieldRef<"Lote", 'String'>
    readonly nome: FieldRef<"Lote", 'String'>
    readonly descricao: FieldRef<"Lote", 'String'>
    readonly finalidade: FieldRef<"Lote", 'String'>
    readonly createdAt: FieldRef<"Lote", 'DateTime'>
    readonly updatedAt: FieldRef<"Lote", 'DateTime'>
    readonly farmId: FieldRef<"Lote", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Lote findUnique
   */
  export type LoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter, which Lote to fetch.
     */
    where: LoteWhereUniqueInput
  }

  /**
   * Lote findUniqueOrThrow
   */
  export type LoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter, which Lote to fetch.
     */
    where: LoteWhereUniqueInput
  }

  /**
   * Lote findFirst
   */
  export type LoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter, which Lote to fetch.
     */
    where?: LoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LoteOrderByWithRelationInput | LoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lotes.
     */
    cursor?: LoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lotes.
     */
    distinct?: LoteScalarFieldEnum | LoteScalarFieldEnum[]
  }

  /**
   * Lote findFirstOrThrow
   */
  export type LoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter, which Lote to fetch.
     */
    where?: LoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LoteOrderByWithRelationInput | LoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lotes.
     */
    cursor?: LoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lotes.
     */
    distinct?: LoteScalarFieldEnum | LoteScalarFieldEnum[]
  }

  /**
   * Lote findMany
   */
  export type LoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter, which Lotes to fetch.
     */
    where?: LoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LoteOrderByWithRelationInput | LoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lotes.
     */
    cursor?: LoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    distinct?: LoteScalarFieldEnum | LoteScalarFieldEnum[]
  }

  /**
   * Lote create
   */
  export type LoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Lote.
     */
    data: XOR<LoteCreateInput, LoteUncheckedCreateInput>
  }

  /**
   * Lote createMany
   */
  export type LoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lotes.
     */
    data: LoteCreateManyInput | LoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lote createManyAndReturn
   */
  export type LoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * The data used to create many Lotes.
     */
    data: LoteCreateManyInput | LoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lote update
   */
  export type LoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Lote.
     */
    data: XOR<LoteUpdateInput, LoteUncheckedUpdateInput>
    /**
     * Choose, which Lote to update.
     */
    where: LoteWhereUniqueInput
  }

  /**
   * Lote updateMany
   */
  export type LoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lotes.
     */
    data: XOR<LoteUpdateManyMutationInput, LoteUncheckedUpdateManyInput>
    /**
     * Filter which Lotes to update
     */
    where?: LoteWhereInput
    /**
     * Limit how many Lotes to update.
     */
    limit?: number
  }

  /**
   * Lote updateManyAndReturn
   */
  export type LoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * The data used to update Lotes.
     */
    data: XOR<LoteUpdateManyMutationInput, LoteUncheckedUpdateManyInput>
    /**
     * Filter which Lotes to update
     */
    where?: LoteWhereInput
    /**
     * Limit how many Lotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lote upsert
   */
  export type LoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Lote to update in case it exists.
     */
    where: LoteWhereUniqueInput
    /**
     * In case the Lote found by the `where` argument doesn't exist, create a new Lote with this data.
     */
    create: XOR<LoteCreateInput, LoteUncheckedCreateInput>
    /**
     * In case the Lote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoteUpdateInput, LoteUncheckedUpdateInput>
  }

  /**
   * Lote delete
   */
  export type LoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter which Lote to delete.
     */
    where: LoteWhereUniqueInput
  }

  /**
   * Lote deleteMany
   */
  export type LoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lotes to delete
     */
    where?: LoteWhereInput
    /**
     * Limit how many Lotes to delete.
     */
    limit?: number
  }

  /**
   * Lote.animais
   */
  export type Lote$animaisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    where?: AnimalWhereInput
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    cursor?: AnimalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Lote without action
   */
  export type LoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
  }


  /**
   * Model Farm
   */

  export type AggregateFarm = {
    _count: FarmCountAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  export type FarmMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    phone: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FarmMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    phone: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FarmCountAggregateOutputType = {
    id: number
    name: number
    address: number
    phone: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FarmMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FarmMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FarmCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FarmAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farm to aggregate.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Farms
    **/
    _count?: true | FarmCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FarmMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FarmMaxAggregateInputType
  }

  export type GetFarmAggregateType<T extends FarmAggregateArgs> = {
        [P in keyof T & keyof AggregateFarm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFarm[P]>
      : GetScalarType<T[P], AggregateFarm[P]>
  }




  export type FarmGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmWhereInput
    orderBy?: FarmOrderByWithAggregationInput | FarmOrderByWithAggregationInput[]
    by: FarmScalarFieldEnum[] | FarmScalarFieldEnum
    having?: FarmScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FarmCountAggregateInputType | true
    _min?: FarmMinAggregateInputType
    _max?: FarmMaxAggregateInputType
  }

  export type FarmGroupByOutputType = {
    id: string
    name: string
    address: string | null
    phone: string | null
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: FarmCountAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  type GetFarmGroupByPayload<T extends FarmGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FarmGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FarmGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FarmGroupByOutputType[P]>
            : GetScalarType<T[P], FarmGroupByOutputType[P]>
        }
      >
    >


  export type FarmSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Farm$usersArgs<ExtArgs>
    animals?: boolean | Farm$animalsArgs<ExtArgs>
    lotes?: boolean | Farm$lotesArgs<ExtArgs>
    events?: boolean | Farm$eventsArgs<ExtArgs>
    transactions?: boolean | Farm$transactionsArgs<ExtArgs>
    _count?: boolean | FarmCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FarmOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "phone" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["farm"]>
  export type FarmInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Farm$usersArgs<ExtArgs>
    animals?: boolean | Farm$animalsArgs<ExtArgs>
    lotes?: boolean | Farm$lotesArgs<ExtArgs>
    events?: boolean | Farm$eventsArgs<ExtArgs>
    transactions?: boolean | Farm$transactionsArgs<ExtArgs>
    _count?: boolean | FarmCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FarmIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FarmIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FarmPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Farm"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      animals: Prisma.$AnimalPayload<ExtArgs>[]
      lotes: Prisma.$LotePayload<ExtArgs>[]
      events: Prisma.$EventPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string | null
      phone: string | null
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["farm"]>
    composites: {}
  }

  type FarmGetPayload<S extends boolean | null | undefined | FarmDefaultArgs> = $Result.GetResult<Prisma.$FarmPayload, S>

  type FarmCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FarmFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FarmCountAggregateInputType | true
    }

  export interface FarmDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Farm'], meta: { name: 'Farm' } }
    /**
     * Find zero or one Farm that matches the filter.
     * @param {FarmFindUniqueArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FarmFindUniqueArgs>(args: SelectSubset<T, FarmFindUniqueArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Farm that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FarmFindUniqueOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FarmFindUniqueOrThrowArgs>(args: SelectSubset<T, FarmFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Farm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FarmFindFirstArgs>(args?: SelectSubset<T, FarmFindFirstArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Farm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FarmFindFirstOrThrowArgs>(args?: SelectSubset<T, FarmFindFirstOrThrowArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Farms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Farms
     * const farms = await prisma.farm.findMany()
     * 
     * // Get first 10 Farms
     * const farms = await prisma.farm.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const farmWithIdOnly = await prisma.farm.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FarmFindManyArgs>(args?: SelectSubset<T, FarmFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Farm.
     * @param {FarmCreateArgs} args - Arguments to create a Farm.
     * @example
     * // Create one Farm
     * const Farm = await prisma.farm.create({
     *   data: {
     *     // ... data to create a Farm
     *   }
     * })
     * 
     */
    create<T extends FarmCreateArgs>(args: SelectSubset<T, FarmCreateArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Farms.
     * @param {FarmCreateManyArgs} args - Arguments to create many Farms.
     * @example
     * // Create many Farms
     * const farm = await prisma.farm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FarmCreateManyArgs>(args?: SelectSubset<T, FarmCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Farms and returns the data saved in the database.
     * @param {FarmCreateManyAndReturnArgs} args - Arguments to create many Farms.
     * @example
     * // Create many Farms
     * const farm = await prisma.farm.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Farms and only return the `id`
     * const farmWithIdOnly = await prisma.farm.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FarmCreateManyAndReturnArgs>(args?: SelectSubset<T, FarmCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Farm.
     * @param {FarmDeleteArgs} args - Arguments to delete one Farm.
     * @example
     * // Delete one Farm
     * const Farm = await prisma.farm.delete({
     *   where: {
     *     // ... filter to delete one Farm
     *   }
     * })
     * 
     */
    delete<T extends FarmDeleteArgs>(args: SelectSubset<T, FarmDeleteArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Farm.
     * @param {FarmUpdateArgs} args - Arguments to update one Farm.
     * @example
     * // Update one Farm
     * const farm = await prisma.farm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FarmUpdateArgs>(args: SelectSubset<T, FarmUpdateArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Farms.
     * @param {FarmDeleteManyArgs} args - Arguments to filter Farms to delete.
     * @example
     * // Delete a few Farms
     * const { count } = await prisma.farm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FarmDeleteManyArgs>(args?: SelectSubset<T, FarmDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Farms
     * const farm = await prisma.farm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FarmUpdateManyArgs>(args: SelectSubset<T, FarmUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Farms and returns the data updated in the database.
     * @param {FarmUpdateManyAndReturnArgs} args - Arguments to update many Farms.
     * @example
     * // Update many Farms
     * const farm = await prisma.farm.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Farms and only return the `id`
     * const farmWithIdOnly = await prisma.farm.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FarmUpdateManyAndReturnArgs>(args: SelectSubset<T, FarmUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Farm.
     * @param {FarmUpsertArgs} args - Arguments to update or create a Farm.
     * @example
     * // Update or create a Farm
     * const farm = await prisma.farm.upsert({
     *   create: {
     *     // ... data to create a Farm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Farm we want to update
     *   }
     * })
     */
    upsert<T extends FarmUpsertArgs>(args: SelectSubset<T, FarmUpsertArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmCountArgs} args - Arguments to filter Farms to count.
     * @example
     * // Count the number of Farms
     * const count = await prisma.farm.count({
     *   where: {
     *     // ... the filter for the Farms we want to count
     *   }
     * })
    **/
    count<T extends FarmCountArgs>(
      args?: Subset<T, FarmCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FarmCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FarmAggregateArgs>(args: Subset<T, FarmAggregateArgs>): Prisma.PrismaPromise<GetFarmAggregateType<T>>

    /**
     * Group by Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FarmGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FarmGroupByArgs['orderBy'] }
        : { orderBy?: FarmGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FarmGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFarmGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Farm model
   */
  readonly fields: FarmFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Farm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FarmClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Farm$usersArgs<ExtArgs> = {}>(args?: Subset<T, Farm$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    animals<T extends Farm$animalsArgs<ExtArgs> = {}>(args?: Subset<T, Farm$animalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lotes<T extends Farm$lotesArgs<ExtArgs> = {}>(args?: Subset<T, Farm$lotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends Farm$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Farm$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends Farm$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Farm$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Farm model
   */
  interface FarmFieldRefs {
    readonly id: FieldRef<"Farm", 'String'>
    readonly name: FieldRef<"Farm", 'String'>
    readonly address: FieldRef<"Farm", 'String'>
    readonly phone: FieldRef<"Farm", 'String'>
    readonly active: FieldRef<"Farm", 'Boolean'>
    readonly createdAt: FieldRef<"Farm", 'DateTime'>
    readonly updatedAt: FieldRef<"Farm", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Farm findUnique
   */
  export type FarmFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm findUniqueOrThrow
   */
  export type FarmFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm findFirst
   */
  export type FarmFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm findFirstOrThrow
   */
  export type FarmFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm findMany
   */
  export type FarmFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farms to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm create
   */
  export type FarmCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The data needed to create a Farm.
     */
    data: XOR<FarmCreateInput, FarmUncheckedCreateInput>
  }

  /**
   * Farm createMany
   */
  export type FarmCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Farms.
     */
    data: FarmCreateManyInput | FarmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Farm createManyAndReturn
   */
  export type FarmCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * The data used to create many Farms.
     */
    data: FarmCreateManyInput | FarmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Farm update
   */
  export type FarmUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The data needed to update a Farm.
     */
    data: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
    /**
     * Choose, which Farm to update.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm updateMany
   */
  export type FarmUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Farms.
     */
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyInput>
    /**
     * Filter which Farms to update
     */
    where?: FarmWhereInput
    /**
     * Limit how many Farms to update.
     */
    limit?: number
  }

  /**
   * Farm updateManyAndReturn
   */
  export type FarmUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * The data used to update Farms.
     */
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyInput>
    /**
     * Filter which Farms to update
     */
    where?: FarmWhereInput
    /**
     * Limit how many Farms to update.
     */
    limit?: number
  }

  /**
   * Farm upsert
   */
  export type FarmUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The filter to search for the Farm to update in case it exists.
     */
    where: FarmWhereUniqueInput
    /**
     * In case the Farm found by the `where` argument doesn't exist, create a new Farm with this data.
     */
    create: XOR<FarmCreateInput, FarmUncheckedCreateInput>
    /**
     * In case the Farm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
  }

  /**
   * Farm delete
   */
  export type FarmDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter which Farm to delete.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm deleteMany
   */
  export type FarmDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farms to delete
     */
    where?: FarmWhereInput
    /**
     * Limit how many Farms to delete.
     */
    limit?: number
  }

  /**
   * Farm.users
   */
  export type Farm$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Farm.animals
   */
  export type Farm$animalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    where?: AnimalWhereInput
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    cursor?: AnimalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Farm.lotes
   */
  export type Farm$lotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    where?: LoteWhereInput
    orderBy?: LoteOrderByWithRelationInput | LoteOrderByWithRelationInput[]
    cursor?: LoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoteScalarFieldEnum | LoteScalarFieldEnum[]
  }

  /**
   * Farm.events
   */
  export type Farm$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Farm.transactions
   */
  export type Farm$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Farm without action
   */
  export type FarmDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    fullName: string | null
    role: $Enums.UserRole | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    farmId: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    fullName: string | null
    role: $Enums.UserRole | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    farmId: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    fullName: number
    role: number
    active: number
    createdAt: number
    updatedAt: number
    farmId: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    fullName?: true
    role?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    farmId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    fullName?: true
    role?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    farmId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    fullName?: true
    role?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    farmId?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string
    password: string
    fullName: string
    role: $Enums.UserRole
    active: boolean
    createdAt: Date
    updatedAt: Date
    farmId: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    fullName?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    fullName?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    fullName?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    fullName?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmId?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "fullName" | "role" | "active" | "createdAt" | "updatedAt" | "farmId", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      password: string
      fullName: string
      role: $Enums.UserRole
      active: boolean
      createdAt: Date
      updatedAt: Date
      farmId: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly active: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly farmId: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AnimalScalarFieldEnum: {
    id: 'id',
    name: 'name',
    tag: 'tag',
    breed: 'breed',
    gender: 'gender',
    birthDate: 'birthDate',
    status: 'status',
    reproductiveStatus: 'reproductiveStatus',
    inseminationDate: 'inseminationDate',
    expectedBirthDate: 'expectedBirthDate',
    abortionDate: 'abortionDate',
    weight: 'weight',
    notes: 'notes',
    purchaseDate: 'purchaseDate',
    purchaseValue: 'purchaseValue',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    farmId: 'farmId',
    loteId: 'loteId'
  };

  export type AnimalScalarFieldEnum = (typeof AnimalScalarFieldEnum)[keyof typeof AnimalScalarFieldEnum]


  export const BirthScalarFieldEnum: {
    id: 'id',
    birthDate: 'birthDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    motherId: 'motherId',
    fatherId: 'fatherId',
    childId: 'childId',
    animalId: 'animalId'
  };

  export type BirthScalarFieldEnum = (typeof BirthScalarFieldEnum)[keyof typeof BirthScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    type: 'type',
    date: 'date',
    value: 'value',
    person: 'person',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    farmId: 'farmId',
    animalId: 'animalId'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    title: 'title',
    type: 'type',
    date: 'date',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    farmId: 'farmId'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const EventAnimalScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    eventId: 'eventId',
    animalId: 'animalId'
  };

  export type EventAnimalScalarFieldEnum = (typeof EventAnimalScalarFieldEnum)[keyof typeof EventAnimalScalarFieldEnum]


  export const LoteScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    descricao: 'descricao',
    finalidade: 'finalidade',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    farmId: 'farmId'
  };

  export type LoteScalarFieldEnum = (typeof LoteScalarFieldEnum)[keyof typeof LoteScalarFieldEnum]


  export const FarmScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    phone: 'phone',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FarmScalarFieldEnum = (typeof FarmScalarFieldEnum)[keyof typeof FarmScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    fullName: 'fullName',
    role: 'role',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    farmId: 'farmId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type AnimalWhereInput = {
    AND?: AnimalWhereInput | AnimalWhereInput[]
    OR?: AnimalWhereInput[]
    NOT?: AnimalWhereInput | AnimalWhereInput[]
    id?: StringFilter<"Animal"> | string
    name?: StringFilter<"Animal"> | string
    tag?: StringFilter<"Animal"> | string
    breed?: StringFilter<"Animal"> | string
    gender?: StringFilter<"Animal"> | string
    birthDate?: DateTimeFilter<"Animal"> | Date | string
    status?: StringFilter<"Animal"> | string
    reproductiveStatus?: StringNullableFilter<"Animal"> | string | null
    inseminationDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    expectedBirthDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    abortionDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    weight?: FloatNullableFilter<"Animal"> | number | null
    notes?: StringNullableFilter<"Animal"> | string | null
    purchaseDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    purchaseValue?: FloatNullableFilter<"Animal"> | number | null
    active?: BoolFilter<"Animal"> | boolean
    createdAt?: DateTimeFilter<"Animal"> | Date | string
    updatedAt?: DateTimeFilter<"Animal"> | Date | string
    farmId?: StringFilter<"Animal"> | string
    loteId?: StringNullableFilter<"Animal"> | string | null
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
    motherOf?: BirthListRelationFilter
    fatherOf?: BirthListRelationFilter
    childOf?: XOR<BirthNullableScalarRelationFilter, BirthWhereInput> | null
    transactions?: TransactionListRelationFilter
    events?: EventAnimalListRelationFilter
    Birth?: BirthListRelationFilter
    lote?: XOR<LoteNullableScalarRelationFilter, LoteWhereInput> | null
  }

  export type AnimalOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    tag?: SortOrder
    breed?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    status?: SortOrder
    reproductiveStatus?: SortOrderInput | SortOrder
    inseminationDate?: SortOrderInput | SortOrder
    expectedBirthDate?: SortOrderInput | SortOrder
    abortionDate?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    purchaseDate?: SortOrderInput | SortOrder
    purchaseValue?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    loteId?: SortOrderInput | SortOrder
    farm?: FarmOrderByWithRelationInput
    motherOf?: BirthOrderByRelationAggregateInput
    fatherOf?: BirthOrderByRelationAggregateInput
    childOf?: BirthOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
    events?: EventAnimalOrderByRelationAggregateInput
    Birth?: BirthOrderByRelationAggregateInput
    lote?: LoteOrderByWithRelationInput
  }

  export type AnimalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tag_farmId?: AnimalTagFarmIdCompoundUniqueInput
    AND?: AnimalWhereInput | AnimalWhereInput[]
    OR?: AnimalWhereInput[]
    NOT?: AnimalWhereInput | AnimalWhereInput[]
    name?: StringFilter<"Animal"> | string
    tag?: StringFilter<"Animal"> | string
    breed?: StringFilter<"Animal"> | string
    gender?: StringFilter<"Animal"> | string
    birthDate?: DateTimeFilter<"Animal"> | Date | string
    status?: StringFilter<"Animal"> | string
    reproductiveStatus?: StringNullableFilter<"Animal"> | string | null
    inseminationDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    expectedBirthDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    abortionDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    weight?: FloatNullableFilter<"Animal"> | number | null
    notes?: StringNullableFilter<"Animal"> | string | null
    purchaseDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    purchaseValue?: FloatNullableFilter<"Animal"> | number | null
    active?: BoolFilter<"Animal"> | boolean
    createdAt?: DateTimeFilter<"Animal"> | Date | string
    updatedAt?: DateTimeFilter<"Animal"> | Date | string
    farmId?: StringFilter<"Animal"> | string
    loteId?: StringNullableFilter<"Animal"> | string | null
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
    motherOf?: BirthListRelationFilter
    fatherOf?: BirthListRelationFilter
    childOf?: XOR<BirthNullableScalarRelationFilter, BirthWhereInput> | null
    transactions?: TransactionListRelationFilter
    events?: EventAnimalListRelationFilter
    Birth?: BirthListRelationFilter
    lote?: XOR<LoteNullableScalarRelationFilter, LoteWhereInput> | null
  }, "id" | "tag_farmId">

  export type AnimalOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    tag?: SortOrder
    breed?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    status?: SortOrder
    reproductiveStatus?: SortOrderInput | SortOrder
    inseminationDate?: SortOrderInput | SortOrder
    expectedBirthDate?: SortOrderInput | SortOrder
    abortionDate?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    purchaseDate?: SortOrderInput | SortOrder
    purchaseValue?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    loteId?: SortOrderInput | SortOrder
    _count?: AnimalCountOrderByAggregateInput
    _avg?: AnimalAvgOrderByAggregateInput
    _max?: AnimalMaxOrderByAggregateInput
    _min?: AnimalMinOrderByAggregateInput
    _sum?: AnimalSumOrderByAggregateInput
  }

  export type AnimalScalarWhereWithAggregatesInput = {
    AND?: AnimalScalarWhereWithAggregatesInput | AnimalScalarWhereWithAggregatesInput[]
    OR?: AnimalScalarWhereWithAggregatesInput[]
    NOT?: AnimalScalarWhereWithAggregatesInput | AnimalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Animal"> | string
    name?: StringWithAggregatesFilter<"Animal"> | string
    tag?: StringWithAggregatesFilter<"Animal"> | string
    breed?: StringWithAggregatesFilter<"Animal"> | string
    gender?: StringWithAggregatesFilter<"Animal"> | string
    birthDate?: DateTimeWithAggregatesFilter<"Animal"> | Date | string
    status?: StringWithAggregatesFilter<"Animal"> | string
    reproductiveStatus?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    inseminationDate?: DateTimeNullableWithAggregatesFilter<"Animal"> | Date | string | null
    expectedBirthDate?: DateTimeNullableWithAggregatesFilter<"Animal"> | Date | string | null
    abortionDate?: DateTimeNullableWithAggregatesFilter<"Animal"> | Date | string | null
    weight?: FloatNullableWithAggregatesFilter<"Animal"> | number | null
    notes?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    purchaseDate?: DateTimeNullableWithAggregatesFilter<"Animal"> | Date | string | null
    purchaseValue?: FloatNullableWithAggregatesFilter<"Animal"> | number | null
    active?: BoolWithAggregatesFilter<"Animal"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Animal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Animal"> | Date | string
    farmId?: StringWithAggregatesFilter<"Animal"> | string
    loteId?: StringNullableWithAggregatesFilter<"Animal"> | string | null
  }

  export type BirthWhereInput = {
    AND?: BirthWhereInput | BirthWhereInput[]
    OR?: BirthWhereInput[]
    NOT?: BirthWhereInput | BirthWhereInput[]
    id?: StringFilter<"Birth"> | string
    birthDate?: DateTimeFilter<"Birth"> | Date | string
    createdAt?: DateTimeFilter<"Birth"> | Date | string
    updatedAt?: DateTimeFilter<"Birth"> | Date | string
    motherId?: StringFilter<"Birth"> | string
    fatherId?: StringFilter<"Birth"> | string
    childId?: StringFilter<"Birth"> | string
    animalId?: StringNullableFilter<"Birth"> | string | null
    mother?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
    father?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
    child?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
    Animal?: XOR<AnimalNullableScalarRelationFilter, AnimalWhereInput> | null
  }

  export type BirthOrderByWithRelationInput = {
    id?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    motherId?: SortOrder
    fatherId?: SortOrder
    childId?: SortOrder
    animalId?: SortOrderInput | SortOrder
    mother?: AnimalOrderByWithRelationInput
    father?: AnimalOrderByWithRelationInput
    child?: AnimalOrderByWithRelationInput
    Animal?: AnimalOrderByWithRelationInput
  }

  export type BirthWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    childId?: string
    AND?: BirthWhereInput | BirthWhereInput[]
    OR?: BirthWhereInput[]
    NOT?: BirthWhereInput | BirthWhereInput[]
    birthDate?: DateTimeFilter<"Birth"> | Date | string
    createdAt?: DateTimeFilter<"Birth"> | Date | string
    updatedAt?: DateTimeFilter<"Birth"> | Date | string
    motherId?: StringFilter<"Birth"> | string
    fatherId?: StringFilter<"Birth"> | string
    animalId?: StringNullableFilter<"Birth"> | string | null
    mother?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
    father?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
    child?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
    Animal?: XOR<AnimalNullableScalarRelationFilter, AnimalWhereInput> | null
  }, "id" | "childId">

  export type BirthOrderByWithAggregationInput = {
    id?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    motherId?: SortOrder
    fatherId?: SortOrder
    childId?: SortOrder
    animalId?: SortOrderInput | SortOrder
    _count?: BirthCountOrderByAggregateInput
    _max?: BirthMaxOrderByAggregateInput
    _min?: BirthMinOrderByAggregateInput
  }

  export type BirthScalarWhereWithAggregatesInput = {
    AND?: BirthScalarWhereWithAggregatesInput | BirthScalarWhereWithAggregatesInput[]
    OR?: BirthScalarWhereWithAggregatesInput[]
    NOT?: BirthScalarWhereWithAggregatesInput | BirthScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Birth"> | string
    birthDate?: DateTimeWithAggregatesFilter<"Birth"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Birth"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Birth"> | Date | string
    motherId?: StringWithAggregatesFilter<"Birth"> | string
    fatherId?: StringWithAggregatesFilter<"Birth"> | string
    childId?: StringWithAggregatesFilter<"Birth"> | string
    animalId?: StringNullableWithAggregatesFilter<"Birth"> | string | null
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    date?: DateTimeFilter<"Transaction"> | Date | string
    value?: FloatFilter<"Transaction"> | number
    person?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    farmId?: StringFilter<"Transaction"> | string
    animalId?: StringFilter<"Transaction"> | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
    animal?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    date?: SortOrder
    value?: SortOrder
    person?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    animalId?: SortOrder
    farm?: FarmOrderByWithRelationInput
    animal?: AnimalOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    type?: StringFilter<"Transaction"> | string
    date?: DateTimeFilter<"Transaction"> | Date | string
    value?: FloatFilter<"Transaction"> | number
    person?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    farmId?: StringFilter<"Transaction"> | string
    animalId?: StringFilter<"Transaction"> | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
    animal?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    date?: SortOrder
    value?: SortOrder
    person?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    animalId?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    type?: StringWithAggregatesFilter<"Transaction"> | string
    date?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    value?: FloatWithAggregatesFilter<"Transaction"> | number
    person?: StringWithAggregatesFilter<"Transaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    farmId?: StringWithAggregatesFilter<"Transaction"> | string
    animalId?: StringWithAggregatesFilter<"Transaction"> | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    title?: StringFilter<"Event"> | string
    type?: StringFilter<"Event"> | string
    date?: DateTimeFilter<"Event"> | Date | string
    description?: StringFilter<"Event"> | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    farmId?: StringFilter<"Event"> | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
    animals?: EventAnimalListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    date?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    farm?: FarmOrderByWithRelationInput
    animals?: EventAnimalOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    title?: StringFilter<"Event"> | string
    type?: StringFilter<"Event"> | string
    date?: DateTimeFilter<"Event"> | Date | string
    description?: StringFilter<"Event"> | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    farmId?: StringFilter<"Event"> | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
    animals?: EventAnimalListRelationFilter
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    date?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    title?: StringWithAggregatesFilter<"Event"> | string
    type?: StringWithAggregatesFilter<"Event"> | string
    date?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    description?: StringWithAggregatesFilter<"Event"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    farmId?: StringWithAggregatesFilter<"Event"> | string
  }

  export type EventAnimalWhereInput = {
    AND?: EventAnimalWhereInput | EventAnimalWhereInput[]
    OR?: EventAnimalWhereInput[]
    NOT?: EventAnimalWhereInput | EventAnimalWhereInput[]
    id?: StringFilter<"EventAnimal"> | string
    createdAt?: DateTimeFilter<"EventAnimal"> | Date | string
    updatedAt?: DateTimeFilter<"EventAnimal"> | Date | string
    eventId?: StringFilter<"EventAnimal"> | string
    animalId?: StringFilter<"EventAnimal"> | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    animal?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
  }

  export type EventAnimalOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    animalId?: SortOrder
    event?: EventOrderByWithRelationInput
    animal?: AnimalOrderByWithRelationInput
  }

  export type EventAnimalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    eventId_animalId?: EventAnimalEventIdAnimalIdCompoundUniqueInput
    AND?: EventAnimalWhereInput | EventAnimalWhereInput[]
    OR?: EventAnimalWhereInput[]
    NOT?: EventAnimalWhereInput | EventAnimalWhereInput[]
    createdAt?: DateTimeFilter<"EventAnimal"> | Date | string
    updatedAt?: DateTimeFilter<"EventAnimal"> | Date | string
    eventId?: StringFilter<"EventAnimal"> | string
    animalId?: StringFilter<"EventAnimal"> | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    animal?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
  }, "id" | "eventId_animalId">

  export type EventAnimalOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    animalId?: SortOrder
    _count?: EventAnimalCountOrderByAggregateInput
    _max?: EventAnimalMaxOrderByAggregateInput
    _min?: EventAnimalMinOrderByAggregateInput
  }

  export type EventAnimalScalarWhereWithAggregatesInput = {
    AND?: EventAnimalScalarWhereWithAggregatesInput | EventAnimalScalarWhereWithAggregatesInput[]
    OR?: EventAnimalScalarWhereWithAggregatesInput[]
    NOT?: EventAnimalScalarWhereWithAggregatesInput | EventAnimalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EventAnimal"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EventAnimal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EventAnimal"> | Date | string
    eventId?: StringWithAggregatesFilter<"EventAnimal"> | string
    animalId?: StringWithAggregatesFilter<"EventAnimal"> | string
  }

  export type LoteWhereInput = {
    AND?: LoteWhereInput | LoteWhereInput[]
    OR?: LoteWhereInput[]
    NOT?: LoteWhereInput | LoteWhereInput[]
    id?: StringFilter<"Lote"> | string
    nome?: StringFilter<"Lote"> | string
    descricao?: StringNullableFilter<"Lote"> | string | null
    finalidade?: StringFilter<"Lote"> | string
    createdAt?: DateTimeFilter<"Lote"> | Date | string
    updatedAt?: DateTimeFilter<"Lote"> | Date | string
    farmId?: StringFilter<"Lote"> | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
    animais?: AnimalListRelationFilter
  }

  export type LoteOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    finalidade?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    farm?: FarmOrderByWithRelationInput
    animais?: AnimalOrderByRelationAggregateInput
  }

  export type LoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LoteWhereInput | LoteWhereInput[]
    OR?: LoteWhereInput[]
    NOT?: LoteWhereInput | LoteWhereInput[]
    nome?: StringFilter<"Lote"> | string
    descricao?: StringNullableFilter<"Lote"> | string | null
    finalidade?: StringFilter<"Lote"> | string
    createdAt?: DateTimeFilter<"Lote"> | Date | string
    updatedAt?: DateTimeFilter<"Lote"> | Date | string
    farmId?: StringFilter<"Lote"> | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
    animais?: AnimalListRelationFilter
  }, "id">

  export type LoteOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    finalidade?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    _count?: LoteCountOrderByAggregateInput
    _max?: LoteMaxOrderByAggregateInput
    _min?: LoteMinOrderByAggregateInput
  }

  export type LoteScalarWhereWithAggregatesInput = {
    AND?: LoteScalarWhereWithAggregatesInput | LoteScalarWhereWithAggregatesInput[]
    OR?: LoteScalarWhereWithAggregatesInput[]
    NOT?: LoteScalarWhereWithAggregatesInput | LoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lote"> | string
    nome?: StringWithAggregatesFilter<"Lote"> | string
    descricao?: StringNullableWithAggregatesFilter<"Lote"> | string | null
    finalidade?: StringWithAggregatesFilter<"Lote"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Lote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lote"> | Date | string
    farmId?: StringWithAggregatesFilter<"Lote"> | string
  }

  export type FarmWhereInput = {
    AND?: FarmWhereInput | FarmWhereInput[]
    OR?: FarmWhereInput[]
    NOT?: FarmWhereInput | FarmWhereInput[]
    id?: StringFilter<"Farm"> | string
    name?: StringFilter<"Farm"> | string
    address?: StringNullableFilter<"Farm"> | string | null
    phone?: StringNullableFilter<"Farm"> | string | null
    active?: BoolFilter<"Farm"> | boolean
    createdAt?: DateTimeFilter<"Farm"> | Date | string
    updatedAt?: DateTimeFilter<"Farm"> | Date | string
    users?: UserListRelationFilter
    animals?: AnimalListRelationFilter
    lotes?: LoteListRelationFilter
    events?: EventListRelationFilter
    transactions?: TransactionListRelationFilter
  }

  export type FarmOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    animals?: AnimalOrderByRelationAggregateInput
    lotes?: LoteOrderByRelationAggregateInput
    events?: EventOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type FarmWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FarmWhereInput | FarmWhereInput[]
    OR?: FarmWhereInput[]
    NOT?: FarmWhereInput | FarmWhereInput[]
    name?: StringFilter<"Farm"> | string
    address?: StringNullableFilter<"Farm"> | string | null
    phone?: StringNullableFilter<"Farm"> | string | null
    active?: BoolFilter<"Farm"> | boolean
    createdAt?: DateTimeFilter<"Farm"> | Date | string
    updatedAt?: DateTimeFilter<"Farm"> | Date | string
    users?: UserListRelationFilter
    animals?: AnimalListRelationFilter
    lotes?: LoteListRelationFilter
    events?: EventListRelationFilter
    transactions?: TransactionListRelationFilter
  }, "id">

  export type FarmOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FarmCountOrderByAggregateInput
    _max?: FarmMaxOrderByAggregateInput
    _min?: FarmMinOrderByAggregateInput
  }

  export type FarmScalarWhereWithAggregatesInput = {
    AND?: FarmScalarWhereWithAggregatesInput | FarmScalarWhereWithAggregatesInput[]
    OR?: FarmScalarWhereWithAggregatesInput[]
    NOT?: FarmScalarWhereWithAggregatesInput | FarmScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Farm"> | string
    name?: StringWithAggregatesFilter<"Farm"> | string
    address?: StringNullableWithAggregatesFilter<"Farm"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Farm"> | string | null
    active?: BoolWithAggregatesFilter<"Farm"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Farm"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Farm"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    active?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    farmId?: StringFilter<"User"> | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    farm?: FarmOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    active?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    farmId?: StringFilter<"User"> | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    active?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    farmId?: StringWithAggregatesFilter<"User"> | string
  }

  export type AnimalCreateInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutAnimalsInput
    motherOf?: BirthCreateNestedManyWithoutMotherInput
    fatherOf?: BirthCreateNestedManyWithoutFatherInput
    childOf?: BirthCreateNestedOneWithoutChildInput
    transactions?: TransactionCreateNestedManyWithoutAnimalInput
    events?: EventAnimalCreateNestedManyWithoutAnimalInput
    Birth?: BirthCreateNestedManyWithoutAnimalInput
    lote?: LoteCreateNestedOneWithoutAnimaisInput
  }

  export type AnimalUncheckedCreateInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
    loteId?: string | null
    motherOf?: BirthUncheckedCreateNestedManyWithoutMotherInput
    fatherOf?: BirthUncheckedCreateNestedManyWithoutFatherInput
    childOf?: BirthUncheckedCreateNestedOneWithoutChildInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutAnimalInput
    events?: EventAnimalUncheckedCreateNestedManyWithoutAnimalInput
    Birth?: BirthUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutAnimalsNestedInput
    motherOf?: BirthUpdateManyWithoutMotherNestedInput
    fatherOf?: BirthUpdateManyWithoutFatherNestedInput
    childOf?: BirthUpdateOneWithoutChildNestedInput
    transactions?: TransactionUpdateManyWithoutAnimalNestedInput
    events?: EventAnimalUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUpdateManyWithoutAnimalNestedInput
    lote?: LoteUpdateOneWithoutAnimaisNestedInput
  }

  export type AnimalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    loteId?: NullableStringFieldUpdateOperationsInput | string | null
    motherOf?: BirthUncheckedUpdateManyWithoutMotherNestedInput
    fatherOf?: BirthUncheckedUpdateManyWithoutFatherNestedInput
    childOf?: BirthUncheckedUpdateOneWithoutChildNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutAnimalNestedInput
    events?: EventAnimalUncheckedUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalCreateManyInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
    loteId?: string | null
  }

  export type AnimalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    loteId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BirthCreateInput = {
    id?: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    mother: AnimalCreateNestedOneWithoutMotherOfInput
    father: AnimalCreateNestedOneWithoutFatherOfInput
    child: AnimalCreateNestedOneWithoutChildOfInput
    Animal?: AnimalCreateNestedOneWithoutBirthInput
  }

  export type BirthUncheckedCreateInput = {
    id?: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    motherId: string
    fatherId: string
    childId: string
    animalId?: string | null
  }

  export type BirthUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mother?: AnimalUpdateOneRequiredWithoutMotherOfNestedInput
    father?: AnimalUpdateOneRequiredWithoutFatherOfNestedInput
    child?: AnimalUpdateOneRequiredWithoutChildOfNestedInput
    Animal?: AnimalUpdateOneWithoutBirthNestedInput
  }

  export type BirthUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    motherId?: StringFieldUpdateOperationsInput | string
    fatherId?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    animalId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BirthCreateManyInput = {
    id?: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    motherId: string
    fatherId: string
    childId: string
    animalId?: string | null
  }

  export type BirthUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BirthUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    motherId?: StringFieldUpdateOperationsInput | string
    fatherId?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    animalId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionCreateInput = {
    id?: string
    type: string
    date: Date | string
    value: number
    person: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutTransactionsInput
    animal: AnimalCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    type: string
    date: Date | string
    value: number
    person: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
    animalId: string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    person?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutTransactionsNestedInput
    animal?: AnimalUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    person?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    animalId?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    type: string
    date: Date | string
    value: number
    person: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
    animalId: string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    person?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    person?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    animalId?: StringFieldUpdateOperationsInput | string
  }

  export type EventCreateInput = {
    id?: string
    title: string
    type: string
    date: Date | string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutEventsInput
    animals?: EventAnimalCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: string
    title: string
    type: string
    date: Date | string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
    animals?: EventAnimalUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutEventsNestedInput
    animals?: EventAnimalUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    animals?: EventAnimalUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: string
    title: string
    type: string
    date: Date | string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
  }

  export type EventAnimalCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutAnimalsInput
    animal: AnimalCreateNestedOneWithoutEventsInput
  }

  export type EventAnimalUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
    animalId: string
  }

  export type EventAnimalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutAnimalsNestedInput
    animal?: AnimalUpdateOneRequiredWithoutEventsNestedInput
  }

  export type EventAnimalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    animalId?: StringFieldUpdateOperationsInput | string
  }

  export type EventAnimalCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
    animalId: string
  }

  export type EventAnimalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventAnimalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    animalId?: StringFieldUpdateOperationsInput | string
  }

  export type LoteCreateInput = {
    id?: string
    nome: string
    descricao?: string | null
    finalidade: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutLotesInput
    animais?: AnimalCreateNestedManyWithoutLoteInput
  }

  export type LoteUncheckedCreateInput = {
    id?: string
    nome: string
    descricao?: string | null
    finalidade: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
    animais?: AnimalUncheckedCreateNestedManyWithoutLoteInput
  }

  export type LoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    finalidade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutLotesNestedInput
    animais?: AnimalUpdateManyWithoutLoteNestedInput
  }

  export type LoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    finalidade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    animais?: AnimalUncheckedUpdateManyWithoutLoteNestedInput
  }

  export type LoteCreateManyInput = {
    id?: string
    nome: string
    descricao?: string | null
    finalidade: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
  }

  export type LoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    finalidade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    finalidade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
  }

  export type FarmCreateInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutFarmInput
    animals?: AnimalCreateNestedManyWithoutFarmInput
    lotes?: LoteCreateNestedManyWithoutFarmInput
    events?: EventCreateNestedManyWithoutFarmInput
    transactions?: TransactionCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutFarmInput
    animals?: AnimalUncheckedCreateNestedManyWithoutFarmInput
    lotes?: LoteUncheckedCreateNestedManyWithoutFarmInput
    events?: EventUncheckedCreateNestedManyWithoutFarmInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutFarmNestedInput
    animals?: AnimalUpdateManyWithoutFarmNestedInput
    lotes?: LoteUpdateManyWithoutFarmNestedInput
    events?: EventUpdateManyWithoutFarmNestedInput
    transactions?: TransactionUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutFarmNestedInput
    animals?: AnimalUncheckedUpdateManyWithoutFarmNestedInput
    lotes?: LoteUncheckedUpdateManyWithoutFarmNestedInput
    events?: EventUncheckedUpdateManyWithoutFarmNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type FarmCreateManyInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FarmUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    fullName: string
    role?: $Enums.UserRole
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    fullName: string
    role?: $Enums.UserRole
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email: string
    password: string
    fullName: string
    role?: $Enums.UserRole
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FarmScalarRelationFilter = {
    is?: FarmWhereInput
    isNot?: FarmWhereInput
  }

  export type BirthListRelationFilter = {
    every?: BirthWhereInput
    some?: BirthWhereInput
    none?: BirthWhereInput
  }

  export type BirthNullableScalarRelationFilter = {
    is?: BirthWhereInput | null
    isNot?: BirthWhereInput | null
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type EventAnimalListRelationFilter = {
    every?: EventAnimalWhereInput
    some?: EventAnimalWhereInput
    none?: EventAnimalWhereInput
  }

  export type LoteNullableScalarRelationFilter = {
    is?: LoteWhereInput | null
    isNot?: LoteWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BirthOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventAnimalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnimalTagFarmIdCompoundUniqueInput = {
    tag: string
    farmId: string
  }

  export type AnimalCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tag?: SortOrder
    breed?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    status?: SortOrder
    reproductiveStatus?: SortOrder
    inseminationDate?: SortOrder
    expectedBirthDate?: SortOrder
    abortionDate?: SortOrder
    weight?: SortOrder
    notes?: SortOrder
    purchaseDate?: SortOrder
    purchaseValue?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    loteId?: SortOrder
  }

  export type AnimalAvgOrderByAggregateInput = {
    weight?: SortOrder
    purchaseValue?: SortOrder
  }

  export type AnimalMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tag?: SortOrder
    breed?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    status?: SortOrder
    reproductiveStatus?: SortOrder
    inseminationDate?: SortOrder
    expectedBirthDate?: SortOrder
    abortionDate?: SortOrder
    weight?: SortOrder
    notes?: SortOrder
    purchaseDate?: SortOrder
    purchaseValue?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    loteId?: SortOrder
  }

  export type AnimalMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tag?: SortOrder
    breed?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    status?: SortOrder
    reproductiveStatus?: SortOrder
    inseminationDate?: SortOrder
    expectedBirthDate?: SortOrder
    abortionDate?: SortOrder
    weight?: SortOrder
    notes?: SortOrder
    purchaseDate?: SortOrder
    purchaseValue?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    loteId?: SortOrder
  }

  export type AnimalSumOrderByAggregateInput = {
    weight?: SortOrder
    purchaseValue?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AnimalScalarRelationFilter = {
    is?: AnimalWhereInput
    isNot?: AnimalWhereInput
  }

  export type AnimalNullableScalarRelationFilter = {
    is?: AnimalWhereInput | null
    isNot?: AnimalWhereInput | null
  }

  export type BirthCountOrderByAggregateInput = {
    id?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    motherId?: SortOrder
    fatherId?: SortOrder
    childId?: SortOrder
    animalId?: SortOrder
  }

  export type BirthMaxOrderByAggregateInput = {
    id?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    motherId?: SortOrder
    fatherId?: SortOrder
    childId?: SortOrder
    animalId?: SortOrder
  }

  export type BirthMinOrderByAggregateInput = {
    id?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    motherId?: SortOrder
    fatherId?: SortOrder
    childId?: SortOrder
    animalId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    date?: SortOrder
    value?: SortOrder
    person?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    animalId?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    date?: SortOrder
    value?: SortOrder
    person?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    animalId?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    date?: SortOrder
    value?: SortOrder
    person?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
    animalId?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    value?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    date?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    date?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    date?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
  }

  export type EventScalarRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type EventAnimalEventIdAnimalIdCompoundUniqueInput = {
    eventId: string
    animalId: string
  }

  export type EventAnimalCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    animalId?: SortOrder
  }

  export type EventAnimalMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    animalId?: SortOrder
  }

  export type EventAnimalMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    animalId?: SortOrder
  }

  export type AnimalListRelationFilter = {
    every?: AnimalWhereInput
    some?: AnimalWhereInput
    none?: AnimalWhereInput
  }

  export type AnimalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoteCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    finalidade?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
  }

  export type LoteMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    finalidade?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
  }

  export type LoteMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    finalidade?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type LoteListRelationFilter = {
    every?: LoteWhereInput
    some?: LoteWhereInput
    none?: LoteWhereInput
  }

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FarmCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FarmMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FarmMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmId?: SortOrder
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type FarmCreateNestedOneWithoutAnimalsInput = {
    create?: XOR<FarmCreateWithoutAnimalsInput, FarmUncheckedCreateWithoutAnimalsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutAnimalsInput
    connect?: FarmWhereUniqueInput
  }

  export type BirthCreateNestedManyWithoutMotherInput = {
    create?: XOR<BirthCreateWithoutMotherInput, BirthUncheckedCreateWithoutMotherInput> | BirthCreateWithoutMotherInput[] | BirthUncheckedCreateWithoutMotherInput[]
    connectOrCreate?: BirthCreateOrConnectWithoutMotherInput | BirthCreateOrConnectWithoutMotherInput[]
    createMany?: BirthCreateManyMotherInputEnvelope
    connect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
  }

  export type BirthCreateNestedManyWithoutFatherInput = {
    create?: XOR<BirthCreateWithoutFatherInput, BirthUncheckedCreateWithoutFatherInput> | BirthCreateWithoutFatherInput[] | BirthUncheckedCreateWithoutFatherInput[]
    connectOrCreate?: BirthCreateOrConnectWithoutFatherInput | BirthCreateOrConnectWithoutFatherInput[]
    createMany?: BirthCreateManyFatherInputEnvelope
    connect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
  }

  export type BirthCreateNestedOneWithoutChildInput = {
    create?: XOR<BirthCreateWithoutChildInput, BirthUncheckedCreateWithoutChildInput>
    connectOrCreate?: BirthCreateOrConnectWithoutChildInput
    connect?: BirthWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutAnimalInput = {
    create?: XOR<TransactionCreateWithoutAnimalInput, TransactionUncheckedCreateWithoutAnimalInput> | TransactionCreateWithoutAnimalInput[] | TransactionUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAnimalInput | TransactionCreateOrConnectWithoutAnimalInput[]
    createMany?: TransactionCreateManyAnimalInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type EventAnimalCreateNestedManyWithoutAnimalInput = {
    create?: XOR<EventAnimalCreateWithoutAnimalInput, EventAnimalUncheckedCreateWithoutAnimalInput> | EventAnimalCreateWithoutAnimalInput[] | EventAnimalUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: EventAnimalCreateOrConnectWithoutAnimalInput | EventAnimalCreateOrConnectWithoutAnimalInput[]
    createMany?: EventAnimalCreateManyAnimalInputEnvelope
    connect?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
  }

  export type BirthCreateNestedManyWithoutAnimalInput = {
    create?: XOR<BirthCreateWithoutAnimalInput, BirthUncheckedCreateWithoutAnimalInput> | BirthCreateWithoutAnimalInput[] | BirthUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: BirthCreateOrConnectWithoutAnimalInput | BirthCreateOrConnectWithoutAnimalInput[]
    createMany?: BirthCreateManyAnimalInputEnvelope
    connect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
  }

  export type LoteCreateNestedOneWithoutAnimaisInput = {
    create?: XOR<LoteCreateWithoutAnimaisInput, LoteUncheckedCreateWithoutAnimaisInput>
    connectOrCreate?: LoteCreateOrConnectWithoutAnimaisInput
    connect?: LoteWhereUniqueInput
  }

  export type BirthUncheckedCreateNestedManyWithoutMotherInput = {
    create?: XOR<BirthCreateWithoutMotherInput, BirthUncheckedCreateWithoutMotherInput> | BirthCreateWithoutMotherInput[] | BirthUncheckedCreateWithoutMotherInput[]
    connectOrCreate?: BirthCreateOrConnectWithoutMotherInput | BirthCreateOrConnectWithoutMotherInput[]
    createMany?: BirthCreateManyMotherInputEnvelope
    connect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
  }

  export type BirthUncheckedCreateNestedManyWithoutFatherInput = {
    create?: XOR<BirthCreateWithoutFatherInput, BirthUncheckedCreateWithoutFatherInput> | BirthCreateWithoutFatherInput[] | BirthUncheckedCreateWithoutFatherInput[]
    connectOrCreate?: BirthCreateOrConnectWithoutFatherInput | BirthCreateOrConnectWithoutFatherInput[]
    createMany?: BirthCreateManyFatherInputEnvelope
    connect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
  }

  export type BirthUncheckedCreateNestedOneWithoutChildInput = {
    create?: XOR<BirthCreateWithoutChildInput, BirthUncheckedCreateWithoutChildInput>
    connectOrCreate?: BirthCreateOrConnectWithoutChildInput
    connect?: BirthWhereUniqueInput
  }

  export type TransactionUncheckedCreateNestedManyWithoutAnimalInput = {
    create?: XOR<TransactionCreateWithoutAnimalInput, TransactionUncheckedCreateWithoutAnimalInput> | TransactionCreateWithoutAnimalInput[] | TransactionUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAnimalInput | TransactionCreateOrConnectWithoutAnimalInput[]
    createMany?: TransactionCreateManyAnimalInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type EventAnimalUncheckedCreateNestedManyWithoutAnimalInput = {
    create?: XOR<EventAnimalCreateWithoutAnimalInput, EventAnimalUncheckedCreateWithoutAnimalInput> | EventAnimalCreateWithoutAnimalInput[] | EventAnimalUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: EventAnimalCreateOrConnectWithoutAnimalInput | EventAnimalCreateOrConnectWithoutAnimalInput[]
    createMany?: EventAnimalCreateManyAnimalInputEnvelope
    connect?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
  }

  export type BirthUncheckedCreateNestedManyWithoutAnimalInput = {
    create?: XOR<BirthCreateWithoutAnimalInput, BirthUncheckedCreateWithoutAnimalInput> | BirthCreateWithoutAnimalInput[] | BirthUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: BirthCreateOrConnectWithoutAnimalInput | BirthCreateOrConnectWithoutAnimalInput[]
    createMany?: BirthCreateManyAnimalInputEnvelope
    connect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FarmUpdateOneRequiredWithoutAnimalsNestedInput = {
    create?: XOR<FarmCreateWithoutAnimalsInput, FarmUncheckedCreateWithoutAnimalsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutAnimalsInput
    upsert?: FarmUpsertWithoutAnimalsInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutAnimalsInput, FarmUpdateWithoutAnimalsInput>, FarmUncheckedUpdateWithoutAnimalsInput>
  }

  export type BirthUpdateManyWithoutMotherNestedInput = {
    create?: XOR<BirthCreateWithoutMotherInput, BirthUncheckedCreateWithoutMotherInput> | BirthCreateWithoutMotherInput[] | BirthUncheckedCreateWithoutMotherInput[]
    connectOrCreate?: BirthCreateOrConnectWithoutMotherInput | BirthCreateOrConnectWithoutMotherInput[]
    upsert?: BirthUpsertWithWhereUniqueWithoutMotherInput | BirthUpsertWithWhereUniqueWithoutMotherInput[]
    createMany?: BirthCreateManyMotherInputEnvelope
    set?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    disconnect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    delete?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    connect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    update?: BirthUpdateWithWhereUniqueWithoutMotherInput | BirthUpdateWithWhereUniqueWithoutMotherInput[]
    updateMany?: BirthUpdateManyWithWhereWithoutMotherInput | BirthUpdateManyWithWhereWithoutMotherInput[]
    deleteMany?: BirthScalarWhereInput | BirthScalarWhereInput[]
  }

  export type BirthUpdateManyWithoutFatherNestedInput = {
    create?: XOR<BirthCreateWithoutFatherInput, BirthUncheckedCreateWithoutFatherInput> | BirthCreateWithoutFatherInput[] | BirthUncheckedCreateWithoutFatherInput[]
    connectOrCreate?: BirthCreateOrConnectWithoutFatherInput | BirthCreateOrConnectWithoutFatherInput[]
    upsert?: BirthUpsertWithWhereUniqueWithoutFatherInput | BirthUpsertWithWhereUniqueWithoutFatherInput[]
    createMany?: BirthCreateManyFatherInputEnvelope
    set?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    disconnect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    delete?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    connect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    update?: BirthUpdateWithWhereUniqueWithoutFatherInput | BirthUpdateWithWhereUniqueWithoutFatherInput[]
    updateMany?: BirthUpdateManyWithWhereWithoutFatherInput | BirthUpdateManyWithWhereWithoutFatherInput[]
    deleteMany?: BirthScalarWhereInput | BirthScalarWhereInput[]
  }

  export type BirthUpdateOneWithoutChildNestedInput = {
    create?: XOR<BirthCreateWithoutChildInput, BirthUncheckedCreateWithoutChildInput>
    connectOrCreate?: BirthCreateOrConnectWithoutChildInput
    upsert?: BirthUpsertWithoutChildInput
    disconnect?: BirthWhereInput | boolean
    delete?: BirthWhereInput | boolean
    connect?: BirthWhereUniqueInput
    update?: XOR<XOR<BirthUpdateToOneWithWhereWithoutChildInput, BirthUpdateWithoutChildInput>, BirthUncheckedUpdateWithoutChildInput>
  }

  export type TransactionUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<TransactionCreateWithoutAnimalInput, TransactionUncheckedCreateWithoutAnimalInput> | TransactionCreateWithoutAnimalInput[] | TransactionUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAnimalInput | TransactionCreateOrConnectWithoutAnimalInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutAnimalInput | TransactionUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: TransactionCreateManyAnimalInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutAnimalInput | TransactionUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutAnimalInput | TransactionUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type EventAnimalUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<EventAnimalCreateWithoutAnimalInput, EventAnimalUncheckedCreateWithoutAnimalInput> | EventAnimalCreateWithoutAnimalInput[] | EventAnimalUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: EventAnimalCreateOrConnectWithoutAnimalInput | EventAnimalCreateOrConnectWithoutAnimalInput[]
    upsert?: EventAnimalUpsertWithWhereUniqueWithoutAnimalInput | EventAnimalUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: EventAnimalCreateManyAnimalInputEnvelope
    set?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    disconnect?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    delete?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    connect?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    update?: EventAnimalUpdateWithWhereUniqueWithoutAnimalInput | EventAnimalUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: EventAnimalUpdateManyWithWhereWithoutAnimalInput | EventAnimalUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: EventAnimalScalarWhereInput | EventAnimalScalarWhereInput[]
  }

  export type BirthUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<BirthCreateWithoutAnimalInput, BirthUncheckedCreateWithoutAnimalInput> | BirthCreateWithoutAnimalInput[] | BirthUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: BirthCreateOrConnectWithoutAnimalInput | BirthCreateOrConnectWithoutAnimalInput[]
    upsert?: BirthUpsertWithWhereUniqueWithoutAnimalInput | BirthUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: BirthCreateManyAnimalInputEnvelope
    set?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    disconnect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    delete?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    connect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    update?: BirthUpdateWithWhereUniqueWithoutAnimalInput | BirthUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: BirthUpdateManyWithWhereWithoutAnimalInput | BirthUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: BirthScalarWhereInput | BirthScalarWhereInput[]
  }

  export type LoteUpdateOneWithoutAnimaisNestedInput = {
    create?: XOR<LoteCreateWithoutAnimaisInput, LoteUncheckedCreateWithoutAnimaisInput>
    connectOrCreate?: LoteCreateOrConnectWithoutAnimaisInput
    upsert?: LoteUpsertWithoutAnimaisInput
    disconnect?: LoteWhereInput | boolean
    delete?: LoteWhereInput | boolean
    connect?: LoteWhereUniqueInput
    update?: XOR<XOR<LoteUpdateToOneWithWhereWithoutAnimaisInput, LoteUpdateWithoutAnimaisInput>, LoteUncheckedUpdateWithoutAnimaisInput>
  }

  export type BirthUncheckedUpdateManyWithoutMotherNestedInput = {
    create?: XOR<BirthCreateWithoutMotherInput, BirthUncheckedCreateWithoutMotherInput> | BirthCreateWithoutMotherInput[] | BirthUncheckedCreateWithoutMotherInput[]
    connectOrCreate?: BirthCreateOrConnectWithoutMotherInput | BirthCreateOrConnectWithoutMotherInput[]
    upsert?: BirthUpsertWithWhereUniqueWithoutMotherInput | BirthUpsertWithWhereUniqueWithoutMotherInput[]
    createMany?: BirthCreateManyMotherInputEnvelope
    set?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    disconnect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    delete?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    connect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    update?: BirthUpdateWithWhereUniqueWithoutMotherInput | BirthUpdateWithWhereUniqueWithoutMotherInput[]
    updateMany?: BirthUpdateManyWithWhereWithoutMotherInput | BirthUpdateManyWithWhereWithoutMotherInput[]
    deleteMany?: BirthScalarWhereInput | BirthScalarWhereInput[]
  }

  export type BirthUncheckedUpdateManyWithoutFatherNestedInput = {
    create?: XOR<BirthCreateWithoutFatherInput, BirthUncheckedCreateWithoutFatherInput> | BirthCreateWithoutFatherInput[] | BirthUncheckedCreateWithoutFatherInput[]
    connectOrCreate?: BirthCreateOrConnectWithoutFatherInput | BirthCreateOrConnectWithoutFatherInput[]
    upsert?: BirthUpsertWithWhereUniqueWithoutFatherInput | BirthUpsertWithWhereUniqueWithoutFatherInput[]
    createMany?: BirthCreateManyFatherInputEnvelope
    set?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    disconnect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    delete?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    connect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    update?: BirthUpdateWithWhereUniqueWithoutFatherInput | BirthUpdateWithWhereUniqueWithoutFatherInput[]
    updateMany?: BirthUpdateManyWithWhereWithoutFatherInput | BirthUpdateManyWithWhereWithoutFatherInput[]
    deleteMany?: BirthScalarWhereInput | BirthScalarWhereInput[]
  }

  export type BirthUncheckedUpdateOneWithoutChildNestedInput = {
    create?: XOR<BirthCreateWithoutChildInput, BirthUncheckedCreateWithoutChildInput>
    connectOrCreate?: BirthCreateOrConnectWithoutChildInput
    upsert?: BirthUpsertWithoutChildInput
    disconnect?: BirthWhereInput | boolean
    delete?: BirthWhereInput | boolean
    connect?: BirthWhereUniqueInput
    update?: XOR<XOR<BirthUpdateToOneWithWhereWithoutChildInput, BirthUpdateWithoutChildInput>, BirthUncheckedUpdateWithoutChildInput>
  }

  export type TransactionUncheckedUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<TransactionCreateWithoutAnimalInput, TransactionUncheckedCreateWithoutAnimalInput> | TransactionCreateWithoutAnimalInput[] | TransactionUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAnimalInput | TransactionCreateOrConnectWithoutAnimalInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutAnimalInput | TransactionUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: TransactionCreateManyAnimalInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutAnimalInput | TransactionUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutAnimalInput | TransactionUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type EventAnimalUncheckedUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<EventAnimalCreateWithoutAnimalInput, EventAnimalUncheckedCreateWithoutAnimalInput> | EventAnimalCreateWithoutAnimalInput[] | EventAnimalUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: EventAnimalCreateOrConnectWithoutAnimalInput | EventAnimalCreateOrConnectWithoutAnimalInput[]
    upsert?: EventAnimalUpsertWithWhereUniqueWithoutAnimalInput | EventAnimalUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: EventAnimalCreateManyAnimalInputEnvelope
    set?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    disconnect?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    delete?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    connect?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    update?: EventAnimalUpdateWithWhereUniqueWithoutAnimalInput | EventAnimalUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: EventAnimalUpdateManyWithWhereWithoutAnimalInput | EventAnimalUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: EventAnimalScalarWhereInput | EventAnimalScalarWhereInput[]
  }

  export type BirthUncheckedUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<BirthCreateWithoutAnimalInput, BirthUncheckedCreateWithoutAnimalInput> | BirthCreateWithoutAnimalInput[] | BirthUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: BirthCreateOrConnectWithoutAnimalInput | BirthCreateOrConnectWithoutAnimalInput[]
    upsert?: BirthUpsertWithWhereUniqueWithoutAnimalInput | BirthUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: BirthCreateManyAnimalInputEnvelope
    set?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    disconnect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    delete?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    connect?: BirthWhereUniqueInput | BirthWhereUniqueInput[]
    update?: BirthUpdateWithWhereUniqueWithoutAnimalInput | BirthUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: BirthUpdateManyWithWhereWithoutAnimalInput | BirthUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: BirthScalarWhereInput | BirthScalarWhereInput[]
  }

  export type AnimalCreateNestedOneWithoutMotherOfInput = {
    create?: XOR<AnimalCreateWithoutMotherOfInput, AnimalUncheckedCreateWithoutMotherOfInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutMotherOfInput
    connect?: AnimalWhereUniqueInput
  }

  export type AnimalCreateNestedOneWithoutFatherOfInput = {
    create?: XOR<AnimalCreateWithoutFatherOfInput, AnimalUncheckedCreateWithoutFatherOfInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutFatherOfInput
    connect?: AnimalWhereUniqueInput
  }

  export type AnimalCreateNestedOneWithoutChildOfInput = {
    create?: XOR<AnimalCreateWithoutChildOfInput, AnimalUncheckedCreateWithoutChildOfInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutChildOfInput
    connect?: AnimalWhereUniqueInput
  }

  export type AnimalCreateNestedOneWithoutBirthInput = {
    create?: XOR<AnimalCreateWithoutBirthInput, AnimalUncheckedCreateWithoutBirthInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutBirthInput
    connect?: AnimalWhereUniqueInput
  }

  export type AnimalUpdateOneRequiredWithoutMotherOfNestedInput = {
    create?: XOR<AnimalCreateWithoutMotherOfInput, AnimalUncheckedCreateWithoutMotherOfInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutMotherOfInput
    upsert?: AnimalUpsertWithoutMotherOfInput
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutMotherOfInput, AnimalUpdateWithoutMotherOfInput>, AnimalUncheckedUpdateWithoutMotherOfInput>
  }

  export type AnimalUpdateOneRequiredWithoutFatherOfNestedInput = {
    create?: XOR<AnimalCreateWithoutFatherOfInput, AnimalUncheckedCreateWithoutFatherOfInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutFatherOfInput
    upsert?: AnimalUpsertWithoutFatherOfInput
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutFatherOfInput, AnimalUpdateWithoutFatherOfInput>, AnimalUncheckedUpdateWithoutFatherOfInput>
  }

  export type AnimalUpdateOneRequiredWithoutChildOfNestedInput = {
    create?: XOR<AnimalCreateWithoutChildOfInput, AnimalUncheckedCreateWithoutChildOfInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutChildOfInput
    upsert?: AnimalUpsertWithoutChildOfInput
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutChildOfInput, AnimalUpdateWithoutChildOfInput>, AnimalUncheckedUpdateWithoutChildOfInput>
  }

  export type AnimalUpdateOneWithoutBirthNestedInput = {
    create?: XOR<AnimalCreateWithoutBirthInput, AnimalUncheckedCreateWithoutBirthInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutBirthInput
    upsert?: AnimalUpsertWithoutBirthInput
    disconnect?: AnimalWhereInput | boolean
    delete?: AnimalWhereInput | boolean
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutBirthInput, AnimalUpdateWithoutBirthInput>, AnimalUncheckedUpdateWithoutBirthInput>
  }

  export type FarmCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<FarmCreateWithoutTransactionsInput, FarmUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutTransactionsInput
    connect?: FarmWhereUniqueInput
  }

  export type AnimalCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<AnimalCreateWithoutTransactionsInput, AnimalUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutTransactionsInput
    connect?: AnimalWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FarmUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<FarmCreateWithoutTransactionsInput, FarmUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutTransactionsInput
    upsert?: FarmUpsertWithoutTransactionsInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutTransactionsInput, FarmUpdateWithoutTransactionsInput>, FarmUncheckedUpdateWithoutTransactionsInput>
  }

  export type AnimalUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<AnimalCreateWithoutTransactionsInput, AnimalUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutTransactionsInput
    upsert?: AnimalUpsertWithoutTransactionsInput
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutTransactionsInput, AnimalUpdateWithoutTransactionsInput>, AnimalUncheckedUpdateWithoutTransactionsInput>
  }

  export type FarmCreateNestedOneWithoutEventsInput = {
    create?: XOR<FarmCreateWithoutEventsInput, FarmUncheckedCreateWithoutEventsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutEventsInput
    connect?: FarmWhereUniqueInput
  }

  export type EventAnimalCreateNestedManyWithoutEventInput = {
    create?: XOR<EventAnimalCreateWithoutEventInput, EventAnimalUncheckedCreateWithoutEventInput> | EventAnimalCreateWithoutEventInput[] | EventAnimalUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAnimalCreateOrConnectWithoutEventInput | EventAnimalCreateOrConnectWithoutEventInput[]
    createMany?: EventAnimalCreateManyEventInputEnvelope
    connect?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
  }

  export type EventAnimalUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<EventAnimalCreateWithoutEventInput, EventAnimalUncheckedCreateWithoutEventInput> | EventAnimalCreateWithoutEventInput[] | EventAnimalUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAnimalCreateOrConnectWithoutEventInput | EventAnimalCreateOrConnectWithoutEventInput[]
    createMany?: EventAnimalCreateManyEventInputEnvelope
    connect?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
  }

  export type FarmUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<FarmCreateWithoutEventsInput, FarmUncheckedCreateWithoutEventsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutEventsInput
    upsert?: FarmUpsertWithoutEventsInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutEventsInput, FarmUpdateWithoutEventsInput>, FarmUncheckedUpdateWithoutEventsInput>
  }

  export type EventAnimalUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventAnimalCreateWithoutEventInput, EventAnimalUncheckedCreateWithoutEventInput> | EventAnimalCreateWithoutEventInput[] | EventAnimalUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAnimalCreateOrConnectWithoutEventInput | EventAnimalCreateOrConnectWithoutEventInput[]
    upsert?: EventAnimalUpsertWithWhereUniqueWithoutEventInput | EventAnimalUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventAnimalCreateManyEventInputEnvelope
    set?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    disconnect?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    delete?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    connect?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    update?: EventAnimalUpdateWithWhereUniqueWithoutEventInput | EventAnimalUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventAnimalUpdateManyWithWhereWithoutEventInput | EventAnimalUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventAnimalScalarWhereInput | EventAnimalScalarWhereInput[]
  }

  export type EventAnimalUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventAnimalCreateWithoutEventInput, EventAnimalUncheckedCreateWithoutEventInput> | EventAnimalCreateWithoutEventInput[] | EventAnimalUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAnimalCreateOrConnectWithoutEventInput | EventAnimalCreateOrConnectWithoutEventInput[]
    upsert?: EventAnimalUpsertWithWhereUniqueWithoutEventInput | EventAnimalUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventAnimalCreateManyEventInputEnvelope
    set?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    disconnect?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    delete?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    connect?: EventAnimalWhereUniqueInput | EventAnimalWhereUniqueInput[]
    update?: EventAnimalUpdateWithWhereUniqueWithoutEventInput | EventAnimalUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventAnimalUpdateManyWithWhereWithoutEventInput | EventAnimalUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventAnimalScalarWhereInput | EventAnimalScalarWhereInput[]
  }

  export type EventCreateNestedOneWithoutAnimalsInput = {
    create?: XOR<EventCreateWithoutAnimalsInput, EventUncheckedCreateWithoutAnimalsInput>
    connectOrCreate?: EventCreateOrConnectWithoutAnimalsInput
    connect?: EventWhereUniqueInput
  }

  export type AnimalCreateNestedOneWithoutEventsInput = {
    create?: XOR<AnimalCreateWithoutEventsInput, AnimalUncheckedCreateWithoutEventsInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutEventsInput
    connect?: AnimalWhereUniqueInput
  }

  export type EventUpdateOneRequiredWithoutAnimalsNestedInput = {
    create?: XOR<EventCreateWithoutAnimalsInput, EventUncheckedCreateWithoutAnimalsInput>
    connectOrCreate?: EventCreateOrConnectWithoutAnimalsInput
    upsert?: EventUpsertWithoutAnimalsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutAnimalsInput, EventUpdateWithoutAnimalsInput>, EventUncheckedUpdateWithoutAnimalsInput>
  }

  export type AnimalUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<AnimalCreateWithoutEventsInput, AnimalUncheckedCreateWithoutEventsInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutEventsInput
    upsert?: AnimalUpsertWithoutEventsInput
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutEventsInput, AnimalUpdateWithoutEventsInput>, AnimalUncheckedUpdateWithoutEventsInput>
  }

  export type FarmCreateNestedOneWithoutLotesInput = {
    create?: XOR<FarmCreateWithoutLotesInput, FarmUncheckedCreateWithoutLotesInput>
    connectOrCreate?: FarmCreateOrConnectWithoutLotesInput
    connect?: FarmWhereUniqueInput
  }

  export type AnimalCreateNestedManyWithoutLoteInput = {
    create?: XOR<AnimalCreateWithoutLoteInput, AnimalUncheckedCreateWithoutLoteInput> | AnimalCreateWithoutLoteInput[] | AnimalUncheckedCreateWithoutLoteInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutLoteInput | AnimalCreateOrConnectWithoutLoteInput[]
    createMany?: AnimalCreateManyLoteInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type AnimalUncheckedCreateNestedManyWithoutLoteInput = {
    create?: XOR<AnimalCreateWithoutLoteInput, AnimalUncheckedCreateWithoutLoteInput> | AnimalCreateWithoutLoteInput[] | AnimalUncheckedCreateWithoutLoteInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutLoteInput | AnimalCreateOrConnectWithoutLoteInput[]
    createMany?: AnimalCreateManyLoteInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type FarmUpdateOneRequiredWithoutLotesNestedInput = {
    create?: XOR<FarmCreateWithoutLotesInput, FarmUncheckedCreateWithoutLotesInput>
    connectOrCreate?: FarmCreateOrConnectWithoutLotesInput
    upsert?: FarmUpsertWithoutLotesInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutLotesInput, FarmUpdateWithoutLotesInput>, FarmUncheckedUpdateWithoutLotesInput>
  }

  export type AnimalUpdateManyWithoutLoteNestedInput = {
    create?: XOR<AnimalCreateWithoutLoteInput, AnimalUncheckedCreateWithoutLoteInput> | AnimalCreateWithoutLoteInput[] | AnimalUncheckedCreateWithoutLoteInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutLoteInput | AnimalCreateOrConnectWithoutLoteInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutLoteInput | AnimalUpsertWithWhereUniqueWithoutLoteInput[]
    createMany?: AnimalCreateManyLoteInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutLoteInput | AnimalUpdateWithWhereUniqueWithoutLoteInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutLoteInput | AnimalUpdateManyWithWhereWithoutLoteInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type AnimalUncheckedUpdateManyWithoutLoteNestedInput = {
    create?: XOR<AnimalCreateWithoutLoteInput, AnimalUncheckedCreateWithoutLoteInput> | AnimalCreateWithoutLoteInput[] | AnimalUncheckedCreateWithoutLoteInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutLoteInput | AnimalCreateOrConnectWithoutLoteInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutLoteInput | AnimalUpsertWithWhereUniqueWithoutLoteInput[]
    createMany?: AnimalCreateManyLoteInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutLoteInput | AnimalUpdateWithWhereUniqueWithoutLoteInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutLoteInput | AnimalUpdateManyWithWhereWithoutLoteInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutFarmInput = {
    create?: XOR<UserCreateWithoutFarmInput, UserUncheckedCreateWithoutFarmInput> | UserCreateWithoutFarmInput[] | UserUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFarmInput | UserCreateOrConnectWithoutFarmInput[]
    createMany?: UserCreateManyFarmInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AnimalCreateNestedManyWithoutFarmInput = {
    create?: XOR<AnimalCreateWithoutFarmInput, AnimalUncheckedCreateWithoutFarmInput> | AnimalCreateWithoutFarmInput[] | AnimalUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutFarmInput | AnimalCreateOrConnectWithoutFarmInput[]
    createMany?: AnimalCreateManyFarmInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type LoteCreateNestedManyWithoutFarmInput = {
    create?: XOR<LoteCreateWithoutFarmInput, LoteUncheckedCreateWithoutFarmInput> | LoteCreateWithoutFarmInput[] | LoteUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: LoteCreateOrConnectWithoutFarmInput | LoteCreateOrConnectWithoutFarmInput[]
    createMany?: LoteCreateManyFarmInputEnvelope
    connect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutFarmInput = {
    create?: XOR<EventCreateWithoutFarmInput, EventUncheckedCreateWithoutFarmInput> | EventCreateWithoutFarmInput[] | EventUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: EventCreateOrConnectWithoutFarmInput | EventCreateOrConnectWithoutFarmInput[]
    createMany?: EventCreateManyFarmInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutFarmInput = {
    create?: XOR<TransactionCreateWithoutFarmInput, TransactionUncheckedCreateWithoutFarmInput> | TransactionCreateWithoutFarmInput[] | TransactionUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutFarmInput | TransactionCreateOrConnectWithoutFarmInput[]
    createMany?: TransactionCreateManyFarmInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<UserCreateWithoutFarmInput, UserUncheckedCreateWithoutFarmInput> | UserCreateWithoutFarmInput[] | UserUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFarmInput | UserCreateOrConnectWithoutFarmInput[]
    createMany?: UserCreateManyFarmInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AnimalUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<AnimalCreateWithoutFarmInput, AnimalUncheckedCreateWithoutFarmInput> | AnimalCreateWithoutFarmInput[] | AnimalUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutFarmInput | AnimalCreateOrConnectWithoutFarmInput[]
    createMany?: AnimalCreateManyFarmInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type LoteUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<LoteCreateWithoutFarmInput, LoteUncheckedCreateWithoutFarmInput> | LoteCreateWithoutFarmInput[] | LoteUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: LoteCreateOrConnectWithoutFarmInput | LoteCreateOrConnectWithoutFarmInput[]
    createMany?: LoteCreateManyFarmInputEnvelope
    connect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<EventCreateWithoutFarmInput, EventUncheckedCreateWithoutFarmInput> | EventCreateWithoutFarmInput[] | EventUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: EventCreateOrConnectWithoutFarmInput | EventCreateOrConnectWithoutFarmInput[]
    createMany?: EventCreateManyFarmInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<TransactionCreateWithoutFarmInput, TransactionUncheckedCreateWithoutFarmInput> | TransactionCreateWithoutFarmInput[] | TransactionUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutFarmInput | TransactionCreateOrConnectWithoutFarmInput[]
    createMany?: TransactionCreateManyFarmInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutFarmNestedInput = {
    create?: XOR<UserCreateWithoutFarmInput, UserUncheckedCreateWithoutFarmInput> | UserCreateWithoutFarmInput[] | UserUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFarmInput | UserCreateOrConnectWithoutFarmInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFarmInput | UserUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: UserCreateManyFarmInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFarmInput | UserUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFarmInput | UserUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AnimalUpdateManyWithoutFarmNestedInput = {
    create?: XOR<AnimalCreateWithoutFarmInput, AnimalUncheckedCreateWithoutFarmInput> | AnimalCreateWithoutFarmInput[] | AnimalUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutFarmInput | AnimalCreateOrConnectWithoutFarmInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutFarmInput | AnimalUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: AnimalCreateManyFarmInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutFarmInput | AnimalUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutFarmInput | AnimalUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type LoteUpdateManyWithoutFarmNestedInput = {
    create?: XOR<LoteCreateWithoutFarmInput, LoteUncheckedCreateWithoutFarmInput> | LoteCreateWithoutFarmInput[] | LoteUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: LoteCreateOrConnectWithoutFarmInput | LoteCreateOrConnectWithoutFarmInput[]
    upsert?: LoteUpsertWithWhereUniqueWithoutFarmInput | LoteUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: LoteCreateManyFarmInputEnvelope
    set?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    disconnect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    delete?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    connect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    update?: LoteUpdateWithWhereUniqueWithoutFarmInput | LoteUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: LoteUpdateManyWithWhereWithoutFarmInput | LoteUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: LoteScalarWhereInput | LoteScalarWhereInput[]
  }

  export type EventUpdateManyWithoutFarmNestedInput = {
    create?: XOR<EventCreateWithoutFarmInput, EventUncheckedCreateWithoutFarmInput> | EventCreateWithoutFarmInput[] | EventUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: EventCreateOrConnectWithoutFarmInput | EventCreateOrConnectWithoutFarmInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutFarmInput | EventUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: EventCreateManyFarmInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutFarmInput | EventUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: EventUpdateManyWithWhereWithoutFarmInput | EventUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutFarmNestedInput = {
    create?: XOR<TransactionCreateWithoutFarmInput, TransactionUncheckedCreateWithoutFarmInput> | TransactionCreateWithoutFarmInput[] | TransactionUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutFarmInput | TransactionCreateOrConnectWithoutFarmInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutFarmInput | TransactionUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: TransactionCreateManyFarmInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutFarmInput | TransactionUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutFarmInput | TransactionUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<UserCreateWithoutFarmInput, UserUncheckedCreateWithoutFarmInput> | UserCreateWithoutFarmInput[] | UserUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFarmInput | UserCreateOrConnectWithoutFarmInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFarmInput | UserUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: UserCreateManyFarmInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFarmInput | UserUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFarmInput | UserUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AnimalUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<AnimalCreateWithoutFarmInput, AnimalUncheckedCreateWithoutFarmInput> | AnimalCreateWithoutFarmInput[] | AnimalUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutFarmInput | AnimalCreateOrConnectWithoutFarmInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutFarmInput | AnimalUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: AnimalCreateManyFarmInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutFarmInput | AnimalUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutFarmInput | AnimalUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type LoteUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<LoteCreateWithoutFarmInput, LoteUncheckedCreateWithoutFarmInput> | LoteCreateWithoutFarmInput[] | LoteUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: LoteCreateOrConnectWithoutFarmInput | LoteCreateOrConnectWithoutFarmInput[]
    upsert?: LoteUpsertWithWhereUniqueWithoutFarmInput | LoteUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: LoteCreateManyFarmInputEnvelope
    set?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    disconnect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    delete?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    connect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    update?: LoteUpdateWithWhereUniqueWithoutFarmInput | LoteUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: LoteUpdateManyWithWhereWithoutFarmInput | LoteUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: LoteScalarWhereInput | LoteScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<EventCreateWithoutFarmInput, EventUncheckedCreateWithoutFarmInput> | EventCreateWithoutFarmInput[] | EventUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: EventCreateOrConnectWithoutFarmInput | EventCreateOrConnectWithoutFarmInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutFarmInput | EventUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: EventCreateManyFarmInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutFarmInput | EventUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: EventUpdateManyWithWhereWithoutFarmInput | EventUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<TransactionCreateWithoutFarmInput, TransactionUncheckedCreateWithoutFarmInput> | TransactionCreateWithoutFarmInput[] | TransactionUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutFarmInput | TransactionCreateOrConnectWithoutFarmInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutFarmInput | TransactionUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: TransactionCreateManyFarmInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutFarmInput | TransactionUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutFarmInput | TransactionUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type FarmCreateNestedOneWithoutUsersInput = {
    create?: XOR<FarmCreateWithoutUsersInput, FarmUncheckedCreateWithoutUsersInput>
    connectOrCreate?: FarmCreateOrConnectWithoutUsersInput
    connect?: FarmWhereUniqueInput
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type FarmUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<FarmCreateWithoutUsersInput, FarmUncheckedCreateWithoutUsersInput>
    connectOrCreate?: FarmCreateOrConnectWithoutUsersInput
    upsert?: FarmUpsertWithoutUsersInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutUsersInput, FarmUpdateWithoutUsersInput>, FarmUncheckedUpdateWithoutUsersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type FarmCreateWithoutAnimalsInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutFarmInput
    lotes?: LoteCreateNestedManyWithoutFarmInput
    events?: EventCreateNestedManyWithoutFarmInput
    transactions?: TransactionCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutAnimalsInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutFarmInput
    lotes?: LoteUncheckedCreateNestedManyWithoutFarmInput
    events?: EventUncheckedCreateNestedManyWithoutFarmInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutAnimalsInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutAnimalsInput, FarmUncheckedCreateWithoutAnimalsInput>
  }

  export type BirthCreateWithoutMotherInput = {
    id?: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    father: AnimalCreateNestedOneWithoutFatherOfInput
    child: AnimalCreateNestedOneWithoutChildOfInput
    Animal?: AnimalCreateNestedOneWithoutBirthInput
  }

  export type BirthUncheckedCreateWithoutMotherInput = {
    id?: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    fatherId: string
    childId: string
    animalId?: string | null
  }

  export type BirthCreateOrConnectWithoutMotherInput = {
    where: BirthWhereUniqueInput
    create: XOR<BirthCreateWithoutMotherInput, BirthUncheckedCreateWithoutMotherInput>
  }

  export type BirthCreateManyMotherInputEnvelope = {
    data: BirthCreateManyMotherInput | BirthCreateManyMotherInput[]
    skipDuplicates?: boolean
  }

  export type BirthCreateWithoutFatherInput = {
    id?: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    mother: AnimalCreateNestedOneWithoutMotherOfInput
    child: AnimalCreateNestedOneWithoutChildOfInput
    Animal?: AnimalCreateNestedOneWithoutBirthInput
  }

  export type BirthUncheckedCreateWithoutFatherInput = {
    id?: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    motherId: string
    childId: string
    animalId?: string | null
  }

  export type BirthCreateOrConnectWithoutFatherInput = {
    where: BirthWhereUniqueInput
    create: XOR<BirthCreateWithoutFatherInput, BirthUncheckedCreateWithoutFatherInput>
  }

  export type BirthCreateManyFatherInputEnvelope = {
    data: BirthCreateManyFatherInput | BirthCreateManyFatherInput[]
    skipDuplicates?: boolean
  }

  export type BirthCreateWithoutChildInput = {
    id?: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    mother: AnimalCreateNestedOneWithoutMotherOfInput
    father: AnimalCreateNestedOneWithoutFatherOfInput
    Animal?: AnimalCreateNestedOneWithoutBirthInput
  }

  export type BirthUncheckedCreateWithoutChildInput = {
    id?: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    motherId: string
    fatherId: string
    animalId?: string | null
  }

  export type BirthCreateOrConnectWithoutChildInput = {
    where: BirthWhereUniqueInput
    create: XOR<BirthCreateWithoutChildInput, BirthUncheckedCreateWithoutChildInput>
  }

  export type TransactionCreateWithoutAnimalInput = {
    id?: string
    type: string
    date: Date | string
    value: number
    person: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutAnimalInput = {
    id?: string
    type: string
    date: Date | string
    value: number
    person: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
  }

  export type TransactionCreateOrConnectWithoutAnimalInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutAnimalInput, TransactionUncheckedCreateWithoutAnimalInput>
  }

  export type TransactionCreateManyAnimalInputEnvelope = {
    data: TransactionCreateManyAnimalInput | TransactionCreateManyAnimalInput[]
    skipDuplicates?: boolean
  }

  export type EventAnimalCreateWithoutAnimalInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutAnimalsInput
  }

  export type EventAnimalUncheckedCreateWithoutAnimalInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
  }

  export type EventAnimalCreateOrConnectWithoutAnimalInput = {
    where: EventAnimalWhereUniqueInput
    create: XOR<EventAnimalCreateWithoutAnimalInput, EventAnimalUncheckedCreateWithoutAnimalInput>
  }

  export type EventAnimalCreateManyAnimalInputEnvelope = {
    data: EventAnimalCreateManyAnimalInput | EventAnimalCreateManyAnimalInput[]
    skipDuplicates?: boolean
  }

  export type BirthCreateWithoutAnimalInput = {
    id?: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    mother: AnimalCreateNestedOneWithoutMotherOfInput
    father: AnimalCreateNestedOneWithoutFatherOfInput
    child: AnimalCreateNestedOneWithoutChildOfInput
  }

  export type BirthUncheckedCreateWithoutAnimalInput = {
    id?: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    motherId: string
    fatherId: string
    childId: string
  }

  export type BirthCreateOrConnectWithoutAnimalInput = {
    where: BirthWhereUniqueInput
    create: XOR<BirthCreateWithoutAnimalInput, BirthUncheckedCreateWithoutAnimalInput>
  }

  export type BirthCreateManyAnimalInputEnvelope = {
    data: BirthCreateManyAnimalInput | BirthCreateManyAnimalInput[]
    skipDuplicates?: boolean
  }

  export type LoteCreateWithoutAnimaisInput = {
    id?: string
    nome: string
    descricao?: string | null
    finalidade: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutLotesInput
  }

  export type LoteUncheckedCreateWithoutAnimaisInput = {
    id?: string
    nome: string
    descricao?: string | null
    finalidade: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
  }

  export type LoteCreateOrConnectWithoutAnimaisInput = {
    where: LoteWhereUniqueInput
    create: XOR<LoteCreateWithoutAnimaisInput, LoteUncheckedCreateWithoutAnimaisInput>
  }

  export type FarmUpsertWithoutAnimalsInput = {
    update: XOR<FarmUpdateWithoutAnimalsInput, FarmUncheckedUpdateWithoutAnimalsInput>
    create: XOR<FarmCreateWithoutAnimalsInput, FarmUncheckedCreateWithoutAnimalsInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutAnimalsInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutAnimalsInput, FarmUncheckedUpdateWithoutAnimalsInput>
  }

  export type FarmUpdateWithoutAnimalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutFarmNestedInput
    lotes?: LoteUpdateManyWithoutFarmNestedInput
    events?: EventUpdateManyWithoutFarmNestedInput
    transactions?: TransactionUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutAnimalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutFarmNestedInput
    lotes?: LoteUncheckedUpdateManyWithoutFarmNestedInput
    events?: EventUncheckedUpdateManyWithoutFarmNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type BirthUpsertWithWhereUniqueWithoutMotherInput = {
    where: BirthWhereUniqueInput
    update: XOR<BirthUpdateWithoutMotherInput, BirthUncheckedUpdateWithoutMotherInput>
    create: XOR<BirthCreateWithoutMotherInput, BirthUncheckedCreateWithoutMotherInput>
  }

  export type BirthUpdateWithWhereUniqueWithoutMotherInput = {
    where: BirthWhereUniqueInput
    data: XOR<BirthUpdateWithoutMotherInput, BirthUncheckedUpdateWithoutMotherInput>
  }

  export type BirthUpdateManyWithWhereWithoutMotherInput = {
    where: BirthScalarWhereInput
    data: XOR<BirthUpdateManyMutationInput, BirthUncheckedUpdateManyWithoutMotherInput>
  }

  export type BirthScalarWhereInput = {
    AND?: BirthScalarWhereInput | BirthScalarWhereInput[]
    OR?: BirthScalarWhereInput[]
    NOT?: BirthScalarWhereInput | BirthScalarWhereInput[]
    id?: StringFilter<"Birth"> | string
    birthDate?: DateTimeFilter<"Birth"> | Date | string
    createdAt?: DateTimeFilter<"Birth"> | Date | string
    updatedAt?: DateTimeFilter<"Birth"> | Date | string
    motherId?: StringFilter<"Birth"> | string
    fatherId?: StringFilter<"Birth"> | string
    childId?: StringFilter<"Birth"> | string
    animalId?: StringNullableFilter<"Birth"> | string | null
  }

  export type BirthUpsertWithWhereUniqueWithoutFatherInput = {
    where: BirthWhereUniqueInput
    update: XOR<BirthUpdateWithoutFatherInput, BirthUncheckedUpdateWithoutFatherInput>
    create: XOR<BirthCreateWithoutFatherInput, BirthUncheckedCreateWithoutFatherInput>
  }

  export type BirthUpdateWithWhereUniqueWithoutFatherInput = {
    where: BirthWhereUniqueInput
    data: XOR<BirthUpdateWithoutFatherInput, BirthUncheckedUpdateWithoutFatherInput>
  }

  export type BirthUpdateManyWithWhereWithoutFatherInput = {
    where: BirthScalarWhereInput
    data: XOR<BirthUpdateManyMutationInput, BirthUncheckedUpdateManyWithoutFatherInput>
  }

  export type BirthUpsertWithoutChildInput = {
    update: XOR<BirthUpdateWithoutChildInput, BirthUncheckedUpdateWithoutChildInput>
    create: XOR<BirthCreateWithoutChildInput, BirthUncheckedCreateWithoutChildInput>
    where?: BirthWhereInput
  }

  export type BirthUpdateToOneWithWhereWithoutChildInput = {
    where?: BirthWhereInput
    data: XOR<BirthUpdateWithoutChildInput, BirthUncheckedUpdateWithoutChildInput>
  }

  export type BirthUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mother?: AnimalUpdateOneRequiredWithoutMotherOfNestedInput
    father?: AnimalUpdateOneRequiredWithoutFatherOfNestedInput
    Animal?: AnimalUpdateOneWithoutBirthNestedInput
  }

  export type BirthUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    motherId?: StringFieldUpdateOperationsInput | string
    fatherId?: StringFieldUpdateOperationsInput | string
    animalId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionUpsertWithWhereUniqueWithoutAnimalInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutAnimalInput, TransactionUncheckedUpdateWithoutAnimalInput>
    create: XOR<TransactionCreateWithoutAnimalInput, TransactionUncheckedCreateWithoutAnimalInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutAnimalInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutAnimalInput, TransactionUncheckedUpdateWithoutAnimalInput>
  }

  export type TransactionUpdateManyWithWhereWithoutAnimalInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutAnimalInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    date?: DateTimeFilter<"Transaction"> | Date | string
    value?: FloatFilter<"Transaction"> | number
    person?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    farmId?: StringFilter<"Transaction"> | string
    animalId?: StringFilter<"Transaction"> | string
  }

  export type EventAnimalUpsertWithWhereUniqueWithoutAnimalInput = {
    where: EventAnimalWhereUniqueInput
    update: XOR<EventAnimalUpdateWithoutAnimalInput, EventAnimalUncheckedUpdateWithoutAnimalInput>
    create: XOR<EventAnimalCreateWithoutAnimalInput, EventAnimalUncheckedCreateWithoutAnimalInput>
  }

  export type EventAnimalUpdateWithWhereUniqueWithoutAnimalInput = {
    where: EventAnimalWhereUniqueInput
    data: XOR<EventAnimalUpdateWithoutAnimalInput, EventAnimalUncheckedUpdateWithoutAnimalInput>
  }

  export type EventAnimalUpdateManyWithWhereWithoutAnimalInput = {
    where: EventAnimalScalarWhereInput
    data: XOR<EventAnimalUpdateManyMutationInput, EventAnimalUncheckedUpdateManyWithoutAnimalInput>
  }

  export type EventAnimalScalarWhereInput = {
    AND?: EventAnimalScalarWhereInput | EventAnimalScalarWhereInput[]
    OR?: EventAnimalScalarWhereInput[]
    NOT?: EventAnimalScalarWhereInput | EventAnimalScalarWhereInput[]
    id?: StringFilter<"EventAnimal"> | string
    createdAt?: DateTimeFilter<"EventAnimal"> | Date | string
    updatedAt?: DateTimeFilter<"EventAnimal"> | Date | string
    eventId?: StringFilter<"EventAnimal"> | string
    animalId?: StringFilter<"EventAnimal"> | string
  }

  export type BirthUpsertWithWhereUniqueWithoutAnimalInput = {
    where: BirthWhereUniqueInput
    update: XOR<BirthUpdateWithoutAnimalInput, BirthUncheckedUpdateWithoutAnimalInput>
    create: XOR<BirthCreateWithoutAnimalInput, BirthUncheckedCreateWithoutAnimalInput>
  }

  export type BirthUpdateWithWhereUniqueWithoutAnimalInput = {
    where: BirthWhereUniqueInput
    data: XOR<BirthUpdateWithoutAnimalInput, BirthUncheckedUpdateWithoutAnimalInput>
  }

  export type BirthUpdateManyWithWhereWithoutAnimalInput = {
    where: BirthScalarWhereInput
    data: XOR<BirthUpdateManyMutationInput, BirthUncheckedUpdateManyWithoutAnimalInput>
  }

  export type LoteUpsertWithoutAnimaisInput = {
    update: XOR<LoteUpdateWithoutAnimaisInput, LoteUncheckedUpdateWithoutAnimaisInput>
    create: XOR<LoteCreateWithoutAnimaisInput, LoteUncheckedCreateWithoutAnimaisInput>
    where?: LoteWhereInput
  }

  export type LoteUpdateToOneWithWhereWithoutAnimaisInput = {
    where?: LoteWhereInput
    data: XOR<LoteUpdateWithoutAnimaisInput, LoteUncheckedUpdateWithoutAnimaisInput>
  }

  export type LoteUpdateWithoutAnimaisInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    finalidade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutLotesNestedInput
  }

  export type LoteUncheckedUpdateWithoutAnimaisInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    finalidade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
  }

  export type AnimalCreateWithoutMotherOfInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutAnimalsInput
    fatherOf?: BirthCreateNestedManyWithoutFatherInput
    childOf?: BirthCreateNestedOneWithoutChildInput
    transactions?: TransactionCreateNestedManyWithoutAnimalInput
    events?: EventAnimalCreateNestedManyWithoutAnimalInput
    Birth?: BirthCreateNestedManyWithoutAnimalInput
    lote?: LoteCreateNestedOneWithoutAnimaisInput
  }

  export type AnimalUncheckedCreateWithoutMotherOfInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
    loteId?: string | null
    fatherOf?: BirthUncheckedCreateNestedManyWithoutFatherInput
    childOf?: BirthUncheckedCreateNestedOneWithoutChildInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutAnimalInput
    events?: EventAnimalUncheckedCreateNestedManyWithoutAnimalInput
    Birth?: BirthUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutMotherOfInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutMotherOfInput, AnimalUncheckedCreateWithoutMotherOfInput>
  }

  export type AnimalCreateWithoutFatherOfInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutAnimalsInput
    motherOf?: BirthCreateNestedManyWithoutMotherInput
    childOf?: BirthCreateNestedOneWithoutChildInput
    transactions?: TransactionCreateNestedManyWithoutAnimalInput
    events?: EventAnimalCreateNestedManyWithoutAnimalInput
    Birth?: BirthCreateNestedManyWithoutAnimalInput
    lote?: LoteCreateNestedOneWithoutAnimaisInput
  }

  export type AnimalUncheckedCreateWithoutFatherOfInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
    loteId?: string | null
    motherOf?: BirthUncheckedCreateNestedManyWithoutMotherInput
    childOf?: BirthUncheckedCreateNestedOneWithoutChildInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutAnimalInput
    events?: EventAnimalUncheckedCreateNestedManyWithoutAnimalInput
    Birth?: BirthUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutFatherOfInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutFatherOfInput, AnimalUncheckedCreateWithoutFatherOfInput>
  }

  export type AnimalCreateWithoutChildOfInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutAnimalsInput
    motherOf?: BirthCreateNestedManyWithoutMotherInput
    fatherOf?: BirthCreateNestedManyWithoutFatherInput
    transactions?: TransactionCreateNestedManyWithoutAnimalInput
    events?: EventAnimalCreateNestedManyWithoutAnimalInput
    Birth?: BirthCreateNestedManyWithoutAnimalInput
    lote?: LoteCreateNestedOneWithoutAnimaisInput
  }

  export type AnimalUncheckedCreateWithoutChildOfInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
    loteId?: string | null
    motherOf?: BirthUncheckedCreateNestedManyWithoutMotherInput
    fatherOf?: BirthUncheckedCreateNestedManyWithoutFatherInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutAnimalInput
    events?: EventAnimalUncheckedCreateNestedManyWithoutAnimalInput
    Birth?: BirthUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutChildOfInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutChildOfInput, AnimalUncheckedCreateWithoutChildOfInput>
  }

  export type AnimalCreateWithoutBirthInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutAnimalsInput
    motherOf?: BirthCreateNestedManyWithoutMotherInput
    fatherOf?: BirthCreateNestedManyWithoutFatherInput
    childOf?: BirthCreateNestedOneWithoutChildInput
    transactions?: TransactionCreateNestedManyWithoutAnimalInput
    events?: EventAnimalCreateNestedManyWithoutAnimalInput
    lote?: LoteCreateNestedOneWithoutAnimaisInput
  }

  export type AnimalUncheckedCreateWithoutBirthInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
    loteId?: string | null
    motherOf?: BirthUncheckedCreateNestedManyWithoutMotherInput
    fatherOf?: BirthUncheckedCreateNestedManyWithoutFatherInput
    childOf?: BirthUncheckedCreateNestedOneWithoutChildInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutAnimalInput
    events?: EventAnimalUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutBirthInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutBirthInput, AnimalUncheckedCreateWithoutBirthInput>
  }

  export type AnimalUpsertWithoutMotherOfInput = {
    update: XOR<AnimalUpdateWithoutMotherOfInput, AnimalUncheckedUpdateWithoutMotherOfInput>
    create: XOR<AnimalCreateWithoutMotherOfInput, AnimalUncheckedCreateWithoutMotherOfInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutMotherOfInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutMotherOfInput, AnimalUncheckedUpdateWithoutMotherOfInput>
  }

  export type AnimalUpdateWithoutMotherOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutAnimalsNestedInput
    fatherOf?: BirthUpdateManyWithoutFatherNestedInput
    childOf?: BirthUpdateOneWithoutChildNestedInput
    transactions?: TransactionUpdateManyWithoutAnimalNestedInput
    events?: EventAnimalUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUpdateManyWithoutAnimalNestedInput
    lote?: LoteUpdateOneWithoutAnimaisNestedInput
  }

  export type AnimalUncheckedUpdateWithoutMotherOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    loteId?: NullableStringFieldUpdateOperationsInput | string | null
    fatherOf?: BirthUncheckedUpdateManyWithoutFatherNestedInput
    childOf?: BirthUncheckedUpdateOneWithoutChildNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutAnimalNestedInput
    events?: EventAnimalUncheckedUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUpsertWithoutFatherOfInput = {
    update: XOR<AnimalUpdateWithoutFatherOfInput, AnimalUncheckedUpdateWithoutFatherOfInput>
    create: XOR<AnimalCreateWithoutFatherOfInput, AnimalUncheckedCreateWithoutFatherOfInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutFatherOfInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutFatherOfInput, AnimalUncheckedUpdateWithoutFatherOfInput>
  }

  export type AnimalUpdateWithoutFatherOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutAnimalsNestedInput
    motherOf?: BirthUpdateManyWithoutMotherNestedInput
    childOf?: BirthUpdateOneWithoutChildNestedInput
    transactions?: TransactionUpdateManyWithoutAnimalNestedInput
    events?: EventAnimalUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUpdateManyWithoutAnimalNestedInput
    lote?: LoteUpdateOneWithoutAnimaisNestedInput
  }

  export type AnimalUncheckedUpdateWithoutFatherOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    loteId?: NullableStringFieldUpdateOperationsInput | string | null
    motherOf?: BirthUncheckedUpdateManyWithoutMotherNestedInput
    childOf?: BirthUncheckedUpdateOneWithoutChildNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutAnimalNestedInput
    events?: EventAnimalUncheckedUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUpsertWithoutChildOfInput = {
    update: XOR<AnimalUpdateWithoutChildOfInput, AnimalUncheckedUpdateWithoutChildOfInput>
    create: XOR<AnimalCreateWithoutChildOfInput, AnimalUncheckedCreateWithoutChildOfInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutChildOfInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutChildOfInput, AnimalUncheckedUpdateWithoutChildOfInput>
  }

  export type AnimalUpdateWithoutChildOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutAnimalsNestedInput
    motherOf?: BirthUpdateManyWithoutMotherNestedInput
    fatherOf?: BirthUpdateManyWithoutFatherNestedInput
    transactions?: TransactionUpdateManyWithoutAnimalNestedInput
    events?: EventAnimalUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUpdateManyWithoutAnimalNestedInput
    lote?: LoteUpdateOneWithoutAnimaisNestedInput
  }

  export type AnimalUncheckedUpdateWithoutChildOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    loteId?: NullableStringFieldUpdateOperationsInput | string | null
    motherOf?: BirthUncheckedUpdateManyWithoutMotherNestedInput
    fatherOf?: BirthUncheckedUpdateManyWithoutFatherNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutAnimalNestedInput
    events?: EventAnimalUncheckedUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUpsertWithoutBirthInput = {
    update: XOR<AnimalUpdateWithoutBirthInput, AnimalUncheckedUpdateWithoutBirthInput>
    create: XOR<AnimalCreateWithoutBirthInput, AnimalUncheckedCreateWithoutBirthInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutBirthInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutBirthInput, AnimalUncheckedUpdateWithoutBirthInput>
  }

  export type AnimalUpdateWithoutBirthInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutAnimalsNestedInput
    motherOf?: BirthUpdateManyWithoutMotherNestedInput
    fatherOf?: BirthUpdateManyWithoutFatherNestedInput
    childOf?: BirthUpdateOneWithoutChildNestedInput
    transactions?: TransactionUpdateManyWithoutAnimalNestedInput
    events?: EventAnimalUpdateManyWithoutAnimalNestedInput
    lote?: LoteUpdateOneWithoutAnimaisNestedInput
  }

  export type AnimalUncheckedUpdateWithoutBirthInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    loteId?: NullableStringFieldUpdateOperationsInput | string | null
    motherOf?: BirthUncheckedUpdateManyWithoutMotherNestedInput
    fatherOf?: BirthUncheckedUpdateManyWithoutFatherNestedInput
    childOf?: BirthUncheckedUpdateOneWithoutChildNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutAnimalNestedInput
    events?: EventAnimalUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type FarmCreateWithoutTransactionsInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutFarmInput
    animals?: AnimalCreateNestedManyWithoutFarmInput
    lotes?: LoteCreateNestedManyWithoutFarmInput
    events?: EventCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutFarmInput
    animals?: AnimalUncheckedCreateNestedManyWithoutFarmInput
    lotes?: LoteUncheckedCreateNestedManyWithoutFarmInput
    events?: EventUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutTransactionsInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutTransactionsInput, FarmUncheckedCreateWithoutTransactionsInput>
  }

  export type AnimalCreateWithoutTransactionsInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutAnimalsInput
    motherOf?: BirthCreateNestedManyWithoutMotherInput
    fatherOf?: BirthCreateNestedManyWithoutFatherInput
    childOf?: BirthCreateNestedOneWithoutChildInput
    events?: EventAnimalCreateNestedManyWithoutAnimalInput
    Birth?: BirthCreateNestedManyWithoutAnimalInput
    lote?: LoteCreateNestedOneWithoutAnimaisInput
  }

  export type AnimalUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
    loteId?: string | null
    motherOf?: BirthUncheckedCreateNestedManyWithoutMotherInput
    fatherOf?: BirthUncheckedCreateNestedManyWithoutFatherInput
    childOf?: BirthUncheckedCreateNestedOneWithoutChildInput
    events?: EventAnimalUncheckedCreateNestedManyWithoutAnimalInput
    Birth?: BirthUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutTransactionsInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutTransactionsInput, AnimalUncheckedCreateWithoutTransactionsInput>
  }

  export type FarmUpsertWithoutTransactionsInput = {
    update: XOR<FarmUpdateWithoutTransactionsInput, FarmUncheckedUpdateWithoutTransactionsInput>
    create: XOR<FarmCreateWithoutTransactionsInput, FarmUncheckedCreateWithoutTransactionsInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutTransactionsInput, FarmUncheckedUpdateWithoutTransactionsInput>
  }

  export type FarmUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutFarmNestedInput
    animals?: AnimalUpdateManyWithoutFarmNestedInput
    lotes?: LoteUpdateManyWithoutFarmNestedInput
    events?: EventUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutFarmNestedInput
    animals?: AnimalUncheckedUpdateManyWithoutFarmNestedInput
    lotes?: LoteUncheckedUpdateManyWithoutFarmNestedInput
    events?: EventUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type AnimalUpsertWithoutTransactionsInput = {
    update: XOR<AnimalUpdateWithoutTransactionsInput, AnimalUncheckedUpdateWithoutTransactionsInput>
    create: XOR<AnimalCreateWithoutTransactionsInput, AnimalUncheckedCreateWithoutTransactionsInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutTransactionsInput, AnimalUncheckedUpdateWithoutTransactionsInput>
  }

  export type AnimalUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutAnimalsNestedInput
    motherOf?: BirthUpdateManyWithoutMotherNestedInput
    fatherOf?: BirthUpdateManyWithoutFatherNestedInput
    childOf?: BirthUpdateOneWithoutChildNestedInput
    events?: EventAnimalUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUpdateManyWithoutAnimalNestedInput
    lote?: LoteUpdateOneWithoutAnimaisNestedInput
  }

  export type AnimalUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    loteId?: NullableStringFieldUpdateOperationsInput | string | null
    motherOf?: BirthUncheckedUpdateManyWithoutMotherNestedInput
    fatherOf?: BirthUncheckedUpdateManyWithoutFatherNestedInput
    childOf?: BirthUncheckedUpdateOneWithoutChildNestedInput
    events?: EventAnimalUncheckedUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type FarmCreateWithoutEventsInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutFarmInput
    animals?: AnimalCreateNestedManyWithoutFarmInput
    lotes?: LoteCreateNestedManyWithoutFarmInput
    transactions?: TransactionCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutEventsInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutFarmInput
    animals?: AnimalUncheckedCreateNestedManyWithoutFarmInput
    lotes?: LoteUncheckedCreateNestedManyWithoutFarmInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutEventsInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutEventsInput, FarmUncheckedCreateWithoutEventsInput>
  }

  export type EventAnimalCreateWithoutEventInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    animal: AnimalCreateNestedOneWithoutEventsInput
  }

  export type EventAnimalUncheckedCreateWithoutEventInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    animalId: string
  }

  export type EventAnimalCreateOrConnectWithoutEventInput = {
    where: EventAnimalWhereUniqueInput
    create: XOR<EventAnimalCreateWithoutEventInput, EventAnimalUncheckedCreateWithoutEventInput>
  }

  export type EventAnimalCreateManyEventInputEnvelope = {
    data: EventAnimalCreateManyEventInput | EventAnimalCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type FarmUpsertWithoutEventsInput = {
    update: XOR<FarmUpdateWithoutEventsInput, FarmUncheckedUpdateWithoutEventsInput>
    create: XOR<FarmCreateWithoutEventsInput, FarmUncheckedCreateWithoutEventsInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutEventsInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutEventsInput, FarmUncheckedUpdateWithoutEventsInput>
  }

  export type FarmUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutFarmNestedInput
    animals?: AnimalUpdateManyWithoutFarmNestedInput
    lotes?: LoteUpdateManyWithoutFarmNestedInput
    transactions?: TransactionUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutFarmNestedInput
    animals?: AnimalUncheckedUpdateManyWithoutFarmNestedInput
    lotes?: LoteUncheckedUpdateManyWithoutFarmNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type EventAnimalUpsertWithWhereUniqueWithoutEventInput = {
    where: EventAnimalWhereUniqueInput
    update: XOR<EventAnimalUpdateWithoutEventInput, EventAnimalUncheckedUpdateWithoutEventInput>
    create: XOR<EventAnimalCreateWithoutEventInput, EventAnimalUncheckedCreateWithoutEventInput>
  }

  export type EventAnimalUpdateWithWhereUniqueWithoutEventInput = {
    where: EventAnimalWhereUniqueInput
    data: XOR<EventAnimalUpdateWithoutEventInput, EventAnimalUncheckedUpdateWithoutEventInput>
  }

  export type EventAnimalUpdateManyWithWhereWithoutEventInput = {
    where: EventAnimalScalarWhereInput
    data: XOR<EventAnimalUpdateManyMutationInput, EventAnimalUncheckedUpdateManyWithoutEventInput>
  }

  export type EventCreateWithoutAnimalsInput = {
    id?: string
    title: string
    type: string
    date: Date | string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutEventsInput
  }

  export type EventUncheckedCreateWithoutAnimalsInput = {
    id?: string
    title: string
    type: string
    date: Date | string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
  }

  export type EventCreateOrConnectWithoutAnimalsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutAnimalsInput, EventUncheckedCreateWithoutAnimalsInput>
  }

  export type AnimalCreateWithoutEventsInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutAnimalsInput
    motherOf?: BirthCreateNestedManyWithoutMotherInput
    fatherOf?: BirthCreateNestedManyWithoutFatherInput
    childOf?: BirthCreateNestedOneWithoutChildInput
    transactions?: TransactionCreateNestedManyWithoutAnimalInput
    Birth?: BirthCreateNestedManyWithoutAnimalInput
    lote?: LoteCreateNestedOneWithoutAnimaisInput
  }

  export type AnimalUncheckedCreateWithoutEventsInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
    loteId?: string | null
    motherOf?: BirthUncheckedCreateNestedManyWithoutMotherInput
    fatherOf?: BirthUncheckedCreateNestedManyWithoutFatherInput
    childOf?: BirthUncheckedCreateNestedOneWithoutChildInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutAnimalInput
    Birth?: BirthUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutEventsInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutEventsInput, AnimalUncheckedCreateWithoutEventsInput>
  }

  export type EventUpsertWithoutAnimalsInput = {
    update: XOR<EventUpdateWithoutAnimalsInput, EventUncheckedUpdateWithoutAnimalsInput>
    create: XOR<EventCreateWithoutAnimalsInput, EventUncheckedCreateWithoutAnimalsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutAnimalsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutAnimalsInput, EventUncheckedUpdateWithoutAnimalsInput>
  }

  export type EventUpdateWithoutAnimalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutEventsNestedInput
  }

  export type EventUncheckedUpdateWithoutAnimalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
  }

  export type AnimalUpsertWithoutEventsInput = {
    update: XOR<AnimalUpdateWithoutEventsInput, AnimalUncheckedUpdateWithoutEventsInput>
    create: XOR<AnimalCreateWithoutEventsInput, AnimalUncheckedCreateWithoutEventsInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutEventsInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutEventsInput, AnimalUncheckedUpdateWithoutEventsInput>
  }

  export type AnimalUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutAnimalsNestedInput
    motherOf?: BirthUpdateManyWithoutMotherNestedInput
    fatherOf?: BirthUpdateManyWithoutFatherNestedInput
    childOf?: BirthUpdateOneWithoutChildNestedInput
    transactions?: TransactionUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUpdateManyWithoutAnimalNestedInput
    lote?: LoteUpdateOneWithoutAnimaisNestedInput
  }

  export type AnimalUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    loteId?: NullableStringFieldUpdateOperationsInput | string | null
    motherOf?: BirthUncheckedUpdateManyWithoutMotherNestedInput
    fatherOf?: BirthUncheckedUpdateManyWithoutFatherNestedInput
    childOf?: BirthUncheckedUpdateOneWithoutChildNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type FarmCreateWithoutLotesInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutFarmInput
    animals?: AnimalCreateNestedManyWithoutFarmInput
    events?: EventCreateNestedManyWithoutFarmInput
    transactions?: TransactionCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutLotesInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutFarmInput
    animals?: AnimalUncheckedCreateNestedManyWithoutFarmInput
    events?: EventUncheckedCreateNestedManyWithoutFarmInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutLotesInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutLotesInput, FarmUncheckedCreateWithoutLotesInput>
  }

  export type AnimalCreateWithoutLoteInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutAnimalsInput
    motherOf?: BirthCreateNestedManyWithoutMotherInput
    fatherOf?: BirthCreateNestedManyWithoutFatherInput
    childOf?: BirthCreateNestedOneWithoutChildInput
    transactions?: TransactionCreateNestedManyWithoutAnimalInput
    events?: EventAnimalCreateNestedManyWithoutAnimalInput
    Birth?: BirthCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutLoteInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
    motherOf?: BirthUncheckedCreateNestedManyWithoutMotherInput
    fatherOf?: BirthUncheckedCreateNestedManyWithoutFatherInput
    childOf?: BirthUncheckedCreateNestedOneWithoutChildInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutAnimalInput
    events?: EventAnimalUncheckedCreateNestedManyWithoutAnimalInput
    Birth?: BirthUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutLoteInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutLoteInput, AnimalUncheckedCreateWithoutLoteInput>
  }

  export type AnimalCreateManyLoteInputEnvelope = {
    data: AnimalCreateManyLoteInput | AnimalCreateManyLoteInput[]
    skipDuplicates?: boolean
  }

  export type FarmUpsertWithoutLotesInput = {
    update: XOR<FarmUpdateWithoutLotesInput, FarmUncheckedUpdateWithoutLotesInput>
    create: XOR<FarmCreateWithoutLotesInput, FarmUncheckedCreateWithoutLotesInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutLotesInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutLotesInput, FarmUncheckedUpdateWithoutLotesInput>
  }

  export type FarmUpdateWithoutLotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutFarmNestedInput
    animals?: AnimalUpdateManyWithoutFarmNestedInput
    events?: EventUpdateManyWithoutFarmNestedInput
    transactions?: TransactionUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutLotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutFarmNestedInput
    animals?: AnimalUncheckedUpdateManyWithoutFarmNestedInput
    events?: EventUncheckedUpdateManyWithoutFarmNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type AnimalUpsertWithWhereUniqueWithoutLoteInput = {
    where: AnimalWhereUniqueInput
    update: XOR<AnimalUpdateWithoutLoteInput, AnimalUncheckedUpdateWithoutLoteInput>
    create: XOR<AnimalCreateWithoutLoteInput, AnimalUncheckedCreateWithoutLoteInput>
  }

  export type AnimalUpdateWithWhereUniqueWithoutLoteInput = {
    where: AnimalWhereUniqueInput
    data: XOR<AnimalUpdateWithoutLoteInput, AnimalUncheckedUpdateWithoutLoteInput>
  }

  export type AnimalUpdateManyWithWhereWithoutLoteInput = {
    where: AnimalScalarWhereInput
    data: XOR<AnimalUpdateManyMutationInput, AnimalUncheckedUpdateManyWithoutLoteInput>
  }

  export type AnimalScalarWhereInput = {
    AND?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
    OR?: AnimalScalarWhereInput[]
    NOT?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
    id?: StringFilter<"Animal"> | string
    name?: StringFilter<"Animal"> | string
    tag?: StringFilter<"Animal"> | string
    breed?: StringFilter<"Animal"> | string
    gender?: StringFilter<"Animal"> | string
    birthDate?: DateTimeFilter<"Animal"> | Date | string
    status?: StringFilter<"Animal"> | string
    reproductiveStatus?: StringNullableFilter<"Animal"> | string | null
    inseminationDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    expectedBirthDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    abortionDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    weight?: FloatNullableFilter<"Animal"> | number | null
    notes?: StringNullableFilter<"Animal"> | string | null
    purchaseDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    purchaseValue?: FloatNullableFilter<"Animal"> | number | null
    active?: BoolFilter<"Animal"> | boolean
    createdAt?: DateTimeFilter<"Animal"> | Date | string
    updatedAt?: DateTimeFilter<"Animal"> | Date | string
    farmId?: StringFilter<"Animal"> | string
    loteId?: StringNullableFilter<"Animal"> | string | null
  }

  export type UserCreateWithoutFarmInput = {
    id?: string
    username: string
    email: string
    password: string
    fullName: string
    role?: $Enums.UserRole
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutFarmInput = {
    id?: string
    username: string
    email: string
    password: string
    fullName: string
    role?: $Enums.UserRole
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutFarmInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFarmInput, UserUncheckedCreateWithoutFarmInput>
  }

  export type UserCreateManyFarmInputEnvelope = {
    data: UserCreateManyFarmInput | UserCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type AnimalCreateWithoutFarmInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    motherOf?: BirthCreateNestedManyWithoutMotherInput
    fatherOf?: BirthCreateNestedManyWithoutFatherInput
    childOf?: BirthCreateNestedOneWithoutChildInput
    transactions?: TransactionCreateNestedManyWithoutAnimalInput
    events?: EventAnimalCreateNestedManyWithoutAnimalInput
    Birth?: BirthCreateNestedManyWithoutAnimalInput
    lote?: LoteCreateNestedOneWithoutAnimaisInput
  }

  export type AnimalUncheckedCreateWithoutFarmInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    loteId?: string | null
    motherOf?: BirthUncheckedCreateNestedManyWithoutMotherInput
    fatherOf?: BirthUncheckedCreateNestedManyWithoutFatherInput
    childOf?: BirthUncheckedCreateNestedOneWithoutChildInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutAnimalInput
    events?: EventAnimalUncheckedCreateNestedManyWithoutAnimalInput
    Birth?: BirthUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutFarmInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutFarmInput, AnimalUncheckedCreateWithoutFarmInput>
  }

  export type AnimalCreateManyFarmInputEnvelope = {
    data: AnimalCreateManyFarmInput | AnimalCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type LoteCreateWithoutFarmInput = {
    id?: string
    nome: string
    descricao?: string | null
    finalidade: string
    createdAt?: Date | string
    updatedAt?: Date | string
    animais?: AnimalCreateNestedManyWithoutLoteInput
  }

  export type LoteUncheckedCreateWithoutFarmInput = {
    id?: string
    nome: string
    descricao?: string | null
    finalidade: string
    createdAt?: Date | string
    updatedAt?: Date | string
    animais?: AnimalUncheckedCreateNestedManyWithoutLoteInput
  }

  export type LoteCreateOrConnectWithoutFarmInput = {
    where: LoteWhereUniqueInput
    create: XOR<LoteCreateWithoutFarmInput, LoteUncheckedCreateWithoutFarmInput>
  }

  export type LoteCreateManyFarmInputEnvelope = {
    data: LoteCreateManyFarmInput | LoteCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutFarmInput = {
    id?: string
    title: string
    type: string
    date: Date | string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    animals?: EventAnimalCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutFarmInput = {
    id?: string
    title: string
    type: string
    date: Date | string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    animals?: EventAnimalUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutFarmInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutFarmInput, EventUncheckedCreateWithoutFarmInput>
  }

  export type EventCreateManyFarmInputEnvelope = {
    data: EventCreateManyFarmInput | EventCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutFarmInput = {
    id?: string
    type: string
    date: Date | string
    value: number
    person: string
    createdAt?: Date | string
    updatedAt?: Date | string
    animal: AnimalCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutFarmInput = {
    id?: string
    type: string
    date: Date | string
    value: number
    person: string
    createdAt?: Date | string
    updatedAt?: Date | string
    animalId: string
  }

  export type TransactionCreateOrConnectWithoutFarmInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutFarmInput, TransactionUncheckedCreateWithoutFarmInput>
  }

  export type TransactionCreateManyFarmInputEnvelope = {
    data: TransactionCreateManyFarmInput | TransactionCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutFarmInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutFarmInput, UserUncheckedUpdateWithoutFarmInput>
    create: XOR<UserCreateWithoutFarmInput, UserUncheckedCreateWithoutFarmInput>
  }

  export type UserUpdateWithWhereUniqueWithoutFarmInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutFarmInput, UserUncheckedUpdateWithoutFarmInput>
  }

  export type UserUpdateManyWithWhereWithoutFarmInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutFarmInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    active?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    farmId?: StringFilter<"User"> | string
  }

  export type AnimalUpsertWithWhereUniqueWithoutFarmInput = {
    where: AnimalWhereUniqueInput
    update: XOR<AnimalUpdateWithoutFarmInput, AnimalUncheckedUpdateWithoutFarmInput>
    create: XOR<AnimalCreateWithoutFarmInput, AnimalUncheckedCreateWithoutFarmInput>
  }

  export type AnimalUpdateWithWhereUniqueWithoutFarmInput = {
    where: AnimalWhereUniqueInput
    data: XOR<AnimalUpdateWithoutFarmInput, AnimalUncheckedUpdateWithoutFarmInput>
  }

  export type AnimalUpdateManyWithWhereWithoutFarmInput = {
    where: AnimalScalarWhereInput
    data: XOR<AnimalUpdateManyMutationInput, AnimalUncheckedUpdateManyWithoutFarmInput>
  }

  export type LoteUpsertWithWhereUniqueWithoutFarmInput = {
    where: LoteWhereUniqueInput
    update: XOR<LoteUpdateWithoutFarmInput, LoteUncheckedUpdateWithoutFarmInput>
    create: XOR<LoteCreateWithoutFarmInput, LoteUncheckedCreateWithoutFarmInput>
  }

  export type LoteUpdateWithWhereUniqueWithoutFarmInput = {
    where: LoteWhereUniqueInput
    data: XOR<LoteUpdateWithoutFarmInput, LoteUncheckedUpdateWithoutFarmInput>
  }

  export type LoteUpdateManyWithWhereWithoutFarmInput = {
    where: LoteScalarWhereInput
    data: XOR<LoteUpdateManyMutationInput, LoteUncheckedUpdateManyWithoutFarmInput>
  }

  export type LoteScalarWhereInput = {
    AND?: LoteScalarWhereInput | LoteScalarWhereInput[]
    OR?: LoteScalarWhereInput[]
    NOT?: LoteScalarWhereInput | LoteScalarWhereInput[]
    id?: StringFilter<"Lote"> | string
    nome?: StringFilter<"Lote"> | string
    descricao?: StringNullableFilter<"Lote"> | string | null
    finalidade?: StringFilter<"Lote"> | string
    createdAt?: DateTimeFilter<"Lote"> | Date | string
    updatedAt?: DateTimeFilter<"Lote"> | Date | string
    farmId?: StringFilter<"Lote"> | string
  }

  export type EventUpsertWithWhereUniqueWithoutFarmInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutFarmInput, EventUncheckedUpdateWithoutFarmInput>
    create: XOR<EventCreateWithoutFarmInput, EventUncheckedCreateWithoutFarmInput>
  }

  export type EventUpdateWithWhereUniqueWithoutFarmInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutFarmInput, EventUncheckedUpdateWithoutFarmInput>
  }

  export type EventUpdateManyWithWhereWithoutFarmInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutFarmInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    id?: StringFilter<"Event"> | string
    title?: StringFilter<"Event"> | string
    type?: StringFilter<"Event"> | string
    date?: DateTimeFilter<"Event"> | Date | string
    description?: StringFilter<"Event"> | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    farmId?: StringFilter<"Event"> | string
  }

  export type TransactionUpsertWithWhereUniqueWithoutFarmInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutFarmInput, TransactionUncheckedUpdateWithoutFarmInput>
    create: XOR<TransactionCreateWithoutFarmInput, TransactionUncheckedCreateWithoutFarmInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutFarmInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutFarmInput, TransactionUncheckedUpdateWithoutFarmInput>
  }

  export type TransactionUpdateManyWithWhereWithoutFarmInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutFarmInput>
  }

  export type FarmCreateWithoutUsersInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    animals?: AnimalCreateNestedManyWithoutFarmInput
    lotes?: LoteCreateNestedManyWithoutFarmInput
    events?: EventCreateNestedManyWithoutFarmInput
    transactions?: TransactionCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    animals?: AnimalUncheckedCreateNestedManyWithoutFarmInput
    lotes?: LoteUncheckedCreateNestedManyWithoutFarmInput
    events?: EventUncheckedCreateNestedManyWithoutFarmInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutUsersInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutUsersInput, FarmUncheckedCreateWithoutUsersInput>
  }

  export type FarmUpsertWithoutUsersInput = {
    update: XOR<FarmUpdateWithoutUsersInput, FarmUncheckedUpdateWithoutUsersInput>
    create: XOR<FarmCreateWithoutUsersInput, FarmUncheckedCreateWithoutUsersInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutUsersInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutUsersInput, FarmUncheckedUpdateWithoutUsersInput>
  }

  export type FarmUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animals?: AnimalUpdateManyWithoutFarmNestedInput
    lotes?: LoteUpdateManyWithoutFarmNestedInput
    events?: EventUpdateManyWithoutFarmNestedInput
    transactions?: TransactionUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animals?: AnimalUncheckedUpdateManyWithoutFarmNestedInput
    lotes?: LoteUncheckedUpdateManyWithoutFarmNestedInput
    events?: EventUncheckedUpdateManyWithoutFarmNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type BirthCreateManyMotherInput = {
    id?: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    fatherId: string
    childId: string
    animalId?: string | null
  }

  export type BirthCreateManyFatherInput = {
    id?: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    motherId: string
    childId: string
    animalId?: string | null
  }

  export type TransactionCreateManyAnimalInput = {
    id?: string
    type: string
    date: Date | string
    value: number
    person: string
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
  }

  export type EventAnimalCreateManyAnimalInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
  }

  export type BirthCreateManyAnimalInput = {
    id?: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    motherId: string
    fatherId: string
    childId: string
  }

  export type BirthUpdateWithoutMotherInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    father?: AnimalUpdateOneRequiredWithoutFatherOfNestedInput
    child?: AnimalUpdateOneRequiredWithoutChildOfNestedInput
    Animal?: AnimalUpdateOneWithoutBirthNestedInput
  }

  export type BirthUncheckedUpdateWithoutMotherInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fatherId?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    animalId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BirthUncheckedUpdateManyWithoutMotherInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fatherId?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    animalId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BirthUpdateWithoutFatherInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mother?: AnimalUpdateOneRequiredWithoutMotherOfNestedInput
    child?: AnimalUpdateOneRequiredWithoutChildOfNestedInput
    Animal?: AnimalUpdateOneWithoutBirthNestedInput
  }

  export type BirthUncheckedUpdateWithoutFatherInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    motherId?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    animalId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BirthUncheckedUpdateManyWithoutFatherInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    motherId?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    animalId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionUpdateWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    person?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    person?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionUncheckedUpdateManyWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    person?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
  }

  export type EventAnimalUpdateWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutAnimalsNestedInput
  }

  export type EventAnimalUncheckedUpdateWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type EventAnimalUncheckedUpdateManyWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type BirthUpdateWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mother?: AnimalUpdateOneRequiredWithoutMotherOfNestedInput
    father?: AnimalUpdateOneRequiredWithoutFatherOfNestedInput
    child?: AnimalUpdateOneRequiredWithoutChildOfNestedInput
  }

  export type BirthUncheckedUpdateWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    motherId?: StringFieldUpdateOperationsInput | string
    fatherId?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type BirthUncheckedUpdateManyWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    motherId?: StringFieldUpdateOperationsInput | string
    fatherId?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type EventAnimalCreateManyEventInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    animalId: string
  }

  export type EventAnimalUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animal?: AnimalUpdateOneRequiredWithoutEventsNestedInput
  }

  export type EventAnimalUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animalId?: StringFieldUpdateOperationsInput | string
  }

  export type EventAnimalUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animalId?: StringFieldUpdateOperationsInput | string
  }

  export type AnimalCreateManyLoteInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farmId: string
  }

  export type AnimalUpdateWithoutLoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutAnimalsNestedInput
    motherOf?: BirthUpdateManyWithoutMotherNestedInput
    fatherOf?: BirthUpdateManyWithoutFatherNestedInput
    childOf?: BirthUpdateOneWithoutChildNestedInput
    transactions?: TransactionUpdateManyWithoutAnimalNestedInput
    events?: EventAnimalUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutLoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    motherOf?: BirthUncheckedUpdateManyWithoutMotherNestedInput
    fatherOf?: BirthUncheckedUpdateManyWithoutFatherNestedInput
    childOf?: BirthUncheckedUpdateOneWithoutChildNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutAnimalNestedInput
    events?: EventAnimalUncheckedUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateManyWithoutLoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateManyFarmInput = {
    id?: string
    username: string
    email: string
    password: string
    fullName: string
    role?: $Enums.UserRole
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnimalCreateManyFarmInput = {
    id?: string
    name: string
    tag: string
    breed: string
    gender: string
    birthDate: Date | string
    status: string
    reproductiveStatus?: string | null
    inseminationDate?: Date | string | null
    expectedBirthDate?: Date | string | null
    abortionDate?: Date | string | null
    weight?: number | null
    notes?: string | null
    purchaseDate?: Date | string | null
    purchaseValue?: number | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    loteId?: string | null
  }

  export type LoteCreateManyFarmInput = {
    id?: string
    nome: string
    descricao?: string | null
    finalidade: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventCreateManyFarmInput = {
    id?: string
    title: string
    type: string
    date: Date | string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateManyFarmInput = {
    id?: string
    type: string
    date: Date | string
    value: number
    person: string
    createdAt?: Date | string
    updatedAt?: Date | string
    animalId: string
  }

  export type UserUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimalUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    motherOf?: BirthUpdateManyWithoutMotherNestedInput
    fatherOf?: BirthUpdateManyWithoutFatherNestedInput
    childOf?: BirthUpdateOneWithoutChildNestedInput
    transactions?: TransactionUpdateManyWithoutAnimalNestedInput
    events?: EventAnimalUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUpdateManyWithoutAnimalNestedInput
    lote?: LoteUpdateOneWithoutAnimaisNestedInput
  }

  export type AnimalUncheckedUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loteId?: NullableStringFieldUpdateOperationsInput | string | null
    motherOf?: BirthUncheckedUpdateManyWithoutMotherNestedInput
    fatherOf?: BirthUncheckedUpdateManyWithoutFatherNestedInput
    childOf?: BirthUncheckedUpdateOneWithoutChildNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutAnimalNestedInput
    events?: EventAnimalUncheckedUpdateManyWithoutAnimalNestedInput
    Birth?: BirthUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateManyWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    inseminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expectedBirthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchaseValue?: NullableFloatFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loteId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LoteUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    finalidade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animais?: AnimalUpdateManyWithoutLoteNestedInput
  }

  export type LoteUncheckedUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    finalidade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animais?: AnimalUncheckedUpdateManyWithoutLoteNestedInput
  }

  export type LoteUncheckedUpdateManyWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    finalidade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animals?: EventAnimalUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animals?: EventAnimalUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    person?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animal?: AnimalUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    person?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animalId?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionUncheckedUpdateManyWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    person?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animalId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}