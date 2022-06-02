const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const TaskList = require('./database/models/taskList');
const Task = require('./database/models/task');


app.use( function (req,res,next)
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Origin', 'X-Requested-With,content-type,Accept');

    next();
}
)

app.use(express.json()); //express built-in json body parser

//Route for GETTING ALL TaskList - select * from table 
app.get('/tasklists', (req,res)=>
{
    TaskList.find({})
    .then((lists)=> {
        res.status(200).send(lists);
        
    })
    .catch((error)=>{console.log(error)});
}
);      


//POST method for adding 1 new entry in table/document/schema. = SQL insert query
app.post('/tasklists', (req, res) =>{
    // console.log("Hello inside Post Method");
    console.log(req.body);
    let taskListObj = {'title': req.body.title};
    TaskList(taskListObj).save()
    .then((lists)=>{
        res.status(201).send(lists);
        })
    .catch((error)=>{console.log(error)});
});

//GET method for searching specific entries(by id in this case) - select * from table where name=boota
app.get('/tasklists/:tasklistID', (req, res) =>
{
    let tasklistID=req.params.tasklistID;
    TaskList.find({_id:tasklistID})
    .then((taskList)=>{
        res.status(200).send(taskList)
    })
    .catch((error)=>{console.log(error)});
}

)

//PUT METHOD IS FULL UPDATE, 
app.put('/tasklists/:tasklistID', (req,res)=>{
    TaskList.findOneAndUpdate({_id:req.params.tasklistID}, {$set:req.body})
    .then((taskList)=>{
        res.status(200).send(taskList)
    })
    .catch((error)=>{console.log(error)});
})
//Patch is partial update of one field 
app.patch('/tasklists/:tasklistID', (req,res)=>{
    TaskList.findOneAndUpdate({_id:req.params.tasklistID}, {$set:req.body})
    .then((taskList)=>{
        res.status(200).send(taskList)
    })
    .catch((error)=>{console.log(error)});
})

//delete a tasklist by id
app.delete('/tasklists/:tasklistID', (req,res)=>{
    TaskList.findByIdAndDelete(req.params.tasklistID)
    .then((taskList)=>{
        res.status(201).send(taskList)
    })
    .catch((error)=>{console.log(error)});
}) 

//Oerations regarding single tasks 

//Create A Task inside a particulat task list
app.post('/tasklists/:tasklistId/tasks', (req, res) =>{
    // console.log("Hello inside Post Method");
    console.log(req.body);
    let taskObj = {'title': req.body.title, '_taskListId':req.params.tasklistId};
    Task(taskObj).save()
    .then((task)=>{
        res.status(201).send(task);
        })
    .catch((error)=>{console.log(error)});
});

// Get all tasks related to one task lisk

app.get('/tasklists/:tasklistId/tasks', (req, res) => {
    console.log("Hello World");
    Task.find({ _taskListId: req.params.tasklistId })
        .then((tasks) => {
            res.status(200).send(tasks)
        })
        .catch((error) => { console.log(error) });
});

//Get one particular task from id
app.get('/tasklists/:tasklistId/tasks/:taskId', (req, res) => {
    Task.findOne({ _taskListId: req.params.tasklistId, _id:req.params.taskId })
        .then((tasks) => {
            res.status(200).send(tasks)
        })
        .catch((error) => { console.log(error) });
});

//patch one particular task from task list id as well as task id, & query,multi parameter
app.patch('/tasklists/:tasklistId/tasks/:taskId', (req,res)=>{
    Task.findOneAndUpdate({_taskListId:req.params.tasklistId, _id:req.params.taskId},{$set:req.body})
    .then((task)=>{
        res.status(200).send(task)
    })
    .catch(error=>{console.log(error)});
})
//Delete single tast in one task list
app.delete('/tasklists/:tasklistId/tasks/:taskId', (req,res)=>{
    Task.findOneAndDelete({_taskListId:req.params.tasklistId, _id:req.params.taskId})
    .then((task)=>{
        res.status(200).send(task)
    })
    .catch(error=>{console.log(error)});
})




app.listen(3000, ()=>{
    console.log("server started on port 3000");
});
