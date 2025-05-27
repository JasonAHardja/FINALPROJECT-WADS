import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const TicketSchema = new mongoose.Schema({
  ticket_number: {
    type: Number,
    unique: true,
    index: true
  },
  ticket_category: {
    type: String,
    required: true
  },
  ticket_description: {
    type: String,
    maxlength: 500,
    required: true
  },
  ticket_response: {
    type: String,
    maxlength: 500,
  },
  ticket_resolved: {
    type: Boolean,
    default: false
  }
});

TicketSchema.plugin(AutoIncrement, { inc_field: 'ticket_number' });
export default mongoose.model('Ticket', TicketSchema);