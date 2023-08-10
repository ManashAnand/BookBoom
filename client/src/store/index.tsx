import { configureStore} from '@reduxjs/toolkit'
import UserSlice from '../Slice/UserSlice'

const store = configureStore({
    reducer:{
        user: UserSlice
    }
})

export default  store;