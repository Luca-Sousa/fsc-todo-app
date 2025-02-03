const SidebarButton = ({ children, variant }) => {
  const getVariantClass = () => {
    if (variant === "unselected") {
      return "text-brand-dark-blue"
    }

    if (variant === "selected") {
      return "text-brand-primary bg-brand-primary/20"
    }
  }

  return (
    <a
      href="#"
      className={`flex items-center gap-2 rounded-lg px-6 py-3 ${getVariantClass()}`}
    >
      {children}
    </a>
  )
}

export default SidebarButton
