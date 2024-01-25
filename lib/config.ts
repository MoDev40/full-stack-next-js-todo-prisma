export const sekret = process.env.SEKRET_KEY as string
export const API_URL = process.env.NODE_ENV === 'production' ? 'full-stack-next-js-todo-prisma.vercel.app/api'
    : 'http://localhost:3000/api';

