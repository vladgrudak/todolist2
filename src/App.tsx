import './App.css'
import {TodolistItem} from './TodolistItem.tsx';
import {useReducer, useState} from 'react';
import {v1} from 'uuid';
import {CreateItemForm} from './CreateItemForm.tsx';

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {containerSx} from './TodolistItem.styles.ts';
import {NavButton} from './NavButton.ts';

import {createTheme, ThemeProvider} from '@mui/material/styles'

import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC, createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from './model/todolists-reducer.ts';
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from './model/tasks-reducer.ts';

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

    // BLL
    const todolistId1 = v1()
    const todolistId2 = v1()
    // const [tasks, setTasks] = useState<TasksState>({
    //     [todolistId1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: 'Помыться', isDone: true},
    //         {id: v1(), title: 'Побриться', isDone: true},
    //         {id: v1(), title: 'Спать завалиться', isDone: false},
    //     ]
    // })

    const initialTodolistsState: Todolist[] = [
        {id: todolistId1, title: 'What to do', filter: 'All'},
        {id: todolistId2, title: 'What to learn', filter: 'All'},
    ]

    const initialTasksState: TasksState = {
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
    }

    // UseReducer
    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, initialTodolistsState)
    const [tasks, dispatchTasks] = useReducer(tasksReducer, initialTasksState)
    
    // CRUD tasks
    const createTask = (todolistId: string, taskName: string) => {
        const action = createTaskAC({todolistId, title: taskName})
        dispatchTasks(action)
    }
    const deleteTask = (todolistId: string, taskId: string) => {
        const action = deleteTaskAC({todolistId, taskId})
        dispatchTasks(action)
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const action = changeTaskStatusAC({todolistId, taskId, isDone})
        dispatchTasks(action)
    }
    const changeTaskTitle = (todolistId: string, title: string, taskId: string) => {
        const action = changeTaskTitleAC({todolistId, taskId, title})
        dispatchTasks(action)
    }

    //CRUD todolist
    const changeFilter = (todolistId: string, filter: Filter) => {
        dispatchTodolists(changeTodolistFilterAC({id: todolistId, filter}))
    }
    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        dispatchTodolists(action)
        dispatchTasks(action)
    }
    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
        // setTasks({...tasks, [action.payload.id]: []})
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchTodolists(changeTodolistTitleAC({id: todolistId, title}))
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
                            const todolistTasks = tasks[todolist.id]
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

