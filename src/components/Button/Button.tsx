import React from 'react';

export interface ButtonProps {
  /** Visual style do botão */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Tamanho do botão */
  size?: 'sm' | 'md' | 'lg';
  /** Desabilita interação */
  disabled?: boolean;
  /** Mostra spinner de carregamento */
  loading?: boolean;
  /** Conteúdo do botão */
  children: React.ReactNode;
  /** Handler de clique */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Tipo HTML do botão */
  type?: 'button' | 'submit' | 'reset';
  /** Classes CSS adicionais */
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  type = 'button',
  className = '',
}) => {
  const classes = [
    'd22-btn',
    `d22-btn-${variant}`,
    `d22-btn-${size}`,
    loading ? 'd22-btn-loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
    >
      {children}
    </button>
  );
};

export default Button;
