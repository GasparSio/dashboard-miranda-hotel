import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const apiBaseUrl = import.meta.env.VITE_API_URL;


export const userLogin = createAsyncThunk(
    'login/user', 
    async (data: loginInterface)=> {
        try {
            const response = (await fetch(
                `${apiBaseUrl}/login`, {
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
                if(!response.ok){
                    throw new Error(`${response.status}`)
                }else{
                    const dataResponse = await response.json()
                    localStorage.setItem('token', dataResponse.token)
                    return dataResponse;
                }
        } catch (error) {
            throw new Error(`${error}`)
        }
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
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
        }
    },
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
        })
    }
})

export default loginSlice.reducer;
export const { resetStatus } = loginSlice.actions;