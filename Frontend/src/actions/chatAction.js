import { axiosInstance as axios } from '../utils/axiosInstance';
import {
  ALL_CHAT_REQUEST,
  ALL_CHAT_SUCCESS,
  ALL_CHAT_FAIL,
  ACCESS_CHAT_REQUEST,
  ACCESS_CHAT_SUCCESS,
  ACCESS_CHAT_FAIL,
} from '../constants/chatConstant';

export const getAllChats = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CHAT_REQUEST });
    const { data } = await axios.get('/api/chats');
    dispatch({ 
      type: ALL_CHAT_SUCCESS,
      payload: data.chats 
    });
  } catch (error) {
    dispatch({
      type: ALL_CHAT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const accessChat = (userId) => async (dispatch) => {
  try {
    dispatch({ type: ACCESS_CHAT_REQUEST });
    const { data } = await axios.post('/api/chat', { userId });
    console.log(data);
    dispatch({ type: ACCESS_CHAT_SUCCESS, payload: data });
    return data.chat;
  } catch (error) {
    dispatch({
      type: ACCESS_CHAT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    return { error };
  }
};
