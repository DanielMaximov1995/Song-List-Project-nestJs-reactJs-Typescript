import React from 'react'
import { Song } from '../types/Song';
import { BoxTableContainer , TableCellBody, TableCellHeader, TableRowBody } from '../components/Styled Components';
import {Table , TableBody, TableContainer , TableHead , TableRow , Paper} from '@mui/material';

const TableData = ({ songs } : { songs : Song[] }) => {

  return (
    <BoxTableContainer>
        <TableContainer component={Paper}>
      <Table sx={{ maxWidth : '100%' }} aria-label="simple table">
        <TableHead sx={{ bgcolor : '#000' }}>
          <TableRow>
            <TableCellHeader>Song Name</TableCellHeader>
            <TableCellHeader>Band</TableCellHeader>
            <TableCellHeader>Year</TableCellHeader>
            <TableCellHeader>Edit</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song , index) => (
            <TableRowBody twice={index % 2 === 0} key={song.id}>
              <TableCellBody>{song.songName}</TableCellBody>
              <TableCellBody>{song.band}</TableCellBody>
              <TableCellBody>{song.year}</TableCellBody>
              <TableCellBody>{song.year}</TableCellBody>
            </TableRowBody>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </BoxTableContainer>
  )
}

export default TableData