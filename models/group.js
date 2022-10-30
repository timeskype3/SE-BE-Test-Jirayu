const mongoose = require('mongoose');
const GroupSchema = require('../schemas/group');

const GroupModel = mongoose.model('Group', GroupSchema, 'groups');

module.exports = GroupModel;
