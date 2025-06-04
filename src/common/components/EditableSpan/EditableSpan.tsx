import {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type Props = {
    value: string
    onChange: (title: string) => void
}


export const EditableSpan = ({value, onChange}: Props) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(value)

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        setIsEditMode(false)
        onChange(title)
    }

    const turnOffEditModeOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            turnOffEditMode()
        }
    }

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <>
            {isEditMode ? (
                <TextField
                    variant="outlined"
                    value={title}
                    size={'small'}
                    onBlur={turnOffEditMode}
                    onChange={changeTitleHandler}
                    onKeyUp={turnOffEditModeOnEnter}
                    autoFocus/>
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    );
};