import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    premium: false,
    expenses: {},
}

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: initialExpenseState,
    reducers: {
        storeExpense : (state, actions) => {
            state.expenses = actions.payload;
            let expenseTotal = 0
            state.expenses.forEach(element => {
                expenseTotal = expenseTotal + Number(element.amount);
            });
            if(expenseTotal > 10000){
                state.premium = true;
            }

            if(expenseTotal < 10000){
                state.premium = false;
            }
        },
    },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
