import {ChangeEvent, useState} from 'react';

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

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
       <>
           { isEditMode ? (
               <input value={title} onBlur={turnOffEditMode} onChange={changeTitleHandler} autoFocus />
           ): (
               <span onDoubleClick={turnOnEditMode}>{value}</span>
           )}
       </>
    );
};