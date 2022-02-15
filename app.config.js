export default ({ config }) => {
  return {
    ...config,
    extra: {
      FUNC: process.env.FUNC === 'true',
    },
  };
};
