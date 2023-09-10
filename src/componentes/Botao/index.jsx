const Botao = ({children, onClick }) => {
    return (
        <button className="botao bg-primary-500 p-2 rounded text-white my-2" onClick={onClick}>
            {children}
        </button>
    )
}

export default Botao
