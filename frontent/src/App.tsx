import {useState , useEffect} from 'react';
import { Box , Typography , Table , TableBody , TableCell , TableContainer , TableHead , TableRow , Paper} from '@mui/material';
import { Song } from './types/Song';
import { BoxContainer, BoxTableContainer , FlexBox, TableCellBody, TableCellHeader, TableRowBody , ButtonStyled } from './components/Styled Components';
import TableData from './components/TableData';

const App = () => {
  const [songs, setSongs] = useState<Song[]>([])

  useEffect(() => {
    const getSongs = async () => {
      try {
        const data = await fetch("http://localhost:5000/songs");
        const json = await data.json();
        setSongs(json);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    getSongs();
  }, []);
  

  return (
    <BoxContainer>
      <FlexBox>
        <Typography variant='h1' sx={{ textAlign : 'center' , fontSize : '40px' }}>My Playlist Songs</Typography>
        <ButtonStyled>Add New Song</ButtonStyled>
      </FlexBox>
      <TableData songs={songs}/>

    </BoxContainer>
  )
}

export default App
