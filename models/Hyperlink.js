const mongoose = require('mongoose');

const HyperlinkSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('hyperlink', HyperlinkSchema);
