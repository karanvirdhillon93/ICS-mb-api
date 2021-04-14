import express from 'express';
import msgAPIController from '../controllers/msg-api-controller.js';
import userAPIController from '../controllers/user-api-controller.js';
import passport from 'passport';

const router = express.Router();
router.route('/messages')
.get(msgAPIController.getAllMessages)
//.post(msgAPIController.addNewMessage);
.post(passport.authenticate('jwt', { session: false }),
 msgAPIController.addNewMessage);
router.route('/users')
.post(userAPIController.registerNewUser)
router.route('/login')
.post(passport.authenticate('local', {session: false}),
 userAPIController.logInUser);
router.route('/messages/:messageId')
.patch(passport.authenticate('jwt', {session: false}),
msgAPIController.updateMessage);
export default router;

