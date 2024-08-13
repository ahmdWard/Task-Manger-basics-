const fs = require('fs');
const path=require('path')

const dataFilePath = path.join(__dirname, 'data.json');

function readFile() {
    try {
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'))
        return data
    } catch (error) {
        console.log(error.message)
        return []
    }
}
function writeFile(data) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data), 'utf-8')
        console.log('data saved succesfully')
    } catch (error) {
        console.log(error.message)
    }
}

 function add(description) {
    const tasks = readFile()
    const newTask = {
        id: tasks.length? Math.max(...tasks.map(task=>task.id))+1 :1, //bug but its okay, just quick training 
        description: description,
        status: 'to do',
        createdAt: new Date().toString(),
        updatedAt:undefined
    }
    tasks.push(newTask)
    writeFile(tasks)
}
function list(status) {
    const tasks = readFile();
    if (tasks.length === 0) {
        console.log('List is empty');
        return;
    }
    
    console.log('List of tasks:');
    if (!status) {
        tasks.forEach(task => console.log(task));
    } else if (['done', 'to do', 'progress'].includes(status)) {
        const filteredTasks = tasks.filter(task => task.status === status);
        if (filteredTasks.length > 0) {
            filteredTasks.forEach(task => console.log(task));
        } else {
            console.log(`No tasks with status '${status}'`);
        }
    } else {
        console.log('Invalid status. Available statuses are: done, to do, progress.');
    }
}

 function update(id,val) {
    const tasks =  readFile()
    if (!tasks)
        console.log('list is empty')
    const task= tasks.find(task=>task.id==parseInt(id))
    if (task) {
        task.description = val
        task.updatedAt = new Date().toString()
    writeFile(tasks)
   }
}
 function deleteTask(id) {
    const tasks =  readFile()
    const initialLength = tasks.length;
    const updatedTasks = tasks.filter(task => task.id != parseInt(id));
    if (updatedTasks.length === initialLength) {
        console.log(`Task with ID ${id} not found.`);
    } else {
        writeFile(updatedTasks);
        console.log(`Task with ID ${id} deleted.`);
    }
}

 function markInProgress(id) {
    const tasks =  readFile()
    if (!tasks)
        console.log('list is empty')
    const task = tasks.find(task => task.id == id)
    if (task) {
        task.status = 'progress'
        writeFile(tasks)
        console.log(`Task with ID ${id} marked as in progress.`);
    } else {
        console.log(`Task with ID ${id} not found.`);
    }
}
 function markDone( id) {
    const tasks =  readFile()
    if (!tasks)
        console.log('list is empty')
    const task = tasks.find(task => task.id == id)
    if (task) {
        task.status = 'done';
        writeFile(tasks);
        console.log(`Task with ID ${id} marked as done.`);
    } else {
        console.log(`Task with ID ${id} not found.`);
    }
}
exports.processCommands = (command, ...args) => {
    switch (command) {
        case 'add':
             add(args.join(' '))
            console.log('add')
            break;
        case 'list':
             list(args.join(''))
            console.log('list')
            break;
        case 'update':
            const [id, ...newDescription] = args
            if (id && newDescription.length > 0) {
                 update(id, newDescription.join(' '));
            } else {
                console.log('Usage: update <id> <new description>');
            }
            break;
        case 'delete':
            const [deleteId] = args;
            if (deleteId) {
                 deleteTask(deleteId);
            } else {
                console.log('Usage: delete <id>');
            }
            break;
        case 'mark-in-progress':
            const [progressedId] = args;
             markInProgress(progressedId)
            break
        case 'mark-done':
            const [doneId] = args;
                markDone(doneId)
                break
            
        default:
            break;
    }
}
