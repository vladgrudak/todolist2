import './App.css'
import {TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';
import {v1} from 'uuid';
import {CreateItemForm} from './CreateItemForm.tsx';

export type Task = {
    id: string,
    title: string,
    isDone: boolean
}

export type Todolist = {
    id: string,
    title: string,
    filter: Filter
}

export type TasksState = {
    [key: string]: Task[]
}

export type Filter = 'All' | 'Active' | 'Completed'

export const App = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title:'What to do', filter: 'All'},
        {id: todolistId2, title:'What to learn', filter: 'All'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Помыться', isDone: true},
            {id: v1(), title: 'Побриться', isDone: true},
            {id: v1(), title: 'Спать завалиться', isDone: false},
        ]
    })

    const deleteTask = (todolistId:string, taskId: string) => {
        const filteredTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
        }
        setTasks(filteredTasks)
    }


    const filterTask = (todolistId:string, filter: Filter) => {
        const newTodolists = todolists.map( todolist => todolistId === todolist.id ? {...todolist, filter} : todolist)
        setTodolists(newTodolists)
    }

    const createTask = (todolistId: string, taskName: string) => {
        const newTask = {id: v1(), title: taskName, isDone: false}
        setTasks({
            ...tasks,
            [todolistId]: [newTask,...tasks[todolistId]]
        })
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const newTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)
        }
        setTasks(newTasks)
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const createTodolist = (title: string) => {
        const id = v1()
        setTodolists([...todolists, {id, title, filter: 'All'}])
        setTasks({...tasks, [id]: []})
    }

    const changeTaskTitle = (todolistId: string, title: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    return (
        <div className="app">
            <CreateItemForm onCreateItem={createTodolist}/>
            {todolists.map(todolist => {
                const todolistTasks = tasks[todolist.id]
                let filteredTasks = todolistTasks

                if (todolist.filter === 'Active') {
                    filteredTasks = todolistTasks.filter(task => !task.isDone)
                } else if (todolist.filter === 'Completed') {
                    filteredTasks = todolistTasks.filter(task => task.isDone)
                }

                return (
                    <TodolistItem
                        key={todolist.id}
                        todolist={todolist}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        filterTask={filterTask}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}
                        deleteTodolist={deleteTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}
        </div>
    )
}

