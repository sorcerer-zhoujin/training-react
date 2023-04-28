import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [playerId, setPlayerId] = useState("");

  useEffect(() => {
    const playerId = localStorage.getItem("playerId");
    if (playerId) {
      navigate("/");
    }
  }, [navigate]);

  const login = () => {
    localStorage.setItem("playerId", playerId);
    navigate("/");
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="player id"
        value={playerId}
        onChange={(e) => {
          setPlayerId(e.target.value);
        }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
};
export default Login;
