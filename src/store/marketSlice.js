import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
    cart: {},
    totalPrice: 0
};

const marketSlice = createSlice({
    name: 'market',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const {name, price, isMonthly} = action.payload;
            state.cart[name] = {price: price, isMonthly: isMonthly};
            state.totalPrice += price;
        },
        removeProduct: (state, action) => {
            if (state.cart[action.payload]) state.totalPrice -= state.cart[action.payload].price;
            delete state.cart[action.payload];
        },
        addToTotal: (state, action) => {
            state.totalPrice += action.payload;
        },
        subFromTotal: (state, action) => {
            state.totalPrice -= action.payload;
        },
        clearCart: (state) => {
            state.cart = {};
            state.totalPrice = 0;
        }
    }
});
export const {addProduct, removeProduct, addToTotal, subFromTotal, clearCart} = marketSlice.actions;
export const hasMonthlySubscription = createSelector(
    (state => state.cart.cart),
    cart => Object.values(cart).some(item => item.isMonthly));
export const monthlySubsPrice = createSelector((state => state.cart), cart => {
    let price = 0;
    Object.values(cart.cart).forEach(item => {
            if (item.isMonthly) price += item.price;
        }
    );
    return price;
});
export const productInCart = createSelector([state => state.cart.cart, (state, itemName) => itemName], (cart, itemName) =>
    !!cart?.[itemName]
)

export default marketSlice.reducer;
