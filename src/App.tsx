import './App.css'
import {TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';

export type Task = {
    id: number,
    title: string,
    isDone: boolean
}

export type TaskStatus = 'All' | 'Active' | 'Completed'

export const App = () => {

    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ])

    const deleteTask = (tasks: Task[], taskId: number) => {
        const filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks)
    }

    const [filter, setFilter] = useState<TaskStatus>('All')

    let filteredTasks = tasks


    if (filter === 'Active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    } else if (filter === 'Completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    const filterTask = (taskStatus: TaskStatus) => {
        setFilter(taskStatus)
    }


    return (
        <div className="app">
            <TodolistItem
                title={'What to learn'}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                filterTask={filterTask}
            />
        </div>
    )
}

