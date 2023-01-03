import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
    mode: JSON.parse(localStorage.getItem("darkMode")) || false,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        setTheme(state, actions) {
            state.mode = !state.mode;
            localStorage.setItem('darkMode', JSON.stringify(state.mode)); 
        }
    }
})

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;