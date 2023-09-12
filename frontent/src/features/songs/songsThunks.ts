import { AppDispatch } from "../store";
import { Song } from "../../types/Type";
import { addSong, deleteSong, setLoading, setSongs, updateSong } from "./songsSlice";

// Thunk action to fetch songs from the API
export const fetchSongs = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading()) // Set loading state to true
    const response = await fetch(`http://localhost:5000/songs`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    dispatch(setSongs(data)); // Dispatch action to set fetched songs in the store
    dispatch(setLoading()) // Set loading state to false
  } catch (error) {
    dispatch(setLoading()) // Clear loading state in case of an error
    throw new Error('Failed to fetch data');
  }
};

// Thunk action to update a song
export const fetchUpdateSong = (updatedSongData: Song) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading())
    const response = await fetch(`http://localhost:5000/songs/${updatedSongData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedSongData),
    });

    if (!response.ok) {
      throw new Error('Failed to update song');
    }

    const data = await response.json();
    dispatch(updateSong(data));
    dispatch(setLoading())
    return data
  } catch (error) {
    dispatch(setLoading()) 
    throw new Error('Failed to update song');
  }
};

// Thunk action to add a new song
export const fetchAddSong = (newSongData: Song) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading())
    const response = await fetch(`http://localhost:5000/songs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSongData),
    });

    if (!response.ok) {
      throw new Error('Failed to add song');
    }

    const data = await response.json();
    dispatch(addSong(data));
    dispatch(setLoading())
    return data
  } catch (error) {
    dispatch(setLoading())
    throw new Error('Failed to add song');
  }
};


// Thunk action to delete a song
export const fetchDeleteSong = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading())
    const response = await fetch(`http://localhost:5000/songs/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete song');
    }
    
    dispatch(setLoading())
    dispatch(deleteSong(id));
    return 'deleted !'
  } catch (error) {
    dispatch(setLoading())
    throw new Error('Failed to delete song');
  }
};