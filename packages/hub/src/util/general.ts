export function id() {
  return [
    Math.random().toString(32).substring(2, 9),
    Math.random().toString(32).substring(2, 9)
  ].join('')
}