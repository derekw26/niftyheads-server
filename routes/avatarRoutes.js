const avatarController = require('../controllers/avatarController');
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app
    .route('/avatars')
    .get(avatarController.showAvatars)
    .post(avatarController.createAvatar)

  app
    .route('/avatars/:uuid')
    .get(avatarController.readAvatar)
    .put(avatarController.updateAvatar)
    // .delete(avatarController.deleteAvatar)
};
