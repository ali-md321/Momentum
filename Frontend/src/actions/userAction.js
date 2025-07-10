import { axiosInstance as axios } from '../utils/axiosInstance';
import { CLEAR_ERRORS, CLEAR_SEARCH_RESULTS, EDIT_USER_FAIL, EDIT_USER_REQUEST, EDIT_USER_SUCCESS, FOLLOW_USER_FAIL, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_RESET, LOAD_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,RESET_PASSWORD_FAIL,RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS,SEARCH_USER_FAIL,SEARCH_USER_REQUEST,SEARCH_USER_SUCCESS,SHOW_USERDETAILS_FAIL, SHOW_USERDETAILS_REQUEST, SHOW_USERDETAILS_SUCCESS } from "../constants/userConstant.js";

import { disconnectSocket } from "../utils/socket";

export const registerUserAction = (formData) => async(dispatch) => {
    try {
        dispatch({ type : REGISTER_USER_REQUEST});

        const config = {
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
        }
        const { data } = await axios.post("/api/signup",formData,config, { withCredentials: true }); 
        dispatch({
            type : REGISTER_USER_SUCCESS,
            payload : data.user
        }) 
        return {success : true};       
    } catch (error) {
        dispatch({
            type : REGISTER_USER_FAIL,
            payload : error.response?.data?.message || error.message || "Something Went wrong"
        })
        return {success : false};       
    }
}

export const LoginUserAction = ({email,password}) => async (dispatch) =>{
    try {
        dispatch({type : LOGIN_USER_REQUEST});
        const {data} = await axios.post("/api/login",{email,password}, { withCredentials: true }); 
        dispatch({
            type : LOGIN_USER_SUCCESS,
            payload : data.user
        })
        return {success : true};
    } catch (error) {
        dispatch({
            type : LOGIN_USER_FAIL,
            payload : error.response?.data?.message || error.message
        })
        return {success : false};
    }
}

export const logoutUserAction = () => async(dispatch) => {
    try{
        await axios.get("/api/logout");
        disconnectSocket()
        dispatch({ type: LOGOUT_USER_SUCCESS });
        dispatch({ type: LOAD_USER_RESET });
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response?.data?.message || error.message
        })
    }
}

export const loadUserAction = () => async(dispatch) => {
    try{
        dispatch({type : LOAD_USER_REQUEST});
        const {data} = await axios.get(`/api/user/me`,{
            withCredentials: true 
        });
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.userDetails
        });
    }catch(error){
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response?.data?.message || error.message
        })
    }
}

export const showUserDetailsAction = (userId) => async(dispatch) => {
    try{
        dispatch({type : SHOW_USERDETAILS_REQUEST});
        const {data} = await axios.get(`/api/user/${userId}`);

        dispatch({
            type : SHOW_USERDETAILS_SUCCESS,
            payload : data.userDetails
        })

    }catch(error){
        dispatch({
            type : SHOW_USERDETAILS_FAIL,
            payload : error.response?.data?.message || error.message
        })
    }
}


export const followUserAction = (userId) => async(dispatch) => {
    try{
        dispatch({type : FOLLOW_USER_REQUEST});

        const {data} = await axios.post(`/api/follow/${userId}`);
        console.log(data.message);
        dispatch({
            type : FOLLOW_USER_SUCCESS,
            payload : {user :data.user,message : data.message}
        })
    }catch(error){
        dispatch({
            type : FOLLOW_USER_FAIL,
            payload : error.response?.data?.message || error.message
        })
    }
}

export const searchUserAction = (username) => async(dispatch) => {
    try{
        dispatch({type : SEARCH_USER_REQUEST});

        const {data} = await axios.get(`/api/search/${username}`);
        dispatch({
            type : SEARCH_USER_SUCCESS,
            payload : data.searchUsers
        })
    }catch(error){
        dispatch({
            type : SEARCH_USER_FAIL,
            payload : error.response?.data?.message || error.message
        })
    }
}

export const editUserAction = (formData) => async(dispatch) => {
    try{
        dispatch({type : EDIT_USER_REQUEST});

        const {data} = await axios.patch(`/api/user/me`,formData);
        dispatch({
            type : EDIT_USER_SUCCESS,
            payload : data.user
        })
        return{
            success: true, 
            payload: data.user
        }
    }catch(error){
        console.log(error);
        dispatch({
            type : EDIT_USER_FAIL,
            payload : error.response?.data?.message || error.message
        })
        return { success: false, error: error.response?.data?.message || error.message};
    }
}

export const clearSearchResults = () => (dispatch) => {
    dispatch({ type: CLEAR_SEARCH_RESULTS });
};
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export const forgotPasswordAction = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(
            '/api/password/forgot',
            { email },
            config
        );

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Reset Password
export const resetPasswordAction = (token, password) => async (dispatch) => {
    try {

        dispatch({ type: RESET_PASSWORD_REQUEST});

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.put(
            `/api/password/reset/${token}`,
            { password },
            config
        );

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success,
        });
        return{
            success : true
        }
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
        return{
            error :error.response.data.message,
        }
    }
};
