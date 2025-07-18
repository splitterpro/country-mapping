import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';


interface CountriesState {
  countries: any[];
}

const initialState: CountriesState = {
  countries: [],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, { payload }: PayloadAction<any>) => {
      state.countries = payload
    },
  },
});

export const fetchCountries = (): AppThunk => async (dispatch) => {
  try {
    const response = await fetch('https://restcountries.com/v2/all?fields=name,region,flag');
    if (!response.ok) throw new Error('Failed to fetch countries');

    const data = await response.json();
    dispatch(setCountries(data));
  } catch (error) {
    console.error('Fetch countries failed:', error);
  }
};

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer; 