import React from 'react';

export interface CoverageItem {
  /** Nome da cobertura */
  name: string;
  /** Valor segurado ou descrição */
  value: string;
  /** Cobertura incluída (true) ou exclusão (false) */
  included?: boolean;
}

export interface CoverageListProps {
  /** Título da seção */
  title?: string;
  /** Lista de coberturas */
  items: CoverageItem[];
  /** Classes CSS adicionais */
  className?: string;
}

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="d22-coverage-icon d22-coverage-icon-included">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrossIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="d22-coverage-icon d22-coverage-icon-excluded">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

export const CoverageList: React.FC<CoverageListProps> = ({ title, items, className = '' }) => (
  <div className={`d22-coverage-list ${className}`}>
    {title && <h4 className="d22-coverage-list-title">{title}</h4>}
    <ul className="d22-coverage-list-items">
      {items.map((item) => (
        <li
          key={item.name}
          className={`d22-coverage-item ${item.included === false ? 'd22-coverage-item-excluded' : 'd22-coverage-item-included'}`}
        >
          {item.included === false ? <CrossIcon /> : <CheckIcon />}
          <span className="d22-coverage-item-name">{item.name}</span>
          <span className="d22-coverage-item-value">{item.value}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default CoverageList;
