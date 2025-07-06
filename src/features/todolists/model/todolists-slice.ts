import type { Todolist } from "@/features/todolists/api/todolistsApi.types"
import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import { createAppSlice } from "@/common/utils"
import { changeStatusAC } from "@/app/app-slice"
import type { RequestStatus } from "@/common/types"
import { ResultCode } from "@/common/enums/enums"
import { handleServerAppError } from "@/common/utils/handleServerAppError"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError"

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    changeEntityStatusAC: create.reducer<{ id: string; status: RequestStatus }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) state[index].entityStatus = action.payload.status
    }),
    fetchTodolistsTC: create.asyncThunk(
      async (_args, thunkAPI) => {
        try {
          thunkAPI.dispatch(changeStatusAC({ status: "loading" }))
          const res = await todolistsApi.getTodolists()
          thunkAPI.dispatch(changeStatusAC({ status: "succeeded" }))
          return { todolists: res.data }
        } catch (e) {
          thunkAPI.dispatch(changeStatusAC({ status: "failed" }))
          return thunkAPI.rejectWithValue(e)
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload.todolists.forEach((tl) => {
            state.push({ ...tl, filter: "All", entityStatus: "idle" })
          })
        },
      },
    ),
    createTodolistTC: create.asyncThunk(
      async (title: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await todolistsApi.createTodolist({ title })
          dispatch(changeStatusAC({ status: "succeeded" }))

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusAC({ status: "succeeded" }))
            return res.data.data.item
          } else {
            handleServerAppError({ dispatch, data: res.data })
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError({ dispatch, error })
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({ ...action.payload, filter: "All", entityStatus: "idle" })
        },
      },
    ),
    changeTodolistTitleTC: create.asyncThunk(
      async (payload: { id: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          await todolistsApi.changeTodolistTitle(payload)
          dispatch(changeStatusAC({ status: "succeeded" }))
          return payload
        } catch (e) {
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(e)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((tl) => tl.id === action.payload.id)
          if (index !== -1) state[index].title = action.payload.title
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async (payload: { id: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(changeStatusAC({ status: "loading" }))
          thunkAPI.dispatch(changeEntityStatusAC({ id: payload.id, status: "loading" }))
          await todolistsApi.deleteTodolist(payload)
          thunkAPI.dispatch(changeStatusAC({ status: "succeeded" }))
          return payload
        } catch (e) {
          thunkAPI.dispatch(changeStatusAC({ status: "failed" }))
          thunkAPI.dispatch(changeEntityStatusAC({ id: payload.id, status: "failed" }))
          return thunkAPI.rejectWithValue(e)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((tl) => tl.id === action.payload.id)
          if (index !== -1) state.splice(index, 1)
        },
      },
    ),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: Filter }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    }),
  }),
})

export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors
export const {
  changeTodolistFilterAC,
  fetchTodolistsTC,
  createTodolistTC,
  changeTodolistTitleTC,
  deleteTodolistTC,
  changeEntityStatusAC,
} = todolistsSlice.actions

export type DomainTodolist = Todolist & {
  filter: Filter
  entityStatus: RequestStatus
}
export type Filter = "All" | "Active" | "Completed"
