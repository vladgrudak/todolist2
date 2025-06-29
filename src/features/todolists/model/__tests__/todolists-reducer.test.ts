import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  type DomainTodolist,
  todolistsReducer,
} from "../todolists-slice"
import { beforeEach, expect, test } from "vitest"
import { nanoid } from "@reduxjs/toolkit"

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[]

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ]
})

test("correct todolist should be deleted", () => {
  const action = deleteTodolistAC({ id: todolistId1 })

  const endState = todolistsReducer(startState, action)

  // 3. Проверка, что действие измененило state соответствующим образом
  // в массиве останется один тудулист
  expect(endState.length).toBe(1)
  // удалится нужный тудулист, не любой
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be created", () => {
  const title = "New todolist"
  const endState = todolistsReducer(startState, createTodolistAC(title))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(title)
})

test("correct todolist should change its title", () => {
  const title = "New title"
  const endState = todolistsReducer(startState, changeTodolistTitleAC({ id: todolistId2, title }))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(title)
})

test("correct todolist should change its filter", () => {
  const filter = "Completed"
  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter }))

  expect(endState[0].filter).toBe("All")
  expect(endState[1].filter).toBe(filter)
})
