import React from 'react';
import { QuoteCard } from 'd22-design-system';

export const Recomendado = () => (
  <div style={{ padding: 16, maxWidth: 280 }}>
    <QuoteCard
      category="vida"
      planName="Vida Completo"
      monthlyPrice="R$ 127,90"
      recommended
      coverages={[
        'Morte natural — R$ 200.000',
        'Morte acidental — R$ 400.000',
        'Invalidez permanente',
        'Doenças graves (12 tipos)',
        'Assistência funeral',
      ]}
      onSelect={() => {}}
    />
  </div>
);

export const Basico = () => (
  <div style={{ padding: 16, maxWidth: 280 }}>
    <QuoteCard
      category="auto"
      planName="Auto Essencial"
      monthlyPrice="R$ 189,00"
      coverages={[
        'Colisão e capotamento',
        'Roubo e furto',
        'Incêndio',
        'Danos a terceiros — R$ 30.000',
      ]}
      onSelect={() => {}}
    />
  </div>
);

export const SaudeEmpresarial = () => (
  <div style={{ padding: 16, maxWidth: 280 }}>
    <QuoteCard
      category="saude"
      planName="Saúde Empresarial"
      monthlyPrice="R$ 340,00"
      recommended
      coverages={[
        'Consultas ilimitadas',
        'Exames laboratoriais',
        'Internação hospitalar',
        'Pronto-socorro 24h',
        'Reembolso de despesas',
      ]}
      onSelect={() => {}}
    />
  </div>
);
