import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    expenses: {},
}

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: initialExpenseState,
    reducers: {
        storeExpense : (state, actions) => {
            state.expenses = actions.payload;
        },
    },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
