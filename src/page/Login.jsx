import "./css-Login.css"
import "../index.css"
import { Link } from "react-router-dom";
export default function PaginaLogin() {
  return (
    <main className="login">
      <section className="containerLogin">
        <header className="headerLogin">
          <h1>Login</h1>
        </header>

        <form className="formInputs">
          <div className="inputLogin">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" />
          </div>

          <div className="inputLogin">
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" placeholder="Senha" />
          </div>

          <button type="submit" className="btnlogin">Entrar</button>
          <Link className="esqueciSenha">Esqueci a senha</Link>
        </form>
      </section>
    </main>
  );
}
