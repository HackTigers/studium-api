
export default {
  JWT_SECRET: process.env.JWT_SECRET,

  DB_CREDS: {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },

  INFO_WEBHOOK: process.env.INFO_WEBHOOK,
  ERROR_WEBHOOK: process.env.ERROR_WEBHOOK,

  PORT: process.env.PORT || 3000
}