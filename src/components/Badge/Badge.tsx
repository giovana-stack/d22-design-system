import React from 'react';

export interface BadgeProps {
  /** Status da apólice */
  status: 'ativo' | 'pendente' | 'cancelado' | 'sinistro';
  /** Sobrescreve o label padrão */
  label?: string;
  /** Classes CSS adicionais */
  className?: string;
}

const LABELS: Record<BadgeProps['status'], string> = {
  ativo: 'Ativo',
  pendente: 'Pendente',
  cancelado: 'Cancelado',
  sinistro: 'Sinistro aberto',
};

export const Badge: React.FC<BadgeProps> = ({ status, label, className = '' }) => (
  <span className={`d22-badge d22-badge-${status} ${className}`}>
    <span className="d22-badge-dot" aria-hidden="true" />
    {label ?? LABELS[status]}
  </span>
);

export default Badge;
