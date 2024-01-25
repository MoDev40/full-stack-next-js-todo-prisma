export const sekret = process.env.SEKRET_KEY as string
export const API_URL = process.env.NODE_ENV === 'production' ? ''
    : 'http://localhost:3000/api';

