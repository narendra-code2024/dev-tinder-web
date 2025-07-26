import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
	name: "requests",
	initialState: null,
	reducers: {
		addRequests: (state, action) => action.payload,
		clearRequests: () => null,
	},
});

export const { addRequests, clearRequests } = requestSlice.actions;

export default requestSlice.reducer;
