import {Todolist, Filter} from '../app/App.tsx'
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';

export const deleteTodolistAC = createAction<{id:string}>('todolists/deleteTodolist')
export const createTodolistAC = createAction(('todolists/createTodolist'), (title: string) => {
    return {payload:{id:nanoid(), title}}
})
export const changeTodolistTitleAC = createAction<{id:string, title: string}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{id:string, filter: Filter}>('todolists/changeTodolistFilter')

const initialState: Todolist [] = []

export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        })
        .addCase(createTodolistAC, (state, action) => {
            state.push({id: action.payload.id, title: action.payload.title, filter: "All"})
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) state[index].title = action.payload.title
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) state[index].filter = action.payload.filter
        })
})