import messages from '/home/student/ics221-mb-api/msg-api-controller.js'
import messageSchema from '/home/student/ics221-mb-api/models/message-schema.js'
// GET Request Handler
const getAllMessages = (req, res) => {
   res.status(200).send('Successful API GET Request');
    try {
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).send('Bad Request');
    }

   res.status(200).json(messages);
   };
   // POST Request Handler
   const addNewMessage = async (req, res) => {
    //res.status(200).send('Successful API POST Request');
    try {
        let message = await messageSchema.validate(req.body);
        // TODO: add message as first element of array and
        // respond with 201 Created and the message in the body
        // of the response.
        message.id = messages.length;
        messages.unshift(message);
        console.log(messages);
        res.status(201).send('Created');
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
   export default { getAllMessages, addNewMessage };
   