function Input({ type = "text", label, onChange, value }) {
    
    return (
        <label>
            <input
                type={type}
                className="input input-bordered input-accent w-[500px] max-w-xs rounded-full"
                placeholder={label}
                value={value}
                onChange={onChange}
            />
        </label>
    );
}

export default Input;