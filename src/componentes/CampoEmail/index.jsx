import './CampoEmail.css'
import React, {useState} from 'react'

const CampoEmail = (props) => {

    //const [emailValido, setEmailValido] = useState(true) // true ou false

    const aoDigitar = (evento) => {
        props.aoAlterar(evento.target.value)
        props.validarCampo(true)
    }

    const validaEmail = (evento) => {
        const email = evento.target.value
        const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        console.log(regex.test(email))
        props.validarCampo(regex.test(email))
    }

    return (
        <div>
            <label htmlFor="email">Digite seu e-mail::</label><br />
            <input
                className="campo-email"
                type="email"
                id="email"
                name="email"
                required="required"
                placeholder="Digite seu e-mail cadastrado"
                onChange={aoDigitar}
                value={props.email}
                onBlur={validaEmail}
            />
            <br />
            {!props.emailValido && <span className="erro">*E-mail inválido</span>}
        </div>
    )
}

export default CampoEmail