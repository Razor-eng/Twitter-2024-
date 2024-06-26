/* eslint-disable react/prop-types */
const Input = ({ placeholder, value, type, onChange, disabled, label }) => {
    return (
        <div className="w-full">
            {label && <p className="text-xl font-semibold mb-2">{label}</p>}
            <input
                disabled={disabled}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                type={type}
                className="
            w-full
            p-4 
            text-lg 
            border-2
            dark:border-neutral-800 
            rounded-md
            outline-none
            focus:border-sky-500
            focus:border-2
            transition
            disabled:bg-neutral-200
            dark:disabled:bg-neutral-900
            disabled:opacity-70
            disabled:cursor-not-allowed
          "
            />
        </div>
    );
}

export default Input;