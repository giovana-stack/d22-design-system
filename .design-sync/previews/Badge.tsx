import React from 'react';
import { Badge } from 'd22-design-system';

export const AllStatuses = () => (
  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: 16, alignItems: 'center' }}>
    <Badge status="ativo" />
    <Badge status="pendente" />
    <Badge status="cancelado" />
    <Badge status="sinistro" />
  </div>
);

export const CustomLabels = () => (
  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: 16, alignItems: 'center' }}>
    <Badge status="ativo" label="Em vigência" />
    <Badge status="pendente" label="Aguard. pagamento" />
    <Badge status="sinistro" label="Em análise" />
  </div>
);
