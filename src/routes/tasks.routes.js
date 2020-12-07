import { Router } from 'express' //me permite definir las rutas
import * as taskController from '../controllers/task.controller'
const router = Router()
router.post('/', taskController.createTask) //ruta para crear una tarea
router.get('/', taskController.findAllTasks) //ruta para obtener todas las tareas
router.get('/done', taskController.findAllDoneTasks) //ruta para obtener todas las tareas con done true
router.get('/:id', taskController.findOneTask) //ruta para obtener solo una tarea por su id
router.delete('/:id', taskController.deleteTask) //ruta para eliminar solo una tarea por su id
router.put('/:id', taskController.updateTask) //ruta para actualizar el título de una tarea por su id
export default router