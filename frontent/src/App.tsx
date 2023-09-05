import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { BoxContainer, FlexBox, ButtonStyled } from './components/Styled Components';
import TableData from './components/TableData';
import { RootState } from './features/store';
import { fetchSongs } from './features/songs/songsThunks';
import AddOrEdit from './components/Add or Edit';
import { Song } from './types/Type';

const App = () => {
  const { isLoading , songs } = useSelector((state: RootState) => state.songs);
  const dispatch = useDispatch();
  const [openAddOrEdit, setOpenAddOrEdit] = useState(false)
  const [editData, setEditData] = useState<Song>({
    songName: "",
    band: "",
    year: 0,
  });
  const [editable, setEditable] = useState(false)

  useEffect(() => {
    // Fetch songs data from the server when the component mounts
    dispatch(fetchSongs() as any); 
  }, [dispatch]);

  // Function to handle editing a songs data
  const handleEditData = (song : Song | null) => {
    setOpenAddOrEdit((prev) => !prev)
    setEditable(prev => !prev)
    if(song) {
      setEditData(song)
    }
  }

  // Function to handle opening a new song form
  const handleOpenNew = () => {
    setOpenAddOrEdit((prev) => !prev)
    setEditable(false)
    setEditData({
      songName: "",
      band: "",
      year: 0,
    })
  }

  // Function to handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <BoxContainer>
      <FlexBox>
        <Typography variant='h1' sx={{ textAlign: 'center', fontSize: '40px' }}>My Playlist Songs</Typography>
        <ButtonStyled onClick={() => setOpenAddOrEdit((prev : boolean) => !prev)}>Add New Song</ButtonStyled>
      </FlexBox>
      {
        isLoading ? 'Loading...' : <TableData songs={songs} editData={(song: Song) => handleEditData(song)}/>
      }
      <AddOrEdit open={openAddOrEdit} handleOpen={() => handleOpenNew()} data={editData} handleChange={handleChange} editable={editable}/>
    </BoxContainer>
  );
}

export default App;