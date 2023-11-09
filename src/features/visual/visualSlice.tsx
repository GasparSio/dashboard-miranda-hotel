import { createSlice } from "@reduxjs/toolkit";

export const visualSlice = createSlice({
    name: 'visual',
    initialState: {
        width: '75%',
    },
    reducers: {
        incrementWidthSupNav: (state) => {
            state.width = '100%'
        },
        decrementWidthSupNav: (state) => {
            state.width = '75%'
        },
        incrementWidthLeftNav: (state) => {
            state.width = '30%'
        },
        decrementWidthLeftNav: (state) => {
            state.width = '0%'
        },
    },
})

export const { incrementWidthSupNav, decrementWidthSupNav, incrementWidthLeftNav, decrementWidthLeftNav } = visualSlice.actions;

export default visualSlice.reducer;
