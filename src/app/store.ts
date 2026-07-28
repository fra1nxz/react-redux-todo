import { configureStore } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'
import todoReducer from '../features/store/todoSlice'
import { todosApi } from './todosApi';

const localStorageMiddleware: Middleware<{}, any, any> = (storeApi) => (next) => (action) => {
    const result = next(action);

    const state = storeApi.getState() as RootState;

    if (state.todo && state.todo.todos) {
        localStorage.setItem('todos', JSON.stringify(state.todo.todos));
    }

    return result;
}

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        [todosApi.reducerPath]: todosApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todosApi.middleware, localStorageMiddleware),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch