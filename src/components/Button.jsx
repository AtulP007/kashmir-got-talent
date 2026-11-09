import './Button.css';

export default function Button({
  children,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
}) {
  return (
    <button
      className={`button ${className}`.trim()}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
