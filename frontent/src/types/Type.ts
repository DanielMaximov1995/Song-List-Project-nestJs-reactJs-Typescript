export type Song = {
    id ?: number;
    songName : string;
    band : string;
    year : number
}

export type Colors = {
    primary:string;
    success: string;
    error : string;
    warning : string
}

export type ButtonStyledProps = {
    regular?: boolean;
    variant?: 'primary' | 'error' | 'warning' | 'success';
    fullWidth?: boolean
  };