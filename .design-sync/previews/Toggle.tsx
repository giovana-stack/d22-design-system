import React from 'react';
import { Toggle } from 'd22-design-system';

export const Default = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
    <Toggle label="Renovação automática" checked={false} onChange={() => {}} />
    <Toggle label="Cobertura ampliada" checked={true} onChange={() => {}} />
    <Toggle label="Proteção familiar" checked={false} onChange={() => {}} />
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
    <Toggle label="Ativado" checked={true} onChange={() => {}} />
    <Toggle label="Desativado" checked={false} onChange={() => {}} />
    <Toggle label="Desabilitado (ligado)" checked={true} onChange={() => {}} disabled />
    <Toggle label="Desabilitado (desligado)" checked={false} onChange={() => {}} disabled />
  </div>
);
