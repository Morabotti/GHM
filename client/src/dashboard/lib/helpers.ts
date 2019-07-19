/* eslint-disable @typescript-eslint/no-explicit-any */
export const deepEqual = (x: any, y: any): boolean => {
  const ok = Object.keys
  const tx = typeof x
  const ty = typeof y
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length
      && ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y)
}

export const formats = [{
  key: 'bo1',
  text: 'Best of 1',
  value: '1'
}, {
  key: 'bo2',
  text: 'Best of 2',
  value: '2'
}, {
  key: 'bo3',
  text: 'Best of 3',
  value: '3'
}, {
  key: 'bo5',
  text: 'Best of 5',
  value: '5'
}]
