import express from 'express';
import msgAPIController from '../controllers/msg-api-controller.js';
import userAPIController from '../controllers/user-api-controller.js';
import labsAPIController from '../controllers/labs-api-controller.js';
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
router.route('/messages/:messageId')
.delete(passport.authenticate('jwt', {session: false}),
msgAPIController.deleteMessage);
router.route('/labs')
.get(labsAPIController.getAllLabs)
router.route('/labs')
.post(passport.authenticate('jwt', { session: false }),
labsAPIController.addNewLab);
router.route('/labs/:labsId')
.delete(passport.authenticate('jwt', {session: false}),
labsAPIController.deleteMessage);
export default router;

