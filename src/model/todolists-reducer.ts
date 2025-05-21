import {Todolist, Filter} from '../App.tsx';
import {v1} from 'uuid';

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionType = DeleteTodolistActionType | CreateTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

const initialState: Todolist [] = []

export const todolistsReducer = (todolists: Todolist[] = initialState, action: ActionType): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            const {id} = action.payload
            return todolists.filter(todolist => todolist.id !== id)
        }
        case 'create_todolist': {
            const {id, title} = action.payload
            return [...todolists, {id, title, filter: 'All'}]
        }
        case 'change_todolist_title' : {
            const {id, title} = action.payload
            return todolists.map(tl => tl.id === id ? {...tl, title} : tl)
        }
        case 'change_todolist_filter' : {
            const {id, filter} = action.payload
            return todolists.map(todolist => id === todolist.id ? {...todolist, filter} : todolist)
        }
        default:
            return todolists
    }
}

export const deleteTodolistAC = (id: string) => ({
    type: 'delete_todolist',
    payload: {
        id: id
    }
} as const)

export const createTodolistAC = (title: string) => ({
    type: 'create_todolist',
    payload: {
        title,
        id: v1()
    }
} as const)

export const changeTodolistTitleAC = (payload: {id: string, title: string}) => ({
    type: 'change_todolist_title',
    payload
} as const)

export const changeTodolistFilterAC = (payload: {id: string, filter: Filter}) => ({
    type: 'change_todolist_filter',
    payload
} as const)