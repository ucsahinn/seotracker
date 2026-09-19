export const baseAuthOptions = {
  session: {
    // Serve getSession from a signed cookie instead of a DB round trip.
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
};
