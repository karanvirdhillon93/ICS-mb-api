import messages from '/home/student/ics221-mb-api/msg-api-controller.js'
// GET Request Handler
const getAllMessages = (req, res) => {
   // res.status(200).send('Successful API GET Request');
   try {
    res.status(200).json(messages);
   } catch (err) {
    res.status(400).send('Bad Request');
   }
   
 //  res.status(200).json(messages);
   };
   // POST Request Handler
   const addNewMessage = async (req, res) => {
    res.status(200).send('Successful API POST Request');
   };
   export default { getAllMessages, addNewMessage };
   