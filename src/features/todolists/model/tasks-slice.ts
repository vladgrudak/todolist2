import { createTodolistTC, deleteTodolistTC } from "./todolists-slice.ts"
import { createAppSlice } from "@/common/utils"
import { tasksApi } from "@/features/todolists/api/tasksApi"
import type { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types"
import { changeErrorAC, changeStatusAC } from "@/app/app-slice"
import { ResultCode } from "@/common/enums/enums"

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    fetchTasks: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        thunkAPI.dispatch(changeStatusAC({ status: "loading" }))
        try {
          const res = await tasksApi.getTasks(todolistId)
          thunkAPI.dispatch(changeStatusAC({ status: "succeeded" }))
          return { tasks: res.data.items, todolistId }
        } catch (error) {
          thunkAPI.dispatch(changeStatusAC({ status: "failed" }))
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    createTask: create.asyncThunk(
      async (args: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
        dispatch(changeStatusAC({ status: "loading" }))
        try {
          const res = await tasksApi.createTask(args)
          dispatch(changeStatusAC({ status: "succeeded" }))

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusAC({ status: "succeeded" }))
            return { task: res.data.data.item }
          } else {
            dispatch(changeStatusAC({ status: "failed" }))
            dispatch(changeErrorAC({ error: res.data.messages.length ? res.data.messages[0] : "Some error occurred." }))
            return rejectWithValue(null)
          }
        } catch (error) {
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task)
        },
      },
    ),
    deleteTask: create.asyncThunk(
      async (args: { todolistId: string; taskId: string }, thunkAPI) => {
        thunkAPI.dispatch(changeStatusAC({ status: "loading" }))
        try {
          await tasksApi.deleteTask(args)
          thunkAPI.dispatch(changeStatusAC({ status: "succeeded" }))
          return args
        } catch (error) {
          thunkAPI.dispatch(changeStatusAC({ status: "failed" }))
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
          if (index !== -1) state[action.payload.todolistId].splice(index, 1)
        },
      },
    ),
    updateTask: create.asyncThunk(
      async (task: DomainTask, thunkAPI) => {
        try {
          const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            deadline: task.deadline,
            priority: task.priority,
            status: task.status,
            startDate: task.startDate,
          }
          thunkAPI.dispatch(changeStatusAC({ status: "loading" }))

          await tasksApi.updateTask({ task, model })
          thunkAPI.dispatch(changeStatusAC({ status: "succeeded" }))
          return task
        } catch (error) {
          thunkAPI.dispatch(changeStatusAC({ status: "failed" }))
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state[action.payload.todoListId].findIndex((task) => task.id === action.payload.id)
          if (index !== -1) state[action.payload.todoListId][index] = action.payload
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors
export const { fetchTasks, createTask, deleteTask, updateTask } = tasksSlice.actions

export type TasksState = {
  [key: string]: DomainTask[]
}
