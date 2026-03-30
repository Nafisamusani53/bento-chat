import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateUserAbout, updateUserAvatar, updateUserName } from '../thunks/ProfileThunks';
import { LoadingState, ProfileState } from '@/type';



const initialState: ProfileState = {
  id: '',
  username: '',
  email: '',
  avatar: 'https://api.dicebear.com/5.x/initials/svg?seed=User',
  about: '',
  status: 'idle',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileState>) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar ?? '';
      state.about = action.payload.about ?? '';
    },

    // updateAvatar(state, action: PayloadAction<string>) {
    //   state.avatar = action.payload;
    // },

    // updateName(state, action: PayloadAction<string>) {
    //   state.username = action.payload;
    // },

    // updateAbout(state, action: PayloadAction<string>) {
    //   state.about = action.payload;
    // },

    deleteProfile(state) {
      state.id = '';
      state.username = '';
      state.email = '';
      state.avatar = 'https://api.dicebear.com/5.x/initials/svg?seed=User';
      state.about = '';
    },
  },

  extraReducers : (builder) => {
      builder

      // update username
      .addCase(updateUserName.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.username = action.payload
      })
      .addCase(updateUserName.rejected, (state) => {
        state.status = "failed"
      })

      // update about
      .addCase(updateUserAbout.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateUserAbout.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.about = action.payload
      })
      .addCase(updateUserAbout.rejected, (state) => {
        state.status = "failed"
      })

      // update avatar
      .addCase(updateUserAvatar.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.avatar = action.payload
      })
      .addCase(updateUserAvatar.rejected, (state) => {
        state.status = "failed"
      })
    }
});

export const {
  setProfile,
  // updateAvatar,
  // updateName,
  // updateAbout,
  deleteProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
