/**
 * Reusable Button Component
 * (To be enhanced in Sprint 4)
 */

import React from "react";

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
}) {
  const baseStyles = "btn";
  const variantStyles = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {loading ? "Cargando..." : children}
    </button>
  );
}
