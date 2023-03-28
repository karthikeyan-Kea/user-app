import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateUser, User } from '../../types/user';
import { USERS } from '../../constants/users';

import { RootState } from '../store';
import moment from 'moment';

interface Props {
  users: User[];
}

const initialState: Props = {
  users: USERS,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<CreateUser>) => {
      state.users.push({ ...action.payload, createdAt: moment().format() });
    },
    removeUser: (state, action: PayloadAction<number>) => {
      const allUsers = state.users;
      allUsers.splice(action.payload, 1);
      state.users = allUsers;
    },
  },
});

export const { addUser, removeUser } = usersSlice.actions;
export const usersSelector = (state: RootState) => state.users;
export default usersSlice.reducer;
