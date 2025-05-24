import {TasksState} from '../app/App.tsx';
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer.ts';
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTask')
export const createTaskAC = createAction('tasks/createTask', (data: {todolistId: string, title: string}) => {
    return {
        payload: {
            todolistId: data.todolistId,
            title: data.title,
            taskId: nanoid(),
            isDone: false
        }
    }
})
export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitle')

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
            state[action.payload.todolistId].push({id: action.payload.taskId, isDone: action.payload.isDone, title: action.payload.title})
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
