const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: {type: 'string', required: true},
    description: {type: 'string', required: true},
    thumbnail: {type: 'string', required: true},
    video: {type: 'string', required: true},
    like: {type: 'number', required: false},
    createdAt : {type: 'string', required: false},
});

const User = mongoose.model('USER', userSchema);

module.exports = User;