import React from 'react'
import { Song } from '../types/Type';
import { BoxTableContainer , TableCellBody, TableCellHeader, TableRowBody } from '../components/Styled Components';
import {Table , TableBody, TableContainer , TableHead , TableRow , Paper , IconButton} from '@mui/material';

const TableData = (props : { songs : Song[]; editData : (song : Song) => void }) => {
  const { songs , editData } = props

  const sortedData = [...songs].sort((a, b) => a.band.localeCompare(b.band));

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
          {sortedData?.map((song , index) => (
            <TableRowBody className={index % 2 === 0 ? 'twice' : ''} key={song.id}>
              <TableCellBody>{song.songName}</TableCellBody>
              <TableCellBody>{song.band}</TableCellBody>
              <TableCellBody>{song.year}</TableCellBody>
              <TableCellBody>
                <IconButton onClick={() => editData(song)} size='large' color='success'>✎</IconButton>
                </TableCellBody>
            </TableRowBody>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </BoxTableContainer>
  )
}

export default TableData