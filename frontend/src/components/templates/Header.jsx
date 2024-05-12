import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/cook_logo.png";
import IconButton from "@mui/joy/IconButton";
import { AuthContext } from "../../auth/AuthProvide";
import { useNavigate} from 'react-router-dom';

export default function Header() {
  const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    logout();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", boxShadow: "none", height: "64px" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NavLink to="/user">
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: "55px",
                  maxWidth: "100%",
                  verticalAlign: "middle",
                  display: "block",
                  marginLeft: "50px",
                  marginRight: "auto",
                }}
              />
            </NavLink>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
            <NavLink
              to="/user/home"
              style={{
                textDecoration: "none",
                color: "#102C57",
                marginRight: "20px",
                fontFamily:'sans-serif'
              }}
              activeStyle={{ fontWeight: "bold" }}
            >
              Home
            </NavLink>
            <NavLink
              to="/user/favourites"
              style={{
                textDecoration: "none",
                color: "#102C57",
                marginRight: "20px",
                fontFamily:'sans-serif'
              }}
              activeStyle={{ fontWeight: "bold" }}
            >
              Favourites
            </NavLink>
          </Box>
          <IconButton sx={{ marginLeft: "auto" }} onClick={logOut}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
