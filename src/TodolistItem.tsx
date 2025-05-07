import {Filter, Task, Todolist} from './App.tsx';
import {Button} from './Button.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type Props = {
    tasks: Task[],
    date?: string,
    deleteTask: (todolistId: string, taskId: string) => void,
    filterTask: (todolistId: string, filter: Filter) => void,
    createTask: (todolistId: string, taskName: string) => void,
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void,
    todolist: Todolist,
    deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = ({todolist, deleteTodolist, tasks, deleteTask, filterTask, createTask, changeTaskStatus}: Props) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState<string|null>(null)

    const tasksList = tasks.map(task => {

        const deleteTaskHandler = () => {
            deleteTask(todolist.id, task.id)
        }

        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(todolist.id, task.id,  e.currentTarget.checked)
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
            createTask(todolist.id, trimmedTitle)
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

    const changeFilterHandler = (filter: Filter) => {
        filterTask(todolist.id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(todolist.id)
    }

    return (
        <div>
            <div className="container">
                <h3>{todolist.title}</h3>
                <Button onClick={deleteTodolistHandler} title={'X'}></Button>
            </div>
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
                    className={todolist.filter === 'All' ? 'active-filter' : ''}
                    title={'All'}
                    onClick={() => changeFilterHandler('All')}/>
                <Button
                    className={todolist.filter === 'Active' ? 'active-filter' : ''}
                    title={'Active'}
                    onClick={() => changeFilterHandler('Active')}/>
                <Button
                    className={todolist.filter === 'Completed' ? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={() => changeFilterHandler('Completed')} />
            </div>
        </div>
    )
}