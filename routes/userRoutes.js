const userController = require('../controllers/userController');
const { authJwt } = require("../middleware");

module.exports = (app) => {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", userController.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    userController.userBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  )

  app
    .route('/users')
    .get(userController.showUsers)
    .post(userController.createUser)

  app
    .route('/users/:uuid')
    .get(userController.readUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

};
