import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EspType } from '../../types/espTypes';

const initialState: EspType = {
    esp_code: 0
};
  
const espSlice = createSlice({
    name: 'especialidade',
    initialState,
    reducers: {
      setEspCode: (state, action: PayloadAction<EspType['esp_code']>) => {
        state.esp_code = action.payload;
      },
      clearEspCode: (state, action: PayloadAction<EspType['esp_code']>) => {
        state.esp_code = 0
      }
    },
});

export const { setEspCode, clearEspCode } = espSlice.actions;
export default espSlice.reducer;