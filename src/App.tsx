import routes from "./routes/routes";
import { useRoutes } from "react-router-dom";

function App() {
  const element = useRoutes(routes);

  return <div>{element}</div>;
}

export default App;
