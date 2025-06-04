import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task} from '@/features/todolists/model/tasks-reducer';
import {ChangeEvent} from 'react';
import {Checkbox, ListItem} from '@mui/material';
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch} from '@/common/hooks/useAppDispatch';
import {getListItemSx} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles';

type Props = {
    todolistId: string
    task: Task
}

export const TaskItem = ({todolistId, task}: Props) => {
    const dispatch = useAppDispatch()

    const deleteTaskHandler = () => {
        dispatch(deleteTaskAC({todolistId, taskId: task.id}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({todolistId, taskId: task.id, isDone: e.currentTarget.checked}))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title}))
    }

    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            </div>
            <IconButton onClick={deleteTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}