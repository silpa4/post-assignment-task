import * as actionTypes from '../actions/actionTypes';
const initialState = {
    users: null,
    userDetail: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case actionTypes.SET_USER_DETAIL:
            return {
                ...state,
                userDetail: action.userDetail
            }  
        default:
            return state;
    }
};

export default reducer;