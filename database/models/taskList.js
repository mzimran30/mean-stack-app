const mongoose = require('mongoose');

const TaskListSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,           //to disallow spaces
        minlength: 3,

    }
});

const TaskList = mongoose.model('TaskList', TaskListSchema);

module.exports = TaskList;