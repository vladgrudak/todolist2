import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { createTask } from "@/features/todolists/model/tasks-slice"
import { type DomainTodolist } from "@/features/todolists/model/todolists-slice"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons"
import styles from "./TodolistItem.module.css"

type Props = {
  date?: string
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    dispatch(createTask({ todolistId: todolist.id, title }))
  }

  return (
    <div className={todolist.entityStatus === "loading" ? styles.disabled : ""}>
      <TodolistTitle id={todolist.id} title={todolist.title} entityStatus={todolist.entityStatus} />
      <CreateItemForm onCreateItem={createTaskHandler} isDisabled={todolist.entityStatus === "loading"} />
      <Tasks todolistId={todolist.id} filter={todolist.filter} />
      <FilterButtons todolistId={todolist.id} filter={todolist.filter} />
    </div>
  )
}
