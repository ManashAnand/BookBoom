import axios from "axios";
import Card from "../Component/Card";
import  { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { changeData } from "../Slice/BookSlice";

const Homepage = () => {
  interface Book {
    id: number;
    name: string;
    descp: string;
    author: string;
    cover: string;
  }

  interface RootState {
    books: Book[]; 
  }
  


  const books = useSelector((state:RootState) => state.books )
console.log("from mainpage")
console.log(books)
  const dispatch = useDispatch();


  useEffect(() => {
    getData();  
  }, []);

  // useEffect(() => {
  //   getData();
  // },[books])

  const getData = async () => {
    try {
        const {data} = await axios.get('http://localhost:8800/');
        console.log(data);
        // setBooks(data);
        dispatch(changeData(data))
        
    } catch (error) {
        console.log(error)
    }
};

  return (
    <>
      <div className="bg-slate-700 p-2">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4  bg-slate-700">
          {books.map((item: Book) => {
            return (
              <>
                <Card item={item} key={item.id} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Homepage;
