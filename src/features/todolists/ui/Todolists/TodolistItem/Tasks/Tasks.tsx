import { List } from "@mui/material"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { selectTasks } from "@/features/todolists/model/tasks-selector"
import type { Filter } from "@/features/todolists/model/todolists-reducer"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem"

type Props = {
  todolistId: string
  filter: Filter
}

export const Tasks = ({ todolistId, filter }: Props) => {
  const tasks = useAppSelector(selectTasks)

  const todolistTasks = tasks[todolistId]
  let filteredTasks = todolistTasks

  if (filter === "Active") {
    filteredTasks = todolistTasks.filter((task) => !task.isDone)
  } else if (filter === "Completed") {
    filteredTasks = todolistTasks.filter((task) => task.isDone)
  }

  return (
    <>
      {filteredTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} todolistId={todolistId} />
          ))}
        </List>
      )}
    </>
  )
}
