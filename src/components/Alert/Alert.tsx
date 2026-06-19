import React from 'react';

export interface AlertProps {
  /** Tom do alerta */
  variant: 'success' | 'warning' | 'error' | 'info';
  /** Título curto — explica o que aconteceu */
  title: string;
  /** Descrição — explica o que fazer */
  description?: string;
  /** Callback para fechar o alerta */
  onClose?: () => void;
  /** Classes CSS adicionais */
  className?: string;
}

const ICONS: Record<AlertProps['variant'], React.ReactNode> = {
  success: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="#1B8A5A" strokeWidth="1.5" />
      <path d="M6 10l3 3 5-5" stroke="#1B8A5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2L18 17H2L10 2z" stroke="#C47A1A" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8v4M10 14v1" stroke="#C47A1A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="#C93D3D" strokeWidth="1.5" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="#C93D3D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="#146B7A" strokeWidth="1.5" />
      <path d="M10 9v6M10 6v1" stroke="#146B7A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  description,
  onClose,
  className = '',
}) => (
  <div
    className={`d22-alert d22-alert-${variant} ${className}`}
    role="alert"
    aria-live={variant === 'error' ? 'assertive' : 'polite'}
  >
    <span className="d22-alert-icon">{ICONS[variant]}</span>
    <div className="d22-alert-body">
      <div className="d22-alert-title">{title}</div>
      {description && <div className="d22-alert-desc">{description}</div>}
    </div>
    {onClose && (
      <button
        className="d22-alert-close"
        onClick={onClose}
        aria-label="Fechar"
        type="button"
      >
        ×
      </button>
    )}
  </div>
);

export default Alert;
