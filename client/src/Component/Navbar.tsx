
import { NavLink } from "react-router-dom";
import mainLogo from "../assets/mainLogo.png";
import { useSelector,useDispatch } from "react-redux";
import { doLogout } from "../Slice/UserSlice";
import axios from "axios";
import { changeData } from "../Slice/BookSlice";

const Navbar = () => {

  const UserData = useSelector((state:any) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
      dispatch(doLogout());
  };

  const debounce = (cb: (...args: string[]) => void, delay = 2500) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
    return (...args: string[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      timeoutId = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };
  

  const handleSearch = debounce( async (value:string) => {
    const {data} = await axios.post('http://localhost:8800/search',{value});
    console.log(data);
    dispatch(changeData(data));

  })

  
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to="/" className="flex items-center">
            <img src={mainLogo} className="h-8 mr-3" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              BookBoon
            </span>
          </NavLink>
          <div className="flex md:order-2  min-w-full justify-center items-center mt-4 md:mt-0">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className=" text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4  focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1 "
            >
              <span className="sr-only">Search</span>
            </button>
            <div className="relative  md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                // value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <div
            className="items-center justify-between  w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <div className="relative mt-3 md:">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/post"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Create Post
                </NavLink>
              </li>
              {!UserData?.LoginData?.email && (
                <>
                  <li>
                    <NavLink
                      to="/Login"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}

              <li>
                {UserData?.LoginData?.email && (
                  <>
                    <img
                      className="w-10 h-10 rounded-full cursor-pointer"
                      src={`http://localhost:8800/${UserData?.LoginData?.profilePic}`}
                      onClick={() => handleLogout()}
                      alt="Rounded avatar"
                    />
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
