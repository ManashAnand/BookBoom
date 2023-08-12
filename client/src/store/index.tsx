import { configureStore} from '@reduxjs/toolkit'
import UserSlice from '../Slice/UserSlice'
import BookSlice from '../Slice/BookSlice';

const store = configureStore({
    reducer:{
        user: UserSlice,
        books: BookSlice
    }
})

export default  store;