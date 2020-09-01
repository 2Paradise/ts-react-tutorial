import {ActionType, createAction, createReducer} from "typesafe-actions";

const ADD_TODO = 'todos_temp/ADD_TODO' as const;
const TOGGLE_TODO = 'todos_temp/TOGGLE_TODO';
const REMOVE_TODO = 'todos_temp/REMOVE_TODO';

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

type TodosAction =
    |ReturnType<typeof addTodo>
    |ReturnType<typeof toggleTodo>
    |ReturnType<typeof removeTodo>;

export type Todo = {
    id: number;
    text: string;
    done: boolean;
}

type TodosState = Todo[];

const initialState: TodosState = [];

const todos = createReducer<TodosState, TodosAction>(initialState, {
    [ADD_TODO] : (state, action) => state.concat({
        ...action.payload,
        done: false
    }),
    [TOGGLE_TODO]: (state, action) => state.map(
        todo => todo.id === action.payload
            ? { ...todo, done: !todo.done}
            : todo
    ),
    [REMOVE_TODO]: (state, action) => state.filter(
        todo => todo.id !== action.payload
    )
});

export default todos;