import { changeErrorAC, changeStatusAC } from "@/app/app-slice"
import type { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"

export const handleServerNetworkError = ({ error, dispatch }: { error: unknown; dispatch: Dispatch }) => {
  let errorMessage

  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error.message
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
  } else {
    errorMessage = JSON.stringify(error)
  }

  dispatch(changeErrorAC({ error: errorMessage }))
  dispatch(changeStatusAC({ status: "failed" }))
}
