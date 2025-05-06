import {Task, TaskStatus} from './App.tsx';
import {Button} from './Button.tsx';

type Props = {
    title: string,
    tasks: Task[],
    date?: string,
    deleteTask: (tasks: Task[], taskId: number) => void,
    filterTask: (taskStatus: TaskStatus) => void,
}

export const TodolistItem = ({title, tasks, deleteTask, filterTask}: Props) => {
    const tasksList = tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <Button title={"x"} onClick={() => deleteTask(tasks, task.id)}/>
            </li>
        )
    })

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={"+"} />
            </div>
            {tasks.length === 0
                ? <p>Тасок нет</p>
                : (
                <ul>
                    {tasksList}
                </ul>
                )
            }
            <div>
                <Button title={"All"} onClick={ () => filterTask("All")}/>
                <Button title={"Active"} onClick={ () => filterTask("Active")}/>
                <Button title={"Completed"} onClick={ () => filterTask("Completed")}/>
            </div>
        </div>
    )
}