export function formatTimeValue(value: number): string {
  const minutes = Math.floor(value / 60).toString();
  const seconds = value % 60 < 10 ? `0${value % 60}` : `${value % 60}`;

  return `${minutes} : ${seconds}`;
}
