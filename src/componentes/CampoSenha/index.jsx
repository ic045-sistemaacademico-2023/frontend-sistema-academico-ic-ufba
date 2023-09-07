import './CampoSenha.css'
import React from 'react'

const CampoSenha = (props) => {

  const aoDigitar = (evento) => {
    props.aoAlterar(evento.target.value)
  }

  return (
    <div>
      <label htmlFor="password">Senha:</label><br />
      <input
        className="campo-senha"
        type="password"
        id="password"
        name="password"
        required="required"
        placeholder="Digite sua senha"
        onChange={aoDigitar}
        value={props.senha}
      />
      <br />
    </div>
  )
}

export default CampoSenha