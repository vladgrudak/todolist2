import {Filter, Task, Todolist} from './App.tsx';
import {Button} from './Button.tsx';
import {ChangeEvent} from 'react';
import {CreateItemForm} from './CreateItemForm.tsx';
import {EditableSpan} from './EditableSpan.tsx';

type Props = {
    tasks: Task[],
    date?: string,
    deleteTask: (todolistId: string, taskId: string) => void,
    filterTask: (todolistId: string, filter: Filter) => void,
    createTask: (todolistId: string, taskName: string) => void,
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void,
    todolist: Todolist,
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, title: string, taskId: string) => void,
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (
    {
        todolist,
        deleteTodolist,
        tasks,
        deleteTask,
        filterTask,
        createTask,
        changeTaskStatus,
        changeTaskTitle,
        changeTodolistTitle
    }: Props) => {

    const tasksList = tasks.map(task => {

        const deleteTaskHandler = () => {
            deleteTask(todolist.id, task.id)
        }

        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(todolist.id, task.id, e.currentTarget.checked)
        }

        const changeTaskTitleHandler = (title: string) => {
            changeTaskTitle(todolist.id, title, task.id)
        }

        return (
            <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                <Button title={'x'} onClick={deleteTaskHandler}/>
            </li>
        )
    })

    const changeFilterHandler = (filter: Filter) => {
        filterTask(todolist.id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(todolist.id)
    }

    const createTaskHandler = (title: string) => {
        createTask(todolist.id, title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolist.id, title)
    }

    return (
        <div>
            <div className="container">
                <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler} /></h3>
                <Button onClick={deleteTodolistHandler} title={'X'}></Button>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
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
                    onClick={() => changeFilterHandler('Completed')}/>
            </div>
        </div>
    )
}