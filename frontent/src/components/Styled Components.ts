
import { Box, styled, TableCell, TableRow } from '@mui/material';

export const FlexBox = styled(Box)({
    display : 'flex',
    justifyContent : 'space-between'
})

export const ButtonStyled = styled('button')({
    backgroundColor : '#000',
    padding : '16px',
    color : '#FFF' ,
    fontSize : '16px',
    border : 0,
    cursor : 'pointer',
    transition : 'all',
    transitionDuration : '300ms',
    '&:hover' : {
        opacity : 0.7,
        letterSpacing : '3px'
    }
})

export const BoxContainer = styled(Box)({
    width : '600px',
    marginLeft : 'auto',
    marginRight : 'auto',
    marginTop : '50px',
    marginBottom : '50px'
})

export const BoxTableContainer = styled(Box)({
    width : '100%',
    marginTop : '16px',
    marginBottom : '16px',
})

export const TableCellHeader = styled(TableCell)({
    color : '#FFF',
    fontSize : '20px',
    padding : '20px'
})

export const TableCellBody = styled(TableCell)({
    fontSize : '18px',
    padding : '20px',
})

export const TableRowBody = styled(TableRow)(({ twice }: { twice: boolean }) => ({
    backgroundColor: twice ? '#BBBCB6' : '#FFF',
    cursor : 'pointer',
    transition : 'all',
    transitionDuration : '300ms',
    '&:hover' : {
        opacity : 0.7
    }
  }));