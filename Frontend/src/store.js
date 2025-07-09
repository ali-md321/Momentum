import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from 'redux-thunk';
import { followUserReducer, forgotPasswordReducer, searchUserReducer, showUserDetailsReducer, userAuthReducer } from "./reducers/userReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { addCommentReducer, createAndDeletePostReducer, homePostsReducer, likeUnlikeReducer, saveTogglePostReducer, singlePostReducer } from "./reducers/postReducer";
import { getAllChatsReducer } from "./reducers/chatReducer";

const reducers = combineReducers({
    user : userAuthReducer,
    post : createAndDeletePostReducer,
    userDetails : showUserDetailsReducer,
    singlePost : singlePostReducer,
    homePosts : homePostsReducer,
    followUser : followUserReducer,
    addComment : addCommentReducer,
    likeUnlike : likeUnlikeReducer,
    saveTogglePost : saveTogglePostReducer,
    searchUsers : searchUserReducer,
    allChats : getAllChatsReducer,
    forgotPassword : forgotPasswordReducer
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;