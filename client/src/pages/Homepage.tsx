import axios from "axios";
import Card from "../Component/Card";
import react, { useState,useEffect } from "react";

const Homepage = () => {
  interface Book {
    id: number;
    name: string;
    descp: string;
    author: string;
    cover: string;
  }

  const [books,setBooks] = useState([]);


  useEffect(() => {
    getData();  
  }, []);

  const getData = async () => {
    try {
        const {data} = await axios.get('http://localhost:8800/');
        console.log(data);
        setBooks(data);
        
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
