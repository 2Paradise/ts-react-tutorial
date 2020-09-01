import {deprecated, ActionType, createReducer} from "typesafe-actions";

const { createStandardAction } = deprecated;

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_BY = 'counter/INCREASE_BY';

export const increase = createStandardAction(INCREASE)();
export const decrease = createStandardAction(DECREASE)();
export const increaseBy = createStandardAction(INCREASE_BY)<number>();

type CounterState = {
    count: number;
}

const initialState: CounterState = {
    count: 0
}

// type CounterAction =
//     | ReturnType<typeof increase>
//     | ReturnType<typeof decrease>
//     | ReturnType<typeof increaseBy>
const actions = {increase, decrease, increaseBy};
type CounterAction = ActionType<typeof actions>;

// function counter(state: CounterState = initialState, action: CounterAction): CounterState {
//     switch (action.type) {
//         case "counter/INCREASE":
//             return { count: state.count + 1};
//         case "counter/DECREASE":
//             return { count: state.count - 1}
//         case "counter/INCREASE_BY":
//             return { count: state.count + action.payload}
//         default:
//             return state;
//     }
// }

// 오브젝트 맵방식의 reducer 작성
const counter = createReducer<CounterState, CounterAction>(initialState, {
   [INCREASE] : state => ({count: state.count + 1}),
   [DECREASE] : state => ({count: state.count - 1}),
   [INCREASE_BY] : (state, action) => ({count: state.count + action.payload})
});

// 메서드 체이닝 방식의 reducer 작성
// const counter = createReducer<CounterState, CounterAction>(initialState)
//     .handleAction(increase, state => ({ count: state.count + 1}))
//     .handleAction(decrease, state => ({count: state.count - 1}))
//     .handleAction.(increaseBy, (state, action) => ({
//         count: state.count + action.payload
//     }));

export default counter;