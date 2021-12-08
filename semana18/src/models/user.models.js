import mongoose from 'mongoose'
const photo = new mongoose.Schema({
  value: {
    type: String,
    required: true
  }
})
const Schema = new mongoose.Schema({
  displayName: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  firstName: {
    type: String,
    required:true
  },
  lastName: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  age: {
    type: Number,
    required: true
  }, 
  phoneNumber: {
    type: String,
  },
  photos: {
    type: [photo],
    default: [{value: 'https://cdn0.iconfinder.com/data/icons/leto-ui-generic-1/64/leto-04-128.png'}]
  }
  },
  { timestamps: true }
)

export default mongoose.model('User',Schema)