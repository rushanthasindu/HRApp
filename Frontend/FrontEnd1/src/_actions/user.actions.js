import { userService } from '../_services/';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout
};

function login(username, password){
    return dispatch => {
        let apiEndpoint = '/login';
        let payload = {
            username: username,
            password: password
        }
        userService.post(apiEndpoint, payload)
        .then((response)=>{
            console.log(response.data);
            if (response.data.success) {
                localStorage.setItem('userId', response.data.userInfo._id);
                localStorage.setItem('auth', response.data.success);
                localStorage.setItem('userRole', response.data.userInfo.role);
                dispatch(setUserDetails(response.data));
                history.push('/home');
            } else {
                history.push('/login');
            }
        }).catch((error) => {
            dispatch(setError(error));
        })
    };
}

function logout(){
    return dispatch => {
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        dispatch(logoutUser());
        history.push('/');
    }
}

export function setUserDetails(user){
    return{
        type: "LOGIN_SUCCESS",
        auth: user.success,
        userInfo: user.userInfo
    }
}

export function setError(error) {
    return {
        type: "APPLICATION_ERROR",
        err: error,
    }
}

export function logoutUser(){
    return{
        type: "LOGOUT_SUCCESS",
        auth: false,
        token: ''
    }
}