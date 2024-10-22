const DEFAULT_PREFIX = 'slice://' as const

export const createSliceKey = <TSliceName extends string = string, TPrefix extends string = typeof DEFAULT_PREFIX>(
  sliceName: TSliceName,
  prefix?: TPrefix,
): `${TPrefix | typeof DEFAULT_PREFIX}/${TSliceName}` => `${prefix || DEFAULT_PREFIX}/${sliceName}`
