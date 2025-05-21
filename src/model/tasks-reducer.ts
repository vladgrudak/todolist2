import {TasksState} from '../App.tsx';
import {CreateTodolistActionType, DeleteTodolistActionType} from './todolists-reducer.ts';
import {v1} from 'uuid';


const initialState: TasksState = {}
type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
type CreateTaskACType = ReturnType<typeof createTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type ActionType = DeleteTodolistActionType | CreateTodolistActionType | DeleteTaskACType | CreateTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType

export const tasksReducer = (tasks: TasksState = initialState, action: ActionType): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            const {id} = action.payload
            return {...tasks, [id]: []}
        }
        case 'delete_todolist': {
            const {id} = action.payload
            delete tasks[id]
            return {...tasks}
        }
        case 'delete_task': {
            const {todolistId, taskId} = action.payload
            return { ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) }
        }
        case 'create_task': {
            const {todolistId, title, id} = action.payload
            const newTask = {id, title, isDone: false}
            return { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] }
        }
        case 'change_task_status': {
                const {todolistId, taskId, isDone} = action.payload
                return {...tasks,  [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task) }
        }
        case 'change_task_title': {
            const {todolistId, taskId, title} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)}
        }
        default:
            return tasks
    }
}

export const deleteTaskAC = (payload:{todolistId: string, taskId: string}) => {
    return { type: 'delete_task', payload } as const
}

export const createTaskAC = (payload:{todolistId: string, title: string}) => {
    return { type: 'create_task', payload: {...payload, id: v1() } } as const
}

export const changeTaskStatusAC = (payload:{ todolistId: string, taskId: string, isDone: boolean }) => {
    return {type: 'change_task_status', payload } as const
}

export const changeTaskTitleAC = (payload:{todolistId: string, taskId: string, title: string}) => {
    return { type: 'change_task_title', payload } as const
}