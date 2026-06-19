import React from 'react';
import { Tag } from '../Tag/Tag';
import { Badge } from '../Badge/Badge';

export interface ProductCardProps {
  /** Categoria do produto */
  category: 'vida' | 'auto' | 'residencial' | 'saude' | 'empresarial';
  /** Nome do produto ou apólice */
  title: string;
  /** Número da apólice */
  policyNumber?: string;
  /** Status da apólice */
  status?: 'ativo' | 'pendente' | 'cancelado' | 'sinistro';
  /** Valor do prêmio mensal */
  premium?: string;
  /** Data de vencimento */
  dueDate?: string;
  /** Callback para ação primária */
  onAction?: () => void;
  /** Label do botão de ação */
  actionLabel?: string;
  /** Classes CSS adicionais */
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  category,
  title,
  policyNumber,
  status,
  premium,
  dueDate,
  onAction,
  actionLabel = 'Ver detalhes',
  className = '',
}) => (
  <div className={`d22-product-card d22-product-card-${category} ${className}`}>
    <div className="d22-product-card-header">
      <Tag category={category} />
      {status && <Badge status={status} />}
    </div>
    <div className="d22-product-card-body">
      <h3 className="d22-product-card-title">{title}</h3>
      {policyNumber && (
        <p className="d22-product-card-policy">Apólice {policyNumber}</p>
      )}
      {premium && (
        <p className="d22-product-card-premium">
          <span className="d22-product-card-premium-label">Prêmio mensal</span>
          <span className="d22-product-card-premium-value">{premium}</span>
        </p>
      )}
      {dueDate && (
        <p className="d22-product-card-due">Vence em {dueDate}</p>
      )}
    </div>
    {onAction && (
      <div className="d22-product-card-footer">
        <button className="d22-btn d22-btn-outline d22-btn-sm" onClick={onAction} type="button">
          {actionLabel}
        </button>
      </div>
    )}
  </div>
);

export default ProductCard;
