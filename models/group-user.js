const mongoose = require('mongoose');
const GroupUserSchema = require('../schemas/group-user');

const GroupUserModel = mongoose.model('Group-User', GroupUserSchema, 'group-user');

module.exports = GroupUserModel;
