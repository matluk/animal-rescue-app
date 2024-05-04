import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import About from "./components/About/About.jsx";
import AnimalList from "./components/AnimalList/AnimalList.jsx";
import AnimalCreate from "./components/AnimalCreate/AnimalCreate.jsx";
import Notifications from "./components/Notifications/Notifications.jsx";
import Donations from "./components/Donations/Donations.jsx";
import AppBar from "./components/AppBar.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import { useAuth } from "./utils/context/authContext.jsx";
import routes from "./routes.js";
import { Container } from "@mui/material";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Container maxWidth="xl">
      <Router>
        {isAuthenticated && <AppBar />}
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path={routes.about.path} element={<About />} />
              <Route path={routes.animalList.path} element={<AnimalList />} />
              <Route
                path={routes.animalCreate.path}
                element={<AnimalCreate />}
              />
              <Route path={routes.donations.path} element={<Donations />} />
              <Route
                path={routes.notifications.path}
                element={<Notifications />}
              />
              <Route path="*" element={<Navigate to={routes.about.path} />} />
            </>
          ) : (
            <>
              <Route path={routes.about.path} element={<About />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/signin" />} />
            </>
          )}
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
