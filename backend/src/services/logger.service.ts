const IS_DEVELOPMENT = process.env.IS_DEVELOPMENT || true;

export const logger = (...data: unknown[]) => {
  if (IS_DEVELOPMENT) {
    console.log(...data);
  }
};
