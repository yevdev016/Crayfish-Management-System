import './Buttons.css'
const Button = ({children, type="button", variant, width="fit", onClick, loading}) => {
    const className = `btn btn-${variant} btn-${width}`

    return (
    <button 
    type={type} 
    className={className} 
    onClick={onClick}
    disabled={loading}
    >
        {loading ? 'Registering' : children}
    </button>
)
}
export default Button;