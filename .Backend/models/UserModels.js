import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        maxlength: 30,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        maxlength: 50,
        unique: true
    }
});

export default mongoose.model('User', UserSchema);