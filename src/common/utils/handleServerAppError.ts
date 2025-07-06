import { changeErrorAC, changeStatusAC } from "@/app/app-slice"
import type { Dispatch } from "@reduxjs/toolkit"
import type { BaseResponse } from "@/common/types"

export const handleServerAppError = <T>({ dispatch, data }: { dispatch: Dispatch; data: BaseResponse<T> }) => {
  dispatch(changeStatusAC({ status: "failed" }))
  dispatch(changeErrorAC({ error: data.messages.length ? data.messages[0] : "Some error occurred." }))
}
