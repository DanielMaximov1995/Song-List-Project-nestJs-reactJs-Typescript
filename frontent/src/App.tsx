import {useState , useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Box , Typography} from '@mui/material';
import { Song } from './types/Song';


const App = () => {
  const [songs, setSongs] = useState<Song[]>([])

  useEffect(() => {
    const getSongs = async () => {
      const data = await fetch("http://localhost:5000/songs")
      const json = await data.json()
      setSongs(json);
    }

    getSongs()
  }, [])
  

  return (
    <div>
      <ul>
        {
          songs.map((item) => (
            <li key={item.id}>
                {item.songName}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
