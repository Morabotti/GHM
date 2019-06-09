// @flow
export const roundWinningTimeout = (phase: number) => {
  const ROUND_END_TIME = phase * 1000 > 10000
    ? 10000
    : phase * 1000 < 3000
      ? 3000
      : phase * 1000

  return ROUND_END_TIME
}
