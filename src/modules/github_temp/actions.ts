import {GithubProfile} from "../../api/github";
import {AxiosError} from "axios";
import {createAsyncAction} from "typesafe-actions";

export const GET_USER_PROFILE = 'github_temp/GET_USER_PROFILE';
export const GET_USER_PROFILE_SUCCESS = 'github_temp/GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_ERROR = 'github_temp/GET_USER_PROFILE_ERROR';

// payload type generic 으로 설정
export const getUserProfileAsync = createAsyncAction(
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_ERROR)<undefined, GithubProfile, AxiosError>();

