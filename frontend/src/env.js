export const env = {
  BACKEND_URL:
    process.env.NODE_ENV === 'production'
      ? 'https://glacial-escarpment-21282.herokuapp.com'
      : 'http://localhost:5000',
};
