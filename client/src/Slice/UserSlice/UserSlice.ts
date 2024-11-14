import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../types/userTypes';

const initialState: UserType = {
  tipo: '',
  email: '',
  senha: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<UserType['tipo']>) => {
      state.tipo = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setSenha: (state, action: PayloadAction<string>) => {
      state.senha = action.payload;
    },
    clearUser: (state) => {
      state.tipo = '';
      state.email = '';
      state.senha = '';
    },
  },
});

export const { setUserType, setEmail, setSenha, clearUser } = userSlice.actions;
export default userSlice.reducer;