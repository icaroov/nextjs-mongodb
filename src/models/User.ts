import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name.'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters.']
  }
})

export default mongoose.models.User || mongoose.model('User', UserSchema);