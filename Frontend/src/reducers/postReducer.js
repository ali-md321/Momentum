import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, CLEAR_ERRORS, CREATE_POST_FAIL,CREATE_POST_REQUEST,CREATE_POST_SUCCESS, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_SUCCESS,LIKE_UNLIKE_FAIL,LIKE_UNLIKE_REQUEST, LIKE_UNLIKE_SUCCESS, SAVETOGGLE_POST_FAIL, SAVETOGGLE_POST_REQUEST, SAVETOGGLE_POST_SUCCESS, SHOW_HOMEPOSTS_FAIL, SHOW_HOMEPOSTS_REQUEST, SHOW_HOMEPOSTS_SUCCESS, SINGLE_POST_FAIL, SINGLE_POST_REQUEST, SINGLE_POST_SUCCESS } from "../constants/postConstant"

export const createAndDeletePostReducer = (state ={ isLoading : true,post : null},{type,payload}) => {

    switch(type){
        case CREATE_POST_REQUEST :
        case DELETE_POST_REQUEST :
            return {
                isLoading : true,
                post : null,
            }
        case CREATE_POST_SUCCESS :
            return {
                ...state,
                isLoading : false,
                message : payload.message,
                post : payload.post
            }
        case CREATE_POST_FAIL :
        case DELETE_POST_FAIL:
            return {
                isLoading : false,
                post : null,
                error : payload
            }
        case DELETE_POST_SUCCESS:
            return {
                isLoading : false,
                post : null,
                message : payload
            }
        case CLEAR_ERRORS : 
                    return {
                        ...state,
                        error : null
                    }
        default : return state;
    }
}

export const singlePostReducer = (state = {isLoading : true,singlePost : null},{type,payload})=> {

    switch(type){
        case SINGLE_POST_REQUEST :
            return {
                isLoading : true,
                singlePost : null
            }
        case SINGLE_POST_SUCCESS:
            return {
                isLoading : false,
                singlePost : payload
            }
        case SINGLE_POST_FAIL:
            return {
                isLoading:false,
                singlePost : null
            }
        default : return state;
    }
}

export const homePostsReducer = (state = {isLoading : true,homePosts : null},{type,payload}) =>{

    switch(type){
        case SHOW_HOMEPOSTS_REQUEST :
            return {
                ...state,
                isLoading : true,
            }
        case SHOW_HOMEPOSTS_SUCCESS:
            return {
                ...state,
                isLoading:false,
                homePosts: payload
            }
        case SHOW_HOMEPOSTS_FAIL :
            return {
                isLoading:false,
                homePosts : null
            }
        default : return state;
    }
}

export const addCommentReducer = (state = {isLoading : true},{type,payload}) => {
    switch(type){
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                isLoading : false
            }
        case ADD_COMMENT_SUCCESS:
            return {
                isLoading : false,
                message : payload
            }
        case ADD_COMMENT_FAIL:
            return {
                ...state,
                isLoading : false,
                error : payload,
            }
        default : return state;
    }
}

export const likeUnlikeReducer = (state={},{type,payload}) => {
    switch(type){
        case LIKE_UNLIKE_REQUEST :
            return {
                ...state,
                isLoading : true,
            }
        case LIKE_UNLIKE_SUCCESS:
            return{
                isLoading : false,
                message : payload
            }
        case LIKE_UNLIKE_FAIL:
            return{
                ...state,
                isLoading :false,
                error : payload
            }
        default : return state
    }
}

export const saveTogglePostReducer = (state={},{type,payload}) =>{
    switch(type){
        case SAVETOGGLE_POST_REQUEST :
            return {
                ...state,
                isLoading : true,
            }
        case SAVETOGGLE_POST_SUCCESS:
            return{
                isLoading : false,
                message : payload
            }
        case SAVETOGGLE_POST_FAIL:
            return{
                ...state,
                isLoading :false,
                error : payload
            }
        default : return state
    }
}
