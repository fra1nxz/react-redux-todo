import { createSlice,  } from '@reduxjs/toolkit'; 
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
}

const loadTodosFromLocalStorage = (): Todo[] => {
    try {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (err) {
        console.error('Ошибка загрузки из localStorage', err);
        return [];
    }
};

const initialState: TodoState = {
    todos: loadTodosFromLocalStorage(),
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {

        addTodo: {
            reducer: (state, action: PayloadAction<Todo>) => {
                state.todos.push(action.payload);
            },
            prepare: (text: string) => ({
                payload: {
                    id: Date.now(), 
                    text,
                    completed: false, 
                },
            }),
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
    }
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
