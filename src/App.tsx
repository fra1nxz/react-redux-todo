import { useSelector, useDispatch } from 'react-redux'
import { addTodo, removeTodo, toggleTodo, type Todo } from './features/store/todoSlice'
import { useState } from 'react'
import React from 'react'



import './App.css'

function App() {


  const [inputValue, setInputValue] = useState('')

  const [isActive, setIsActive] = useState(false)

  const dispatch = useDispatch()
  const todos = useSelector((state: { todo: { todos: Todo[] } }) => state.todo.todos)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    dispatch(addTodo(inputValue.trim()))

    setInputValue('')

  }



  return (
    <>

      <div className="App">
        <div className="conteiner">
          <h1>Список задач</h1>
          <form id="todo-form" onSubmit={handleSubmit}>
            <label htmlFor="todo-input">Новая задача:</label>
            <div className='form__inner'>
              <div className="input__wrapper">
                <input
                  className={`form__input ${isActive ? 'active' : ''}`}
                  type="text"
                  id="todo-input"
                  placeholder="Введите задачу"
                  required
                  autoComplete="off"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setIsActive(true)}
                  onBlur={() => setIsActive(false)}
                />
              </div>
              <button
                className='form__button'
                type="submit">
                Добавить
              </button>
            </div>
          </form>
          <section className="todo-section">
            <h2 className="todo-section__title">Текущие задачи:</h2>
              <ul className="todo-list">
                {todos.map((todo: Todo) => (
                  <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <input type="checkbox" checked={todo.completed} onChange={() => dispatch(toggleTodo(todo.id))} />
                    <span>{todo.text}</span>
                    <button
                      className='remove-button'
                      onClick={() => dispatch(removeTodo(todo.id))}
                    >
                      Удалить
                    </button>
                  </li>
                ))}
              </ul>
          </section>
        </div>
      </div>
    </>
  )
}

export default App
