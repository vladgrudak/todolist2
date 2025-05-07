import {Task, TaskStatus} from './App.tsx';
import {Button} from './Button.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type Props = {
    title: string,
    tasks: Task[],
    date?: string,
    deleteTask: (tasks: Task[], taskId: string) => void,
    filterTask: (taskStatus: TaskStatus) => void,
    createTask: (taskName: string) => void,
}

export const TodolistItem = ({title, tasks, deleteTask, filterTask, createTask}: Props) => {
    const [taskTitle, setTaskTitle] = useState('');

    const tasksList = tasks.map(task => {

        const deleteTaskHandler = () => {
            deleteTask(tasks, task.id)
        }

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <Button title={'x'} onClick={deleteTaskHandler}/>
            </li>
        )
    })

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.target.value)
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                <Button title={'+'} onClick={() => createTaskHandler()}/>
            </div>
            {tasks.length === 0
                ? <p>Тасок нет</p>
                : (
                    <ul>
                        {tasksList}
                    </ul>
                )
            }
            <div>
                <Button title={'All'} onClick={() => filterTask('All')}/>
                <Button title={'Active'} onClick={() => filterTask('Active')}/>
                <Button title={'Completed'} onClick={() => filterTask('Completed')}/>
            </div>
        </div>
    )
}