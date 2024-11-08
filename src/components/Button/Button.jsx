function Button ({text, onClickHandler}) {
    return (
        <button
            onClick={onClickHandler}
            className="btn btn-accent w-full rounded-full"
        >
            {text}
        </button>
    );
}

export default Button;