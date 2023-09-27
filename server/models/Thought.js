const { Schema, model, mongoose } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Sub-document schema for reaction

const commentSchema = new Schema({
  commentId: {
    type: mongoose.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  commentBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'You need to leave a whisper!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  thoughtType: {  // New field
    type: String,
  },
  thoughtAuthor: {
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

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
