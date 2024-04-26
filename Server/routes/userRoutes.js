const {getAllUser, getSingleUser, getCurrUser, updateUser, uploadImage} = require(`../controllers/userController`);
const express = require(`express`);
const {authenticateUser, authorisePermission} = require(`../middleware/authentication`);
const router = express.Router();

router.route(`/`).get([authenticateUser, authorisePermission(`admin`)], getAllUser);
router.route(`/profile`).get(authenticateUser, getCurrUser);
router.route(`/updateUser`).patch(authenticateUser, updateUser);
router.route(`/upload`).post(authenticateUser, uploadImage);
router.route(`/:id`).get(authenticateUser, getSingleUser);

module.exports = router;