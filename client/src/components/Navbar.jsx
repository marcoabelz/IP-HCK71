import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      {/* component */}
      <nav className="relative select-none bg-grey lg:flex lg:items-stretch w-full">
        <div className="flex flex-no-shrink items-stretch h-12">
          {localStorage.role === "admin" ? (
            <>
              <Link to={"/cms/rooms"} className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark">
                CMS Rooms
              </Link>
              <Link to={"/cms/bookings"} className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark">
                CMS Bookings
              </Link>
              <Link to={"/"} className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark">
                Public Site
              </Link>
            </>
          ) : (
            <>
              <Link to={"/"} className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark">
                Rooms
              </Link>
              <Link to={"/bookings"} className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark">
                My Bookings
              </Link>
            </>
          )}

          <button className="block lg:hidden cursor-pointer ml-auto relative w-12 h-12 p-4">
            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>
        {localStorage.access_token ? (
          <div className="lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow">
            <div className="lg:flex lg:items-stretch lg:justify-end ml-auto">
              <button onClick={handleLogout} className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow">
            <div className="lg:flex lg:items-stretch lg:justify-end ml-auto">
              <Link to={"/login"} className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark">
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
