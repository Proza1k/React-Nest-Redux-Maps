export const getEnvKey = (name: string) => {
  const env = process.env[name];

  if (env) {
    return env;
  } else {
    const error = new Error(`${name} is not .env`);

    console.error(error);
    throw error;
  }
};
