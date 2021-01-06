import * as actionTypes from './actionTypes';
import axios from '../../axios-post';

export const setUsers = (users) => {
    return {
        type: actionTypes.SET_USERS,
        users: users
    }

}

export const fetchUsers = () => {
    return dispatch => {
        axios.get('users')
        .then(response => {
            dispatch(setUsers(response.data));
        })
        .catch(error => {

        })
    }
}

export const setUserDetail = (userDetail) => {
    return {
        type: actionTypes.SET_USER_DETAIL,
        userDetail: userDetail
    }

}

export const fetchUserDetail = (userId) => {
    return dispatch => {
        axios.get('users/' + userId)
        .then(response => {
            dispatch(setUserDetail(response.data));
        })
        .catch(error => {

        })
    }
}
