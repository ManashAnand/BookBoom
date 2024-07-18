import { useNavigate } from "react-router-dom";

interface Book {
  id: number;
  name: string;
  descp: string;
  author: string;
  cover: string;
}

interface CardProps {
  item: Book;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        // onClick={() => navigate(`/${item?.id}`)}
        key={item?.id}
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={ item?.cover == "" ? 'https://picsum.photos/seed/picsum/200/300':`http://localhost:8800/` + item?.cover }
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item?.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item?.descp.slice(0, 40) + "..."}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-200">
            {item?.author}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
