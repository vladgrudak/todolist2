import {Filter, Task, Todolist} from './app/App.tsx';
import {ChangeEvent} from 'react';
import {CreateItemForm} from './CreateItemForm.tsx';
import {EditableSpan} from './EditableSpan.tsx';

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button';
import {Checkbox, List, ListItem} from '@mui/material';
import Box from '@mui/material/Box'

import {containerSx, getListItemSx} from './TodolistItem.styles.ts';

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
            <ListItem
                sx={getListItemSx(task.isDone)}
                key={task.id}>
                <div>
                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                </div>
                <IconButton onClick={deleteTaskHandler}>
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
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
                <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/></h3>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            {tasks.length === 0
                ? <p>Тасок нет</p>
                : (
                    <List>
                        {tasksList}
                    </List>
                )
            }
            <Box sx={containerSx}>
                <Button
                    variant={todolist.filter === 'All' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilterHandler('All')}>
                    All
                </Button>
                <Button
                    variant={todolist.filter === 'Active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterHandler('Active')}>
                    Active
                </Button>
                <Button
                    variant={todolist.filter === 'Completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilterHandler('Completed')}>
                    Completed
                </Button>
            </Box>
        </div>
    )
}