type RequiredParam<Param extends string, Accumulator extends string[]> = Param extends `:${infer Key}`
  ? [Key, ...Accumulator]
  : Accumulator

type PartialParam<Param extends string, Accumulator extends string[]> = Param extends `:${infer Key}?`
  ? [Key, ...Accumulator]
  : Accumulator

type RequiredParams<Path extends string, Accumulator extends string[]> = Path extends `${infer Left}/${infer Right}`
  ? RequiredParams<Right, RequiredParam<Left, Accumulator>>
  : RequiredParam<Path, Accumulator>

type PartialParams<Path extends string, Accumulator extends string[]> = Path extends `${infer Left}/${infer Right}`
  ? PartialParams<Right, PartialParam<Left, Accumulator>>
  : PartialParam<Path, Accumulator>

export type ParamsMap<Url extends string> = {
  readonly [Key in Exclude<RequiredParams<Url, []>[number], `${PartialParams<Url, []>[number]}?`>]: string | number
} & {
  readonly [Key in PartialParams<Url, []>[number]]?: string | number
}
