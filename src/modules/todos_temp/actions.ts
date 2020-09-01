import {createAction} from "typesafe-actions";

export const ADD_TODO = 'todos_temp/ADD_TODO' as const;
export const TOGGLE_TODO = 'todos_temp/TOGGLE_TODO';
export const REMOVE_TODO = 'todos_temp/REMOVE_TODO';

let nextId = 1;

export const addTodo = (text: string) => ({
    type: ADD_TODO,
    payload: {
        id: nextId++,
        text
    }
});

export const toggleTodo = createAction(TOGGLE_TODO)<number>();
export const removeTodo = createAction(REMOVE_TODO)<number>();