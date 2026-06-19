import React from 'react';
import { CoverageList } from 'd22-design-system';

export const VidaBasico = () => (
  <div style={{ padding: 16, maxWidth: 400 }}>
    <CoverageList
      title="Cobertura — Vida Básico"
      items={[
        { name: 'Morte natural', value: 'R$ 100.000', included: true },
        { name: 'Morte acidental', value: 'R$ 200.000', included: true },
        { name: 'Invalidez permanente', value: 'R$ 100.000', included: true },
        { name: 'Doenças graves', value: '—', included: false },
        { name: 'Diárias por internação', value: '—', included: false },
      ]}
    />
  </div>
);

export const AutoCompreensivo = () => (
  <div style={{ padding: 16, maxWidth: 400 }}>
    <CoverageList
      title="Cobertura — Auto Compreensivo"
      items={[
        { name: 'Colisão e capotamento', value: 'Valor FIPE', included: true },
        { name: 'Roubo e furto', value: 'Valor FIPE', included: true },
        { name: 'Incêndio', value: 'Valor FIPE', included: true },
        { name: 'Danos a terceiros', value: 'R$ 50.000', included: true },
        { name: 'Assistência 24h', value: 'Incluso', included: true },
        { name: 'Carro reserva', value: '—', included: false },
      ]}
    />
  </div>
);

export const SemTitulo = () => (
  <div style={{ padding: 16, maxWidth: 400 }}>
    <CoverageList
      items={[
        { name: 'Responsabilidade civil', value: 'R$ 30.000', included: true },
        { name: 'Danos morais', value: '—', included: false },
      ]}
    />
  </div>
);
