import React from 'react';
import { Button } from 'd22-design-system';

export const Variants = () => (
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', padding: 16 }}>
    <Button variant="primary">Contratar</Button>
    <Button variant="secondary">Simular</Button>
    <Button variant="outline">Ver detalhes</Button>
    <Button variant="ghost">Cancelar</Button>
    <Button variant="danger">Excluir apólice</Button>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 16 }}>
    <Button variant="primary" size="sm">Contratar</Button>
    <Button variant="primary" size="md">Contratar</Button>
    <Button variant="primary" size="lg">Contratar agora</Button>
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', padding: 16 }}>
    <Button variant="primary" loading>Processando...</Button>
    <Button variant="secondary" loading>Carregando</Button>
    <Button variant="primary" disabled>Indisponível</Button>
    <Button variant="outline" disabled>Desativado</Button>
  </div>
);
