import { List } from "@mui/material"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { fetchTasks, selectTasks } from "@/features/todolists/model/tasks-slice"
import type { Filter } from "@/features/todolists/model/todolists-slice"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem"
import { useAppDispatch } from "@/common/hooks"
import { useEffect } from "react"
import { TaskStatus } from "@/common/enums/enums"

type Props = {
  todolistId: string
  filter: Filter
}

export const Tasks = ({ todolistId, filter }: Props) => {
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasks(todolistId))
  }, [])

  const todolistTasks = tasks[todolistId]
  let filteredTasks = todolistTasks

  if (filter === "Active") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.New)
  } else if (filter === "Completed") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolistId={todolistId} />)}</List>
      )}
    </>
  )
}
