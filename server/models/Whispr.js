const { Schema, model, mongoose } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Sub-document schema for reaction

const commentSchema = new Schema({
  commentId: {
    type: mongoose.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  commentText: {
    type: String,
    required: true,
    maxLength: 280,
  },
  commentAuthor: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const whisprSchema = new Schema({
  whisprText: {
    type: String,
    required: 'You need to leave a whisper!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  whisprType: {  // New field
    type: String,
  },
  whisprAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [commentSchema],
});

const whispr = model('Whispr', whisprSchema);

module.exports = whispr;