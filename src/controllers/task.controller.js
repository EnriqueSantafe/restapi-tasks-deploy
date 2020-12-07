import Task from '../models/Task'
import { getPagination } from '../libs/getPagination'
export const findAllTasks = async (req, res) => {
    try {
        const { size, page, title } = req.query
        const condition = title ? {title: {$regex: new RegExp(title), $options: "i"}} : {}
        const { limit, offset } = getPagination(page, size)
        const data = await Task.paginate(condition, {offset, limit})
        //console.log(data)
        res.json({
            totalItems: data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1
        })
    } catch(error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong retrieving the task'
        })
    }
}
export const createTask = async (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({message: 'Content cannot be empty'})
    }
    try {
        //console.log(req.body)
        const newTask = new Task({ 
            title: req.body.title, 
            description: req.body.description,
            done: req.body.done ? req.body.done : false
        })
        const taskSaved = await newTask.save()
        //console.log(newTask)
        res.json(taskSaved)
    } catch(error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong creating a task'
        })
    }
}
export const findOneTask = async (req, res) => {
    const { id } = req.params
    try {
        //console.log(req.params.id)
        const task = await Task.findById(id)
        //console.log(task)
        if (!task) {
            return res.status(404).json({message: `Task with id ${id} does not exists`})
        }
        res.json(task)
        //throw new Error() //esto es por si quiero forzar un error para ver que me da
    } catch(error) {
        res.status(500).json({
            message: error.message || `Error retrieving Task width id ${id}`
        })
    }
}
export const deleteTask = async (req, res) => {
    const { id } = req.params
    try {
        await Task.findByIdAndDelete(id)
        res.json({
            message: 'Task were deleted sucessfully'
        })
    } catch(error) {
        res.status(500).json({
            message: `Cannot delete Task width id ${id}`
        })
    }
}
export const findAllDoneTasks = async (req, res) => {
    try {
        const tasks = await Task.find({done: true})
        res.json(tasks)
    } catch(error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong retrieving the done task'
        })
    }
}
export const updateTask = async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, req.body, {
            useFindAndModify: false
        })
        res.json({message: 'Task was updated successfully'})
    } catch(error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong updating a task'
        })
    }
}