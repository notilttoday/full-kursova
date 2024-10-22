const DEFAULT_PREFIX = 'side-effect://' as const

export const createSideEffectActionType = <
  TSideEffectName extends string = string,
  TPrefix extends string = typeof DEFAULT_PREFIX,
>(
  sideEffectName: TSideEffectName,
  prefix?: TPrefix,
): `${TPrefix | typeof DEFAULT_PREFIX}/${TSideEffectName}` => `${prefix || DEFAULT_PREFIX}/${sideEffectName}`
