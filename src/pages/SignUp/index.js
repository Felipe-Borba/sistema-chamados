import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function SignUp() {
  const [nome, setNome] = useState("");
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
          <h1>Cadastrar</h1>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={({ target }) => setNome(target.value)}
          />
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

        <Link to="/">Já tem uma conta? Entre</Link>
      </div>
    </div>
  );
}

export default SignUp;
