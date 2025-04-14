const Button = ({ children, variant = "primary", ...rest }) => {
  const getVariantsClasses = () => {
    if (variant === "primary") {
      return "bg-brand-primary text-white"
    }

    if (variant === "ghost") {
      return "bg-transparent text-brand-dark-gray"
    }
  }

  return (
    <button
      className={`flex items-center gap-2 rounded-md px-3 py-1 text-xs font-semibold transition hover:opacity-75 ${getVariantsClasses()}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
