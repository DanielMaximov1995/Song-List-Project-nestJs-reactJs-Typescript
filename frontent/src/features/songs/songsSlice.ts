import { createSlice , PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../types/Type';

// Define the initial state for the songs slice
interface SongsState {
  songs: Song[];
  isLoading: boolean;
}

const initialState: SongsState = {
  songs: [],
  isLoading: false,
};

// Redux slice for songs
const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    // Add a new song to the state
    addSong: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
    },
    // Update an existing song in the state
    updateSong: (state, action: PayloadAction<Song>) => {
        return {
          ...state,
          songs: state.songs.map((song) =>
            action.payload.id === song.id ? action.payload : song
          ),
        };
      },
      
    // Delete a song from the state by Id
    deleteSong: (state, action: PayloadAction<number>) => {
      state.songs = state.songs.filter((song) => song.id !== action.payload);
    },

    // Set the songs array in the state with a new array of songs
    setSongs: (state, action: PayloadAction<Song[]>) => {
        return {
          ...state,
          songs: action.payload,
        };
      },

    // Toggle the isLoading flag to indicate data loading status
    setLoading: (state) => {
        return{...state,
            isLoading : !state.isLoading
        }
    }
  },
});

// Export the action creators and reducer from the slice
export const { addSong, updateSong, deleteSong , setSongs , setLoading } = songsSlice.actions;
export default songsSlice.reducer;