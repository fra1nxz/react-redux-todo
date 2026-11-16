import { useDispatch } from "react-redux";
import { useGetTodosQuery, type getTodoI } from "../app/todosApi";
import { removeTodo } from "../features/store/todoSlice";
import { useState } from "react";

export const todoList = () => {

    const dispatch = useDispatch()

    const { data: todos, error, isLoading } = useGetTodosQuery();
    const [compled, setCompled] = useState(false)

    const toggleTodo = (compled: boolean) => {
        setCompled(!compled)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Ошибка получения данных</div>
    }


    return (
        <>
            <ul className="get-todo__list todo-list">
                {todos?.map((todo: getTodoI) => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        <input type="checkbox" checked={todo.completed} onChange={() => (toggleTodo(compled))} />
                        <span>{todo.title}</span>
                        <button
                            className='remove-button'
                            onClick={() => dispatch(removeTodo(todo.id))}
                        >
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

