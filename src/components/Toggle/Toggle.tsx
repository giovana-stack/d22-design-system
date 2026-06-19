import React from 'react';

export interface ToggleProps {
  /** Rótulo visível */
  label: string;
  /** Estado ligado/desligado */
  checked: boolean;
  /** Handler de mudança */
  onChange: (checked: boolean) => void;
  /** Desabilita o toggle */
  disabled?: boolean;
  /** Classes CSS adicionais */
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
}) => {
  const id = `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <label className={`d22-toggle ${disabled ? 'd22-toggle-disabled' : ''} ${className}`} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className="d22-toggle-input"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="d22-toggle-track" aria-hidden="true">
        <span className="d22-toggle-thumb" />
      </span>
      <span className="d22-toggle-label">{label}</span>
    </label>
  );
};

export default Toggle;
