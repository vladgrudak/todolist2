import './App.css'
import {TodolistItem} from '../TodolistItem.tsx';
import {useState} from 'react';
import {CreateItemForm} from '../CreateItemForm.tsx';

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {containerSx} from '../TodolistItem.styles.ts';
import {NavButton} from '../NavButton.ts';

import {createTheme, ThemeProvider} from '@mui/material/styles'

import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from '../model/todolists-reducer.ts';
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from '../model/tasks-reducer.ts';
import {useAppDispatch} from '../common/hooks/useAppDispatch.ts';
import {useAppSelector} from '../common/hooks/useAppSelector.ts';
import {selectTodolists} from '../model/todolists-selector.ts';
import {selectTasks} from '../model/tasks-selector.ts';

type ThemeMode = 'dark' | 'light'

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


    const dispatch = useAppDispatch()

    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    // CRUD tasks
    const createTask = (todolistId: string, taskName: string) => {
        dispatch(createTaskAC({todolistId, title: taskName}))
    }
    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
    }
    const changeTaskTitle = (todolistId: string, title: string, taskId: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }

    //CRUD todolist
    const changeFilter = (todolistId: string, filter: Filter) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }
    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }
    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}))
    }
   
    // UI (view)
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })
    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign out</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode} />
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{mb: '30px'}}>
                        <CreateItemForm onCreateItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map(todolist => {
                            const todolistTasks: Task[] = tasks[todolist.id]
                            let filteredTasks = todolistTasks
                            if (todolist.filter === 'Active') {
                                filteredTasks = todolistTasks.filter(task => !task.isDone)
                            } else if (todolist.filter === 'Completed') {
                                filteredTasks = todolistTasks.filter(task => task.isDone)
                            }

                            return (
                                <Grid key={todolist.id}>
                                    <Paper sx={{p: '0 20px 20px 20px'}}>
                                        <TodolistItem
                                            key={todolist.id}
                                            todolist={todolist}
                                            tasks={filteredTasks}
                                            deleteTask={deleteTask}
                                            filterTask={changeFilter}
                                            createTask={createTask}
                                            changeTaskStatus={changeTaskStatus}
                                            deleteTodolist={deleteTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    )
}

