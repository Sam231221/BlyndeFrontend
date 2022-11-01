import {createSlice} from '@reduxjs/toolkit'

 
export const UserLikeSlice = createSlice({
    name:"UserList",
    initialState:{
        loading: false,
        error: false,
        likes: 0,
    },
    reducers:{
        USER_LIKE_ADD_REQUEST:(state, action) =>{
            return {...state,
             loading:true}
        },
        USER_LIKE_ADD_SUCCESS:(state, action) =>{
            return {...state,
                loading:false,
                likes:action.payload
            }
        },
        USER_LIKE_FAIL:(state, action) =>{
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        },

    }
})

export const {USER_LIKE_ADD_REQUEST, USER_LIKE_ADD_SUCCESS, USER_LIKE_FAIL} =UserLikeSlice.actions
export default UserLikeSlice.reducer 