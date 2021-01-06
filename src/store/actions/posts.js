import * as actionTypes from './actionTypes';
import axios from '../../axios-post';

export const setPosts = (posts) => {
    return {
        type: actionTypes.SET_POSTS,
        posts: posts
    }

}

export const fetchPosts = () => {
    return dispatch => {
        axios.get('posts')
        .then(response => {
            dispatch(setPosts(response.data));
        })
        .catch(error => {

        })
    }
}

export const setPostDetail = (postDetail) => {
    return {
        type: actionTypes.SET_POST_DETAIL,
        postDetail: postDetail
    }

}

export const fetchPostsDetail = (postId) => {
    return dispatch => {
        axios.get('posts/' + postId + '/comments')
        .then(response => {
            dispatch(setPostDetail(response.data));
        })
        .catch(error => {

        })
    }
}
