import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    title:          {type:String, required:true},
    category:       {type:String, enum:["service","food","cleanliness","other"], required:true},
    description:    {type:String, required:true},
    createdAt:      {type:Date, default:Date.now},
    user:           {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    response:       {type:String},
    completed:      {type:Boolean, required:true, default:false}
});

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;

