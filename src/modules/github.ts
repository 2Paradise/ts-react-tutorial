import {AxiosError} from "axios";
import {ActionType, createAsyncAction, createReducer} from "typesafe-actions";
import {getUserProfile, GithubProfile} from "../api/github";
import {Dispatch} from "redux";
import createAsyncThunk from "../lib/createAsyncThunk";
import {asyncState, AsyncState} from "../lib/reducerUtils";
import {call, put, takeEvery} from 'redux-saga/effects';

const GET_USER_PROFILE = 'github/GET_USER_PROFILE';
const GET_USER_PROFILE_SUCCESS = 'github/GET_USER_PROFILE_SUCCESS';
const GET_USER_PROFILE_ERROR = 'github/GET_USER_PROFILE_ERROR';

// payload type generic 으로 설정
export const getUserProfileAsync = createAsyncAction(
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_ERROR)<string, GithubProfile, AxiosError>();

type GithubAction = ActionType<typeof getUserProfileAsync>;

// type GithubState = {
//     userProfile: {
//         loading : boolean;
//         data: GithubProfile | null;
//         error: Error | null;
//     }
// }

type GithubState = {
    userProfile: AsyncState<GithubProfile, Error>
}

export function getUserProfileThunk(username: string){
    return async (dispatch: Dispatch) => {
        const {request, success, failure} = getUserProfileAsync;
        dispatch(request(''));
        try{
            const userProfile = await getUserProfile(username);
            dispatch(success(userProfile));
        } catch (e) {
            dispatch(failure(e));
        }
    };
}

//export function getUserProfileThunk = createAsyncThunk(getUserProfileAsync, getUserProfile);

const initialState: GithubState = {
    // userProfile: {
    //     loading: false,
    //     error: null,
    //     data: null
    // }
    userProfile : asyncState.initial()
}

const github = createReducer<GithubState, GithubAction>(initialState, {
    [GET_USER_PROFILE]: (state) => ({
        ...state,
        userProfile: asyncState.load()
    }),
    [GET_USER_PROFILE_SUCCESS]: (state, action) => ({
        ...state,
        userProfile: asyncState.success(action.payload)
    }),
    [GET_USER_PROFILE_ERROR]: (state, action) => ({
        ...state,
        userProfile: asyncState.error(action.payload)
    })
});

export default github;

function* getUserProfileSaga(action: ReturnType<typeof getUserProfileAsync.request>) {
    try {
        const userProfile = yield call(getUserProfile, action.payload);
        yield put(getUserProfileAsync.success(userProfile));
    }catch (e){
        yield put(getUserProfileAsync.failure(e));
    }
}

export function* githubSaga(){
    yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
}