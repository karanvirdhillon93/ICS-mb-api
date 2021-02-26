import messages from './msg-api-controller.js'
// GET Request Handler
const getAllMessages = (req, res) => {
   // res.status(200).send('Successful API GET Request');
   res.status(200).json(messages);
   };
   // POST Request Handler
   const addNewMessage = async (req, res) => {
    res.status(200).send('Successful API POST Request');
   };
   export default { getAllMessages, addNewMessage };
   