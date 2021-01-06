import * as actionTypes from '../actions/actionTypes';
const initialState = {
    posts: null,
    postDetail: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_POSTS:
            return {
                ...state,
                posts: action.posts
            }

        case actionTypes.SET_POST_DETAIL:
            return {
                ...state,
                postDetail: action.postDetail
            }
        default:
            return state;
    }
};

export default reducer;