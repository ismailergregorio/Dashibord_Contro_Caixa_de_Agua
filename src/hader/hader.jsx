import "./style-hader.css"
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import axios from "axios";

export default function Hader() {
  const navigate = useNavigate();
  async function logout() {
    try {
      const refresh = localStorage.getItem("refreshToken");

      // await axios.post("http://localhost:8081/usuario/logout",{ refreshToken:refresh});

      localStorage.clear();
      console.log("teste")
      navigate("/");
    }
    catch (e) {
      console.log(e)
    }
  }
  return (
    <header>
      <h1>Teste Hader</h1>
      <div className="caixaDeLogin">
        <button onClick={logout}>Usuário</button>
      </div>
    </header>
  )
}