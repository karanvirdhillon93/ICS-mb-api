import express from 'express';
import msgAPIController from '../controllers/msg-api-controller.js';
import userAPIController from '../controllers/user-api-controller.js';
import passport from 'passport';
const router = express.Router();
router.route('/messages')
.get(msgAPIController.getAllMessages)
//.post(msgAPIController.addNewMessage);
.post(passport.authenticate('basic', { session: false }),
 msgAPIController.addNewMessage);
router.route('/users')
.post(userAPIController.registerNewUser)
router.route('/login')
.post(userAPIController.logInUser);
export default router;

