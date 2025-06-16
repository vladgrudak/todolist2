import { RootState } from "@/app/store"

import type { TasksState } from "@/features/todolists/model/tasks-reducer"

export const selectTasks = (state: RootState): TasksState => state.tasks
