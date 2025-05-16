import {Button} from './Button.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type Props = {
    onCreateItem: (title: string) => void,
}

export const CreateItemForm = ({onCreateItem} : Props) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string|null>(null)

    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Your input is empty')
            // setTaskTitle('')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.target.value)
    }

    const createItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                onChange={changeItemTitleHandler}
                onKeyDown={createItemOnEnterHandler}
            />
            <Button title={'+'} onClick={() => createItemHandler()}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};