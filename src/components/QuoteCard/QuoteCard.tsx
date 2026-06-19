import React from 'react';
import { Tag } from '../Tag/Tag';

export interface QuoteCardProps {
  /** Categoria do produto cotado */
  category: 'vida' | 'auto' | 'residencial' | 'saude' | 'empresarial';
  /** Nome do plano */
  planName: string;
  /** Valor mensal */
  monthlyPrice: string;
  /** Lista de coberturas incluídas */
  coverages: string[];
  /** Indica o plano recomendado */
  recommended?: boolean;
  /** Callback para contratar */
  onSelect?: () => void;
  /** Classes CSS adicionais */
  className?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  category,
  planName,
  monthlyPrice,
  coverages,
  recommended = false,
  onSelect,
  className = '',
}) => (
  <div className={`d22-quote-card ${recommended ? 'd22-quote-card-recommended' : ''} ${className}`}>
    {recommended && (
      <div className="d22-quote-card-badge">Recomendado</div>
    )}
    <div className="d22-quote-card-header">
      <Tag category={category} />
      <h3 className="d22-quote-card-plan">{planName}</h3>
      <p className="d22-quote-card-price">
        <span className="d22-quote-card-price-value">{monthlyPrice}</span>
        <span className="d22-quote-card-price-period">/mês</span>
      </p>
    </div>
    <ul className="d22-quote-card-coverages">
      {coverages.map((c) => (
        <li key={c} className="d22-quote-card-coverage-item">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="d22-quote-card-check">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
            <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {c}
        </li>
      ))}
    </ul>
    {onSelect && (
      <button
        className={`d22-btn d22-btn-md ${recommended ? 'd22-btn-primary' : 'd22-btn-outline'}`}
        onClick={onSelect}
        type="button"
      >
        Contratar
      </button>
    )}
  </div>
);

export default QuoteCard;
