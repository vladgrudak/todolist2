import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {changeTodolistTitleAC, deleteTodolistAC} from '@/features/todolists/model/todolists-reducer';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import styles from './TodolistTitle.module.css'

type Props = {
    id: string
    title: string
}

export const TodolistTitle = ({id, title}: Props) => {
    const dispatch = useAppDispatch()

    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC({id}))
    }

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    return (
        <div className={styles.container}>
            <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/></h3>
            <IconButton onClick={deleteTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}