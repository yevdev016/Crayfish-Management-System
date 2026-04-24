import './Inputs.css'
const Inputs = ({label, id, type, onChange, value}) => {
 
    return(
        <div className="input-wrapper">
            <label htmlFor={id}>
                <span className="label-text">
                    {label}
                </span>
                
                <input 
                type={type} 
                name={id} 
                id={id} 
                onChange={onChange} 
                value={value}
                placeholder={`Enter ${label.toLowerCase()}`}
                />
            </label>
        </div>
    );
}
export default Inputs;