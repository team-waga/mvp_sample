export function web3ButtonStyles(variant: "primary" | "secondary" = "primary") {
  if (variant === "primary") {
    return "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none"
  }
  return "border-purple-600 text-purple-600 hover:bg-purple-100 hover:text-purple-700"
}

