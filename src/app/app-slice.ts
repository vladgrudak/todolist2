import { createSlice } from "@reduxjs/toolkit"
import type { RequestStatus } from "@/common/types"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: "ZALUPA" as string | null,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    changeStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    changeErrorAC: create.reducer<{ error: null | string }>((state, action) => {
      state.error = action.payload.error
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
})

export const { changeThemeModeAC, changeStatusAC, changeErrorAC } = appSlice.actions
export const appReducer = appSlice.reducer
export const { selectThemeMode, selectStatus, selectError } = appSlice.selectors

export type ThemeMode = "dark" | "light"
