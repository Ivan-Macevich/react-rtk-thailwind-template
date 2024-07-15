import { RootState } from '../../store';

export const selectProfile = (state: RootState) => state.user.profile;
export const selectAvatarUrl = (state: RootState) => state.user.profile?.avatar;
