import React from 'react';
import { Input } from 'd22-design-system';

export const Default = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16, maxWidth: 360 }}>
    <Input label="Nome completo" placeholder="Digite seu nome" value="" onChange={() => {}} />
    <Input label="CPF" placeholder="000.000.000-00" type="text" value="" onChange={() => {}} />
    <Input label="Telefone" placeholder="(11) 99999-9999" type="tel" value="" onChange={() => {}} />
  </div>
);

export const WithHint = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16, maxWidth: 360 }}>
    <Input
      label="E-mail"
      placeholder="seu@email.com"
      type="email"
      hint="Enviaremos a apólice para este endereço."
      value=""
      onChange={() => {}}
    />
    <Input
      label="Data de nascimento"
      type="date"
      hint="Necessário para cálculo do prêmio de vida."
      value=""
      onChange={() => {}}
    />
  </div>
);

export const ErrorState = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16, maxWidth: 360 }}>
    <Input
      label="CPF"
      placeholder="000.000.000-00"
      error="CPF inválido. Verifique o número digitado."
      value="123.456"
      onChange={() => {}}
    />
    <Input
      label="E-mail"
      placeholder="seu@email.com"
      error="Endereço de e-mail não encontrado."
      value="usuario@"
      onChange={() => {}}
    />
  </div>
);

export const Disabled = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16, maxWidth: 360 }}>
    <Input
      label="Número da apólice"
      value="APL-2024-0892"
      disabled
      onChange={() => {}}
    />
    <Input
      label="Código do corretor"
      value="COR-4421"
      disabled
      onChange={() => {}}
    />
  </div>
);
