import React from 'react';

export interface InputProps {
  /** Rótulo visível */
  label: string;
  /** Valor controlado */
  value?: string;
  /** Placeholder */
  placeholder?: string;
  /** Mensagem de erro */
  error?: string;
  /** Texto auxiliar abaixo do campo */
  hint?: string;
  /** Desabilita o campo */
  disabled?: boolean;
  /** Tipo HTML do input */
  type?: 'text' | 'email' | 'tel' | 'number' | 'password' | 'date';
  /** Handler de mudança */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Classes CSS adicionais */
  className?: string;
  /** id do input — gerado a partir do label se omitido */
  id?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  placeholder,
  error,
  hint,
  disabled = false,
  type = 'text',
  onChange,
  className = '',
  id,
}) => {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={`d22-input-wrapper ${error ? 'd22-input-error' : ''} ${className}`}>
      <label className="d22-input-label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className="d22-input"
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <span id={`${inputId}-error`} className="d22-input-message d22-input-message-error">
          {error}
        </span>
      )}
      {!error && hint && (
        <span id={`${inputId}-hint`} className="d22-input-message">
          {hint}
        </span>
      )}
    </div>
  );
};

export default Input;
