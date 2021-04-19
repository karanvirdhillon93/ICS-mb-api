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

 

export default {getAllLabs};