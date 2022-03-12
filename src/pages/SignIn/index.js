import { useState } from "react";
import "./signIn.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("todo");
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
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />

          <button type="submit">Acessar</button>
        </form>

        <Link to="/register">Criar uma Conta</Link>
      </div>
    </div>
  );
}

export default SignIn;
