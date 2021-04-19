import mongoose from 'mongoose';

const labsSchema = new mongoose.Schema({
    labNo: {
        type: Number,
        required: true,
        },
    topic: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 80,
        match: /[A-Za-z]/
    }
});

labsSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { delete ret._id; }
   });   

export default mongoose.model('labs', labsSchema);