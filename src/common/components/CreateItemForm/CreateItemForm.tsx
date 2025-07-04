import { ChangeEvent, KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"

import AddBoxIcon from "@mui/icons-material/AddBox"
import IconButton from "@mui/material/IconButton"

type Props = {
  onCreateItem: (title: string) => void
  isDisabled?: boolean
}

export const CreateItemForm = ({ onCreateItem, isDisabled = false }: Props) => {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const createItemHandler = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle !== "") {
      onCreateItem(trimmedTitle)
      setTitle("")
    } else {
      setError("Your input is empty")
      // setTaskTitle('')
    }
  }

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setTitle(event.target.value)
  }

  const createItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createItemHandler()
    }
  }

  return (
    <div>
      <TextField
        label={"Enter a title"}
        variant={"outlined"}
        value={title}
        disabled={isDisabled}
        size={"small"}
        error={!!error}
        helperText={error}
        onChange={changeItemTitleHandler}
        onKeyDown={createItemOnEnterHandler}
      />
      <IconButton onClick={createItemHandler} color={"primary"} disabled={isDisabled}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}
