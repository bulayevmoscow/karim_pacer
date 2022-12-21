export const timeout = (timeMs: number) =>
  new Promise((res) => {
    setTimeout(res, timeMs);
  });
