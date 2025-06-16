import { RootState } from "@/app/store"

import type { Todolist } from "@/features/todolists/model/todolists-reducer"

export const selectTodolists = (state: RootState): Todolist[] => state.todolists
