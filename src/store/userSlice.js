import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {
        system_id: 0,
        leos_id: "0",
        name: "Team C",
        has_ppc: 1,
        has_seo: 1,
        is_tiktok: 1,
        services: {
            ppc: 1,
            seo: 1,
            tiktok: 1,
            facebook: 1
        },
        avatar: "avatars/nFoBddlnDzpFFmLm8XP434D3DS78JYeOVYl8Xpvy.jpg"
    },
    customer: {
        bnNumber: '1',
        phoneNumber: '1',
        companyName: '1'
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setCustomer: (state, action) => {
            state.customer = action.payload
        },
        setAvatar: (state, action) => {
            state.user.avatar = action.payload
        }
    }
})
export const {setUser, setCustomer, setAvatar} = userSlice.actions;
export default userSlice.reducer;