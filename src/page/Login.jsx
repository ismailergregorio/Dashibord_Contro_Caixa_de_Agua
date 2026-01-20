import "./css-Login.css"
import "../index.css"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api"
import { toast } from "react-toastify";
export default function PaginaLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const auth = async (e) => {
  e.preventDefault();
    try {
      const dados = {
        email: email,
        senha: password
      }

      const resposta = await api.post(
        "/auth",
        dados
      );
      console.log(resposta.data)
      localStorage.setItem("accessToken", resposta.data.toker);
      localStorage.setItem("refreshToken",resposta.data.refreshToker)
      toast.success("Susseso");

      navigate("/app");

    } catch (error) {
      toast.error("Erro ao Fazer Login verifique a senha ou usuario "+error.message)
      console.error("Erro ao autenticar:", error.response?.data || error.message);
    }
  };

  return (
    <main className="login">
      <section className="containerLogin">
        <header className="headerLogin">
          <h1>Login</h1>
        </header>

        <form className="formInputs" onSubmit={auth}>
          <div className="inputLogin">
            <label htmlFor="email">Email</label>
            <input type="text"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="inputLogin">
            <label htmlFor="senha">Senha</label>
            <input type="password"
              id="senha"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" className="btnlogin">Entrar</button>
          <Link className="esqueciSenha">Esqueci a senha</Link>
        </form>
      </section>
    </main>
  );
}
