module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1cc26fa86e74bff4217804b9be8cac90'),
  },
});
