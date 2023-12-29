import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { toggle, darkMode } = useContext(DarkModeContext);
  // Use o ID do currentUser para buscar seus detalhes
  const { data: userData, isLoading: isUserLoading } = useQuery(
    ["user", currentUser?.id],
    () => makeRequest.get(`/users/find/${currentUser?.id}`).then((res) => res.data),
    {
      enabled: !!currentUser?.id, // Ative a consulta apenas se o ID do usuário estiver presente
    }
  );


  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>FICRSOCIAL</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          {!isUserLoading && userData ? (
            <img
              src={"/upload/" + userData.profilePic}
              alt={userData.name}
            />
          ) : (
            <PersonOutlinedIcon /> // Ícone padrão se a imagem ou os dados não estiverem disponíveis
          )}
          <span>{userData ? userData.name : 'User'}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
