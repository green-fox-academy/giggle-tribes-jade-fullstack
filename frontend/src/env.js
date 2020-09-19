export const env = {
  BACKEND_URL:
    process.env.NODE_ENV === 'production'
      ? 'https://giggle-tribes.herokuapp.com'
      : 'http://localhost:5000',
};
