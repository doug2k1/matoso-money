const authMiddleware = () => {
  return (req, res, next) => {
    if (process.env.NODE_ENV !== 'production' || req.isAuthenticated()) {
      return next();
    }

    res.status(401).send();
  };
};

module.exports = authMiddleware;
