import mongoose from 'mongoose';
const labsModel = mongoose.model('labs');

const getAllLabs = async (req, res) => {
    try {
        let labs = await labsModel.find( {}, '', { sort: { _id: -1 } }).exec()
        res.status(200).json(labs);
        console.log(labs)
    } catch (err) {
        res.status(400).send('Bad Request');
    }
   }

   const addNewLab = async (req, res) => {
    //Successful API POST Request
        try {
           // let message = await messageSchema.validate(req.body);
            // TODO: add message as first element of array and
            // respond with 201 Created and the message in the body
            // of the response.
            // message.id = messages.length;
            // messages.unshift(message);
            // console.log(messages);
            let lab = await labsModel.create(req.body);
            res.status(201).json(lab);
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


 

export default {getAllLabs, addNewLab };