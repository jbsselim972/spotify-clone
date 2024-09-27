export function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 10000).toFixed(0);

  return Number(seconds) === 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
}
