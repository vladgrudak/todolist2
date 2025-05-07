import './App.css'
import {TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';
import {v1} from 'uuid';

export type Task = {
    id: string,
    title: string,
    isDone: boolean
}

export type Filter = 'All' | 'Active' | 'Completed'

export const App = () => {

    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    const deleteTask = (tasks: Task[], taskId: string) => {
        const filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks)
    }

    const [filter, setFilter] = useState<Filter>('All')

    let filteredTasks = tasks


    if (filter === 'Active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    } else if (filter === 'Completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    const filterTask = (taskStatus: Filter) => {
        setFilter(taskStatus)
    }

    const createTask = (taskName: string) => {
        const newTask = {id: v1(), title: taskName, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const newTasks = tasks.map(task => task.id === taskId ? {...task, isDone} : task)
        setTasks(newTasks)
    }


    return (
        <div className="app">
            <TodolistItem
                title={'What to learn'}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                filterTask={filterTask}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
                currentFilter={filter}
            />
        </div>
    )
}

