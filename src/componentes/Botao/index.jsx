import './Botao.css'
import React from 'react'

const Botao = ({children, onClick }) => {
    return (
        <button 
        className="botao" onClick={onClick}>
        {children}
        </button>
    )
    }

    export default Botao
