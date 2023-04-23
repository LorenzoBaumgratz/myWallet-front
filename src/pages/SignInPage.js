import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import axios from "axios";
import { useLogin } from "../contexts/context";
//lab@lab.com   //1234
export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState([])
  const [senha, setSenha] = useState([])
  const { setUsuario} = useLogin()
  function login(e) {
    e.preventDefault();
   
      axios.post(`${process.env.REACT_APP_API_URL}/login`,
        {
          email,
          senha
        })
        .then(res => {
          const {nome,token}=res.data
          console.log(res.data)
          setUsuario({nome,token})
          localStorage.setItem("usuario", JSON.stringify({nome,token}))

          navigate("/home")
        })
        .catch(err => {
          alert(err.response.data)
        })
      //resetar campos
    

  }
  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="Senha" type="password" autocomplete="new-password" onChange={(e) => setSenha(e.target.value)}/>
        <button>Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
