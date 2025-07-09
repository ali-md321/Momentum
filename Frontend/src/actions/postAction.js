import { axiosInstance as axios } from '../utils/axiosInstance';
import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, CREATE_POST_FAIL,CREATE_POST_REQUEST,CREATE_POST_SUCCESS,DELETE_POST_FAIL,DELETE_POST_REQUEST,DELETE_POST_SUCCESS,LIKE_UNLIKE_FAIL,LIKE_UNLIKE_REQUEST,LIKE_UNLIKE_SUCCESS,SAVETOGGLE_POST_FAIL,SAVETOGGLE_POST_REQUEST,SAVETOGGLE_POST_SUCCESS,SHOW_HOMEPOSTS_FAIL,SHOW_HOMEPOSTS_REQUEST,SHOW_HOMEPOSTS_SUCCESS, SINGLE_POST_FAIL, SINGLE_POST_REQUEST, SINGLE_POST_SUCCESS } from "../constants/postConstant";

export const createPostAction = (formData) => async(dispatch) => {
    try{
        dispatch({type : CREATE_POST_REQUEST});

        const config = {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        }
        const {data} = await axios.post("/api/posts",formData,config);
        dispatch({
            type : CREATE_POST_SUCCESS,
            payload : data
        })
        return {success : true}
    }catch(error){
        dispatch({
            type : CREATE_POST_FAIL,
            payload : error.response?.data?.message || error.message
        })
        return {
            success : false,
            message : error.response?.data?.message || error.message
        }
    }
}

export const deletePostAction = (postId) => async(dispatch) => {
    try{
        dispatch({type : DELETE_POST_REQUEST});
        const {data} = await axios.delete(`/api/post/${postId}`);
        dispatch({
            type : DELETE_POST_SUCCESS,
            payload : data.message
        })
    }catch(error){
        dispatch({
            type : DELETE_POST_FAIL,
            payload : error.response?.data?.message || error.message
        })
    }
}

export const singlePostAction = (postId) => async(dispatch) => {
    try{
        dispatch({type : SINGLE_POST_REQUEST});
        const {data} = await axios.get(`/api/post/${postId}`);
        dispatch({
            type : SINGLE_POST_SUCCESS,
            payload : data.singlePost
        })

    }catch(error){
        dispatch({
            type : SINGLE_POST_FAIL,
            payload : error.response?.data?.message || error.message
        })
    }
}

export const homePostsAction = () => async(dispatch) => {
    try{
        dispatch({type : SHOW_HOMEPOSTS_REQUEST})
        const {data} = await axios.get("/api/homeposts");
        console.log(data.homePosts);
        dispatch({
            type : SHOW_HOMEPOSTS_SUCCESS,
            payload : data.homePosts
        })
    }catch(error){
        dispatch({
            type : SHOW_HOMEPOSTS_FAIL,
            payload : error.response?.data?.message || error.message
        })
    }
}

export const addCommentAction = (comment,postId) => async(dispatch) => {
    try{
        dispatch({type : ADD_COMMENT_REQUEST});

        const{data} = await axios.post(`/api/comment/${postId}`,{comment});
        dispatch({
            type : ADD_COMMENT_SUCCESS,
            payload : data.comment
        })
        return {
            comment : data.comment
        }
    }catch(error){
        dispatch({
            type : ADD_COMMENT_FAIL,
            payload : error.response?.data?.message || error.message
        })
    }
}

export const likeUnlikeAction = (postId) => async(dispatch) => {
    try{
        dispatch({type : LIKE_UNLIKE_REQUEST});

        const{data} = await axios.post(`/api/like/${postId}`);
        console.log(data.message);
        dispatch({
            type : LIKE_UNLIKE_SUCCESS,
            payload : data.message
        })
    }catch(error){
        dispatch({
            type : LIKE_UNLIKE_FAIL,
            payload : error.response?.data?.message || error.message
        })
    }
}

export const saveTogglePostAction = (postId) => async(dispatch) => {
    try{
        dispatch({type : SAVETOGGLE_POST_REQUEST});

        const{data} = await axios.post(`/api/save/${postId}`);
        console.log(data.message);
        dispatch({
            type : SAVETOGGLE_POST_SUCCESS,
            payload : data.message
        })
    }catch(error){
        dispatch({
            type : SAVETOGGLE_POST_FAIL,
            payload : error.response?.data?.message || error.message
        })
    }
}


