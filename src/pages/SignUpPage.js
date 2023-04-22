import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"
//lab@lab.com   //1234
export default function SignUpPage() {
  const [nome, setNome] = useState([])
  const [email, setEmail] = useState([])
  const [senha, setSenha] = useState([])
  const [confSenha, setConfSenha] = useState([])
  const navigate = useNavigate();
  function cadastrar(e) {
    e.preventDefault();
    if (senha === confSenha) {

      axios.post(`${process.env.REACT_APP_API_URL}/cadastro`,
        {
          nome,
          email,
          senha
        })
        .then(res => {
          navigate("/")
        })
        .catch(err => {
          alert(err.response.data)
        })
      //resetar campos
    }

  }

  return (
    //axios.get(`${process.env.REACT_APP_API_URL/ xxxxxx`})
    <SingUpContainer>
      <form onSubmit={cadastrar}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" onChange={(e) => setNome(e.target.value)} />
        <input placeholder="E-mail" type="email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" autocomplete="new-password" onChange={(e) => setSenha(e.target.value)} />
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" onChange={(e) => setConfSenha(e.target.value)} />
        <button>Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
