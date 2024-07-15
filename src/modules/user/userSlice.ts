import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findProfile } from './userThunks';
import { ProfileDto } from './userTypes';

interface UserState {
  profile: ProfileDto | null;
}

const initialState: UserState = {
  profile: null,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileDto | null>) {
      state.profile = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(findProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { setProfile } = userSlice.actions;
export const userReducer = userSlice.reducer;
