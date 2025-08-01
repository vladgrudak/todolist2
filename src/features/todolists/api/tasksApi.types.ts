import type { TaskStatus, TaskPriority } from "@/common/enums/enums"

export type DomainTask = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}
