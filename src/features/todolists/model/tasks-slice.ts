import { createTodolistTC, deleteTodolistTC } from "./todolists-slice.ts"
import { createSlice, nanoid } from "@reduxjs/toolkit"

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) state[action.payload.todolistId].splice(index, 1)
    }),
    createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const newTask: Task = { id: nanoid(), title: action.payload.title, isDone: false }
      state[action.payload.todolistId].push(newTask)
    }),
    changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) state[action.payload.todolistId][index].isDone = action.payload.isDone
    }),
    changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
      const task = state[action.payload.todolistId].find((t) => t.id === action.payload.taskId)
      if (task) task.title = action.payload.title
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.item.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors
export const { deleteTaskAC, createTaskAC, changeTaskTitleAC, changeTaskStatusAC } = tasksSlice.actions

export type Task = {
  id: string
  title: string
  isDone: boolean
}
export type TasksState = {
  [key: string]: Task[]
}
