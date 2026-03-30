import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type NavigationTab = "search" | "settings" | "profile"

interface NavigationState {
  activeTab: NavigationTab
}

const initialState: NavigationState = {
  activeTab: "search",
}

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNavigation(state, action: PayloadAction<NavigationTab>) {
      state.activeTab = action.payload
    },
    resetNavigation(state) {
      state.activeTab = "search"
    },
  },
})

export const { setNavigation, resetNavigation } = navigationSlice.actions
export default navigationSlice.reducer
