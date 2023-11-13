import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
    'login/user', 
    async (data: loginInterface)=> {
        const response = (await fetch(
            'http://localhost:3000/login', {
                method: "POST", 
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
            }))
            return response.json();
})

interface loginInterface{
    email: string,
    password: string
}
interface LoginState{
    initialData: loginInterface[],
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
    error: null | string,
}

const initialState: LoginState = {
    initialData: [],
    status: 'idle',
    error: null,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.status = 'pending';
        })
        builder.addCase(userLogin.rejected, (state) => {
            state.status = 'rejected';
        })
        builder.addCase(userLogin.fulfilled, (state, action,) => {
            state.status = 'fulfilled';
            state.initialData.push(action.payload);
            localStorage.setItem('token', action.payload.token)
            console.log('payload', action.payload);//{email: 'sio.gaspar@gmail.com', password: 'admin'}
            console.log('token', action.payload.token);//"JAZ21haWoyMDE1NDYzMTE5fQ.rIkh-mg6uOemjs1iDo_CPJgAOEEAhbKa21dBPHFGKhM"

        })
    }
})

export default loginSlice.reducer;