import './CampoCpf.css'
import InputMask from 'react-input-mask'
import React, { useState } from 'react'

const CampoCpf = (props) => {
    const [cpfNumerico, setCpfNumerico] = useState('') // sem pontos e traços

    const removeMascara = (cpf) => {
        return cpf.replace(/\D/g, '')
    }

    const aoDigitar = (evento) => {
        props.aoAlterar(evento.target.value)
        props.validarCampo(true)
    }

    const validaCpf = (evento) => {
        const value = evento.target.value
        const cpfNumericoAtualizado = removeMascara(value)
        setCpfNumerico(cpfNumericoAtualizado)
        console.log(cpfNumericoAtualizado)

        if (cpfNumericoAtualizado == '') return props.validarCampo(false);
        if (cpfNumericoAtualizado.length != 11 ||
            cpfNumericoAtualizado == "00000000000" || cpfNumericoAtualizado == "11111111111" ||
            cpfNumericoAtualizado == "22222222222" || cpfNumericoAtualizado == "33333333333" ||
            cpfNumericoAtualizado == "44444444444" || cpfNumericoAtualizado == "55555555555" ||
            cpfNumericoAtualizado == "66666666666" || cpfNumericoAtualizado == "77777777777" ||
            cpfNumericoAtualizado == "88888888888" || cpfNumericoAtualizado == "99999999999")
            return props.validarCampo(false);
        let add = 0;
        for (let i = 0; i < 9; i++)
            add += parseInt(cpfNumericoAtualizado.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpfNumericoAtualizado.charAt(9)))
            return props.validarCampo(false);
        add = 0;
        for (let i = 0; i < 10; i++)
            add += parseInt(cpfNumericoAtualizado.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpfNumericoAtualizado.charAt(10)))
            return props.validarCampo(false);

        return props.validarCampo(true);
    }

    return (
        <div>
            <label htmlFor="cpf">Usuário:</label><br />
            <InputMask
                className="campo-cpf"
                mask="999.999.999-99"
                type="text"
                id="cpf"
                name="cpf"
                required="required"
                placeholder="Digite seu CPF"
                onChange={aoDigitar}
                value={props.cpf}
                onBlur={validaCpf}
            />
            <br />
            {!props.cpfValido && <span className="erro">*Número de CPF inválido, tente novamente!</span>}
        </div>
    )
}

export default CampoCpf