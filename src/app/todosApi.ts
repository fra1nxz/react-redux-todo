import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface getTodoI {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/'}),
    endpoints: (builder) => ({
        getTodos: builder.query<getTodoI[], void>({
            query: () => 'todos?_limit=10',
        })
    })
})

export const {useGetTodosQuery} = todosApi;