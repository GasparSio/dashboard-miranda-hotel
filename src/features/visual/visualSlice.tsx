import { createSlice } from "@reduxjs/toolkit";

export const visualSlice = createSlice({
    name: 'visual',
    initialState: {
        width: '75%',
    },
    reducers: {
        incrementWidthSupNav: (state, action) => {
            state.width = '100%'
        },
        decrementWidthSupNav: (state, action) => {
            state.width = '75%'
        },
        incrementWidthLeftNav: (state, action) => {
            state.width = '30%'
        },
        decrementWidthLeftNav: (state, action) => {
            state.width = '0%'
        },
    },
})

export const { incrementWidthSupNav, decrementWidthSupNav, incrementWidthLeftNav, decrementWidthLeftNav } = visualSlice.actions;

export default visualSlice.reducer;
