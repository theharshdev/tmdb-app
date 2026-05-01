import { useNavigate, NavLink } from "react-router-dom";

function Header() {
  const navigateToHome = useNavigate();

  const activeLink = ({ isActive }) =>
    `cursor-pointer p-3 transition duration-500 ${isActive ? "text-green-500 font-semibold" : "hover:text-green-500"}`;

  return (
    <>
      <header className="backdrop-blur-2xl fixed top-0 left-0 z-999 w-full">
        <div className="flex justify-between items-center gap-8 w-full py-4 sm:px-4 px-2 max-w-6xl mx-auto">
          <h2 onClick={() => navigateToHome("/popular")} className="text-3xl font-medium leading-none cursor-pointer">
            My Movies
          </h2>
          <div className="text-lg flex gap-2 items-center justify-end">
            <NavLink to="/popular" className={activeLink}>
              Explore
            </NavLink>
            <NavLink to="/recent" className={activeLink}>
              Recents
            </NavLink>
            <NavLink to="/about" className={activeLink}>
              About
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
