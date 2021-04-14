//import messages from '/home/student/ics221-mb-api/msg-api-controller.js'
//import messageSchema from '/home/student/ics221-mb-api/models/message-schema.js'
// GET Request Handler
import mongoose from 'mongoose';
const messageModel = mongoose.model('message');

const getAllMessages = async (req, res) => {
  // Successful API GET Request
    try {
        let messages = await messageModel.find( {}, '', { sort: { _id: -1 } }).exec()
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).send('Bad Request');
    }
// res.status(200).json(messages);
   };
// POST Request Handler
   const addNewMessage = async (req, res) => {
//Successful API POST Request
    try {
       // let message = await messageSchema.validate(req.body);
        // TODO: add message as first element of array and
        // respond with 201 Created and the message in the body
        // of the response.
        // message.id = messages.length;
        // messages.unshift(message);
        // console.log(messages);
        let message = await messageModel.create(req.body);
        res.status(201).json(message);
/* message.id = messages.length;
messages.unshift(message);
console.log(messages);
setMessages( [message, ...messages] );
console.log(messages);
console.log(messageSchema);
*/
       } catch (err) {
        res
        .status(400)
        .send('Bad Request. The message in the body of the \
        Request is either missing or malformed.');
       }
   };

   const updateMessage = async (req, res) => {
    try {
        let message = await messageModel.findById(req.params.messageId).exec();
        if (!message) {
        // there wasn't an error, but the message wasn't found
        // (message is null)
        // i.e. the id given doesn't match any in the database
        res.sendStatus(404);
        } else {
        // message found - is the user authorized?
        if ( message.name === req.user.username ) {
        // auth user is owner of message, proceed w/ update
        message.msgText = req.body.msgText;
        try {
        await message.save();
        // send back 204 No Content
        res.sendStatus(204);
        } catch (err) {
        res.status(400).send('Failed to update. Invalid message text.');
        }
        } else {
        // auth user is not owner, unauthorized
        res.sendStatus(401);
        }
        }
       } catch (err) {
        res.sendStatus(400);
       }
   }

   const deleteMessage = async (req, res) => {
    try {
        let message = await messageModel.findById(req.params.messageId).exec();
        if (!message) {
        // there wasn't an error, but the message wasn't found
        // (message is null)
        // i.e. the id given doesn't match any in the database
        res.sendStatus(404);
        } else {
        // message found - is the user authorized?
        if ( message.name === req.user.username ) {
        // auth user is owner of message, proceed w/ update
        message.msgText = req.body.msgText;
        try {
        await message.remove();
        // send back 204 No Content
        res.sendStatus(204);
        } catch (err) {
        res.status(400).send('Failed to update. Invalid message text.');
        }
        } else {
        // auth user is not owner, unauthorized
        res.sendStatus(401);
        }
        }
       } catch (err) {
        res.sendStatus(400);
       }
       
   }

   export default { getAllMessages, addNewMessage, updateMessage, deleteMessage };
   