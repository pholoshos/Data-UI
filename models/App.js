const mongoose = require('mongoose');

const AppSchema = mongoose.Schema({
  appName: {
    type: String,
    required: true
  },
  appId: {
    type: String,
    required: true,
    unique: true
  },
  registrationsOpen: {
    type: Boolean,
    default: false
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  }
});

module.exports = mongoose.model('App', AppSchema);
