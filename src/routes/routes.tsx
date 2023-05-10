import { Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import PlayerStatus from "../components/PlayerStatus";
import PlayerItems from "../components/PlayerItems";
import Gacha from "../components/Gacha";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "player-status",
        element: <PlayerStatus />,
      },
      {
        path: "player-items",
        element: <PlayerItems />,
      },
      {
        path: "gacha",
        element: <Gacha />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/" />,
  },
];
export default routes;
