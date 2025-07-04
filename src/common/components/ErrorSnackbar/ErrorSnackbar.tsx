import * as React from "react"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { changeErrorAC, selectError } from "@/app/app-slice"

export const ErrorSnackbar = () => {
  // const [open, setOpen] = React.useState(false)
  const dispatch = useAppDispatch()

  const appError = useAppSelector(selectError)

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(changeErrorAC({ error: null }))
  }

  return (
    <div>
      <Snackbar open={appError !== null} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
          {appError}
        </Alert>
      </Snackbar>
    </div>
  )
}
