import './Buttons.css'
const Button = ({children, type="button", variant, width="fit", onClick}) => {
    const className = `btn btn-${variant} btn-${width}`

    return (
    <button type={type} className={className} onClick={onClick}>
        {children}
    </button>
)
}
export default Button;