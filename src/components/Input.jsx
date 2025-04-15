const Input = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <label
        className="text-sm font-semibold text-brand-dark-blue"
        htmlFor={rest.id}
      >
        {label}
      </label>
      <input
        className="rounded-lg border-solid border-brand-border px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        {...rest}
      />
    </div>
  )
}

export default Input
