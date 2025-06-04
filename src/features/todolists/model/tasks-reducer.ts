import {createTodolistAC, deleteTodolistAC} from './todolists-reducer.ts';
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTask')
export const createTaskAC = createAction<{todolistId: string, title: string}>('tasks/createTask')
export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitle')

export type Task = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksState = {
    [key: string]: Task[]
}
const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTaskAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) state[action.payload.todolistId].splice(index, 1)
        })
        .addCase(createTaskAC, (state, action) => {
            const newTask: Task = { id: nanoid(), title: action.payload.title, isDone: false }
            state[action.payload.todolistId].push(newTask)
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) state[action.payload.todolistId][index].isDone = action.payload.isDone
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
            if (task) task.title = action.payload.title
        })
})
