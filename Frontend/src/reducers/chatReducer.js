import { ALL_CHAT_FAIL, ALL_CHAT_REQUEST, ALL_CHAT_SUCCESS, CLEAR_ERRORS } from "../constants/chatConstant";

export const getAllChatsReducer = (state = {isLoading : true,allChats : [],error : null},{type,payload}) => {
    switch(type){
        case ALL_CHAT_REQUEST :
            return {
                ...state,
                isLoading : true,
            }
        case ALL_CHAT_SUCCESS:
            return {
                isLoading : false,
                allChats : payload,
            }
        case ALL_CHAT_FAIL:
            return {
                ...state,
                isLoading : false,
                error : payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                isLoading : false,
                error : null 
            }
        default :return state;
    }
}