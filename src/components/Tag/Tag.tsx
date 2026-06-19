import React from 'react';

export interface TagProps {
  /** Categoria do produto de seguro */
  category: 'vida' | 'auto' | 'residencial' | 'saude' | 'empresarial';
  /** Sobrescreve o label padrão */
  label?: string;
  /** Classes CSS adicionais */
  className?: string;
}

const LABELS: Record<TagProps['category'], string> = {
  vida: 'Vida',
  auto: 'Auto',
  residencial: 'Residencial',
  saude: 'Saúde',
  empresarial: 'Empresarial',
};

export const Tag: React.FC<TagProps> = ({ category, label, className = '' }) => (
  <span className={`d22-tag d22-tag-${category} ${className}`}>
    {label ?? LABELS[category]}
  </span>
);

export default Tag;
