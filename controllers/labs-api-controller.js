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
           // let lab = await lab.validate(req.body);
            // TODO: add lab as first element of array and
            // respond with 201 Created and the lab in the body
            // of the response.
            // lab.id = lab.length;
            //lab.unshift(lab);
            // console.log(lab);
            let lab = await labsModel.create(req.body);
            res.status(201).json(lab);

           } catch (err) {
            res
            .status(400)
            .send('Bad Request. The lab in the body of the \
            Request is either missing or malformed.');
           }
       };


       const deleteMessage = async (req, res) => {
       
        try {
            //console.log(req.params);
           // console.log(req.params);
           let lab = await labModel.findById(req.params.labId).exec();
            console.log(lab);
            if (!lab) {
            // there wasn't an error, but the message wasn't found
            // (lab is null)
            // i.e. the id given doesn't match any in the database
            res.sendStatus(404);
            } else {
            // lab found - is the user authorized?
            if ( lab.name === req.user.username ) {
            // auth user is owner of lab, proceed w/ update
            lab.topic = req.body.topic;
            try {
            await lab.remove();
            // send back 204 No Content
            res.sendStatus(204);
            } catch (err) {
            res.status(400).send('Failed to update. Invalid lab text.');
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
 

export default {getAllLabs, addNewLab, deleteMessage };