const mongoose = require('mongoose');
const UserSchema = require('../schemas/user');

const UserModel = mongoose.model('User', UserSchema, 'users');

module.exports = UserModel;
