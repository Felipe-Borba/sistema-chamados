import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/auth";
import "./signIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (email !== "" && senha !== "") {
      signIn({ email, senha });
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src={logo} alt="Sistema Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            type="password"
            placeholder="******"
            value={senha}
            onChange={({ target }) => setSenha(target.value)}
          />

          <button type="submit">
            {loadingAuth ? "Carregando..." : "Acessar"}
          </button>
        </form>

        <Link to="/register">Criar uma Conta</Link>
      </div>
    </div>
  );
}

export default SignIn;

//TODO fix botão acessar não muda para carregando
