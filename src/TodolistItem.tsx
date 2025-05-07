import {Filter, Task} from './App.tsx';
import {Button} from './Button.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type Props = {
    title: string,
    tasks: Task[],
    date?: string,
    deleteTask: (tasks: Task[], taskId: string) => void,
    filterTask: (filter: Filter) => void,
    createTask: (taskName: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean) => void,
    currentFilter: Filter,
}

export const TodolistItem = ({title, tasks, deleteTask, filterTask, createTask, changeTaskStatus, currentFilter}: Props) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState<string|null>(null)

    const tasksList = tasks.map(task => {

        const deleteTaskHandler = () => {
            deleteTask(tasks, task.id)
        }

        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id,  e.currentTarget.checked)
        }

        return (
            <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                <span>{task.title}</span>
                <Button title={'x'} onClick={deleteTaskHandler}/>
            </li>
        )
    })

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Your input is empty')
            // setTaskTitle('')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
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
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                <Button title={'+'} onClick={() => createTaskHandler()}/>
                {error && <div className={'error-message'}>{error}</div>}
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
                <Button
                    className={currentFilter === 'All' ? 'active-filter' : ''}
                    title={'All'}
                    onClick={() => filterTask('All')}/>
                <Button
                    className={currentFilter === 'Active' ? 'active-filter' : ''}
                    title={'Active'}
                    onClick={() => filterTask('Active')}/>
                <Button
                    className={currentFilter === 'Completed' ? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={() => filterTask('Completed')}/>
            </div>
        </div>
    )
}