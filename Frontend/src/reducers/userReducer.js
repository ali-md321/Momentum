import {REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS,REGISTER_USER_FAIL,LOGIN_USER_REQUEST,LOGIN_USER_SUCCESS,LOGIN_USER_FAIL,LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL,LOGOUT_USER_SUCCESS,LOGOUT_USER_FAIL,SHOW_USERDETAILS_FAIL, SHOW_USERDETAILS_REQUEST, SHOW_USERDETAILS_SUCCESS,CLEAR_ERRORS, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAIL, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, SEARCH_USER_FAIL, EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAIL, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_FAIL, FOLLOW_USER_UPDATE} from '../constants/userConstant'

const intialState = {
    user : null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
}
export const userAuthReducer = (state = intialState ,{type,payload}) => {

    switch(type){
        case LOGIN_USER_REQUEST:
        case LOAD_USER_REQUEST:
        case REGISTER_USER_REQUEST:
            return {
                isLoading : true,
                isAuthenticated : false
            }
        case EDIT_USER_REQUEST:
            return{
                ...state,
                isLoading : true,
                isAuthenticated  : true,
            }    
        case LOGIN_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case EDIT_USER_SUCCESS:
            return {
                user : payload,
                isLoading : false,
                isAuthenticated: true,
                error : null
            }
        case LOGIN_USER_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                user : null,
                isLoading : false,
                isAuthenticated : false,
                error : payload
            }
        case LOAD_USER_FAIL : 
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: payload,
            }
        case LOGOUT_USER_SUCCESS:
            return{
                user : null,
                isLoading : false,
                isAuthenticated : false,
            }
        case LOGOUT_USER_FAIL:
            return {
                ...state,
                isLoading :false,
                error : payload
            }
        case EDIT_USER_FAIL:
            return{
                ...state,
                isLoading : false,
                isAuthenticated : true,
                error : payload
            }
        case CLEAR_ERRORS : 
            return {
                ...state,
                error : null
            }
        default : return state; 
    }
}

export const showUserDetailsReducer = (state = {isLoading : true,userDetails : {}} ,{type,payload} ) => {
    
    switch(type){
        case SHOW_USERDETAILS_REQUEST :
            return {
                ...state,
                isLoading : true,
            }
        case SHOW_USERDETAILS_SUCCESS :
            return {
                isLoading : false,
                userDetails : payload,
            }
        case SHOW_USERDETAILS_FAIL :
            return {
                ...state,
                isLoading : false,
                error : payload
            }
        default : return state;
    }
}

export const followUserReducer = (state = {isLoading : false,isFollowed : false}, {type,payload}) => {
    switch(type){
        case FOLLOW_USER_REQUEST :
            return {
                ...state,
                isLoading : true
            }
        case FOLLOW_USER_SUCCESS :
            return {
                message : payload.message,
                isLoading : false,
                user : payload.user
            }
        case FOLLOW_USER_FAIL :
            return {
                ...state,
                isLoading : false, 
                error : payload
            }
        case FOLLOW_USER_UPDATE :
            return {
                isFollowed : false,
                isLoading : false,
                message : payload
            }
        default : return state;
    }
}

export const searchUserReducer = (state = {isLoading:false,searchUsers : []},{type,payload}) => {
    switch(type){
        case SEARCH_USER_REQUEST :
            return {
                ...state,
                isLoading : true
            }
        case SEARCH_USER_SUCCESS :
            return {
                searchUsers : payload,
                isLoading : false,
            }
        case SEARCH_USER_FAIL :
            return {
                ...state,
                isLoading : false, 
                error : payload
            }
        case "CLEAR_SEARCH_RESULTS":
            return {
                ...state,
                searchUsers: [] 
            };
        default : return state;
    }
}

export const forgotPasswordReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: payload,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload,
            };
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
