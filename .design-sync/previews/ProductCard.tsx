import React from 'react';
import { ProductCard } from 'd22-design-system';

export const VidaAtivo = () => (
  <div style={{ padding: 16, maxWidth: 280 }}>
    <ProductCard
      category="vida"
      title="Seguro de Vida Premium"
      policyNumber="APL-2024-0892"
      status="ativo"
      premium="R$ 127,90"
      dueDate="15/08/2024"
      onAction={() => {}}
    />
  </div>
);

export const AutoPendente = () => (
  <div style={{ padding: 16, maxWidth: 280 }}>
    <ProductCard
      category="auto"
      title="Auto Compreensivo Total"
      policyNumber="APL-2024-1145"
      status="pendente"
      premium="R$ 289,00"
      dueDate="01/08/2024"
      onAction={() => {}}
      actionLabel="Regularizar"
    />
  </div>
);

export const ResidencialCancelado = () => (
  <div style={{ padding: 16, maxWidth: 280 }}>
    <ProductCard
      category="residencial"
      title="Residencial Essencial"
      policyNumber="APL-2023-0234"
      status="cancelado"
      premium="R$ 94,50"
    />
  </div>
);

export const EmpresarialSinistro = () => (
  <div style={{ padding: 16, maxWidth: 280 }}>
    <ProductCard
      category="empresarial"
      title="Empresarial Completo"
      policyNumber="APL-2024-0567"
      status="sinistro"
      premium="R$ 540,00"
      dueDate="30/09/2024"
      onAction={() => {}}
      actionLabel="Acompanhar sinistro"
    />
  </div>
);
