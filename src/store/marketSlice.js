import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cart: {},
    totalPrice: 0
}

const marketSlice = createSlice({
    name: 'market',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const {name, price} = action.payload
            state.cart[name] = price;
            state.totalPrice += price;
        },
        removeProduct: (state, action) => {
            if (state.cart[action.payload]) state.totalPrice -= state.cart[action.payload]
            delete state.cart[action.payload]
        },
        addToTotal: (state, action) => {
            state.totalPrice += action.payload;
        },
        subFromTotal: (state, action) => {
            state.totalPrice -= action.payload
        }
    }
})
export const {addProduct, removeProduct, addToTotal, subFromTotal} = marketSlice.actions;
export default marketSlice.reducer;