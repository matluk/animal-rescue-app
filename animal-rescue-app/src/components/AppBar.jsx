import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth } from "../utils/context/authContext";
import routes from "../routes";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const appTitle = "Animal Rescue";

function DrawerAppBar(props) {
  const { isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { window } = props;

  const navigate = useNavigate();

  const usernameToken = localStorage.getItem("username");

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const visibleRoutes = Object.values(routes).filter((route) => {
    return isAdmin ? true : !route.requiresAuth;
  });

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {appTitle}
      </Typography>
      <Divider />
      <List>
        {visibleRoutes.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary={item.name}
                onClick={() => navigate(item.path)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, textAlign: "center" }}
          >
            {appTitle}
          </Typography>
          <Box sx={{ display: { md: "block", xs: "none" }, marginLeft: 2 }}>
            {visibleRoutes.map((item) => (
              <Button
                key={item.name}
                sx={{ color: "#fff" }}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </Button>
            ))}
          </Box>
          <Button
            sx={{
              color: "white",
              backgroundColor: "#8f0e04",
              marginLeft: "auto",
              "&:hover": { backgroundColor: "red" },
            }}
            onClick={() => {
              logout();
              navigate("/signin");
            }}
          >
            Sign out
            <Box sx={{ minWidth: "60px", marginLeft: "10px" }}>
              {isAdmin ? ` ${usernameToken} - admin` : ` ${usernameToken}`}
            </Box>
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 4 }}></Box>
    </Box>
  );
}

export default DrawerAppBar;
