import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {changeTodolistFilterAC, type Filter} from '@/features/todolists/model/todolists-reducer';
import {useAppDispatch} from '@/common/hooks/useAppDispatch';
import {containerSx} from '@/common/styles/container.styles';

type Props = {
    todolistId: string
    filter: Filter
}

export const FilterButtons = ({todolistId, filter}: Props) => {
    const dispatch = useAppDispatch()

    const changeFilterHandler = (filter: Filter) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }

    return (
        <Box sx={containerSx}>
            <Button
                variant={filter === 'All' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilterHandler('All')}>
                All
            </Button>
            <Button
                variant={filter === 'Active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilterHandler('Active')}>
                Active
            </Button>
            <Button
                variant={filter === 'Completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilterHandler('Completed')}>
                Completed
            </Button>
        </Box>
    )
}