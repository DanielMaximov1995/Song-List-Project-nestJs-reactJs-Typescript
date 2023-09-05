import { Box, styled, TableCell, TableRow, Theme } from '@mui/material';
import { ButtonStyledProps } from '../types/Type';


export const FlexBox = styled(Box)({
    display : 'flex',
    justifyContent : 'space-between'
})

const styleColor = {
    "primary" : '#000',
    "error" : '#F44336',
    'warning' : '#FFA726',
    'success' : '#209b24'
}

export const ButtonStyled = styled('button')(({ regular, variant, fullWidth }: ButtonStyledProps) => ({
    backgroundColor: styleColor[variant || 'primary'],
    padding: '8px 16px',
    color: '#FFF',
    fontSize: '20px',
    width: fullWidth ? '100%' : 'auto',
    textAlign : 'center',
    border: 0,
    transition: 'all',
    transitionDuration: '300ms',
    letterSpacing : '1px',
    cursor : 'pointer',
    '&:hover': {
      opacity: 0.7,
      letterSpacing: regular ? '1px' : '3px',
    },
  }));

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

export const TableRowBody = styled(TableRow)(({ theme }: { theme: Theme }) => ({
    backgroundColor: '#FFF',
    transition: 'all',
    transitionDuration: '300ms',
    '&:hover': {
      opacity: 0.7,
      backgroundColor: '#ACADA8',
    },
    '&.twice': {
      backgroundColor: '#BBBCB6',
    },
  }));
  


export const BoxForm = styled('form')({
    width:'300px',
    padding : '1rem'
})