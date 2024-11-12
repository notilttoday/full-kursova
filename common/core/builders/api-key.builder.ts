const DEFAULT_PREFIX = 'api://' as const

export const createApiKey = <
  TApiName extends string = string,
  TVersion extends string = string,
  TPrefix extends string = typeof DEFAULT_PREFIX,
>(
  apiName: TApiName,
  version: TVersion,
  prefix?: TPrefix,
): `[v${TVersion}] ${TPrefix | typeof DEFAULT_PREFIX}/${TApiName}` =>
  `[v${version}] ${prefix || DEFAULT_PREFIX}/${apiName}`

export const isApiKey = (key: string): boolean => Boolean(key?.split?.(' ')?.[1]?.startsWith(DEFAULT_PREFIX))
