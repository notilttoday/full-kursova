const DEFAULT_PREFIX = 'saga://' as const

export const createSagaActionType = <TSagaName extends string = string, TPrefix extends string = typeof DEFAULT_PREFIX>(
  sagaName: TSagaName,
  prefix?: TPrefix,
): `${TPrefix | typeof DEFAULT_PREFIX}/${TSagaName}` => `${prefix || DEFAULT_PREFIX}/${sagaName}`
