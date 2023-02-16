import BigNumber from "bignumber.js";

BigNumber.set({
  EXPONENTIAL_AT: [-50, 50],
  DECIMAL_PLACES: 30,
  ROUNDING_MODE: 4, // ROUND_HALF_UP https://mikemcl.github.io/bignumber.js/#constructor-properties
});

export const isEq = (a: string | number, b: string | number) =>
  new BigNumber(a).eq(b);

export const isLt = (a: string | number, b: string | number) =>
  new BigNumber(a).lt(b);

export const isLte = (a: string | number, b: string | number) =>
  new BigNumber(a).lte(b);

export const isGt = (a: string | number, b: string | number) =>
  new BigNumber(a).gt(b);

export const isGte = (a: string | number, b: string | number) =>
  new BigNumber(a).gte(b);

export const getMax = (a: string | number, b: string | number) =>
  BigNumber.max(a, b).toString();
// /
export const getDiv = (a: string | number, b: string | number) =>
  new BigNumber(a).div(b).toString();
// *
export const getTimes = (a: string | number, b: string | number) =>
  new BigNumber(a).times(b).toString();
// +
export const getPlus = (a: string | number, b: string | number) =>
  new BigNumber(a).plus(b).toString();
// -
export const getMinus = (a: string | number, b: string | number) =>
  new BigNumber(a).minus(b).toString();
// 指数
export const getPow = (a: string | number, b: string | number) =>
  new BigNumber(a).pow(b).toString();

export const isInteger = (num: string | number) =>
  new BigNumber(num).isInteger();

export const shiftedBy = (num: string | number, decimal: number) =>
  new BigNumber(num).shiftedBy(decimal).toString();

export const getDivWithDecimal = (
  a: string | number,
  b: string | number,
  decimal: number,
  round = BigNumber.ROUND_DOWN
) => new BigNumber(a).div(b).toFixed(decimal, round);

export const getFixed = (
  val: string | number,
  fixed = 2,
  trailingZeros = false,
  round: BigNumber.RoundingMode = BigNumber.ROUND_HALF_UP
) => {
  const numStr = val || "0";
  if (trailingZeros) {
    return new BigNumber(numStr).toFixed(fixed, round);
  }
  return new BigNumber(numStr).decimalPlaces(fixed).toString();
};

export const parseFloat = (a: string) => {
  return a.substring(0, a.length - 1);
};

export const getMin = (a: string | number, b: string | number) =>
  BigNumber.min(a, b).toString();

export const getInteger = (value: string | number, isCeil = false): string => {
  return new BigNumber(value)
    .integerValue(isCeil ? BigNumber.ROUND_UP : BigNumber.ROUND_DOWN)
    .toString();
};

export const getNegated = (value: string | number) =>
  new BigNumber(value).negated().toNumber();

export const getOutcome = (
  input: string | number,
  accuracy = 9,
  base = 10,
  fixed = 2
) => {
  const div = getPow(base, accuracy);
  const x = new BigNumber(input);
  const y = new BigNumber(div);
  return x.div(y).toFixed(fixed, BigNumber.ROUND_DOWN).toString();
};

export const roundPercent = (input: string, fixed = 2) => {
  const i = input.slice(0, input.length - 1);
  return `${new BigNumber(i).decimalPlaces(fixed).toString()}%`;
};
