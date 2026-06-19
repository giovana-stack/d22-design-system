import React from 'react';
import { Alert } from 'd22-design-system';

export const Success = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <Alert
      variant="success"
      title="Pagamento confirmado"
      description="Seu prêmio de R$ 127,90 foi processado com sucesso. Recibo enviado para seu e-mail."
    />
  </div>
);

export const Warning = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <Alert
      variant="warning"
      title="Vencimento em 3 dias"
      description="A apólice APL-2024-0892 vence em 15/07/2024. Renove agora para manter a cobertura ativa."
    />
  </div>
);

export const ErrorAlert = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <Alert
      variant="error"
      title="Pagamento recusado"
      description="Não foi possível processar o pagamento. Verifique os dados do cartão e tente novamente."
    />
  </div>
);

export const Info = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <Alert
      variant="info"
      title="Documentação pendente"
      description="Envie o laudo médico para concluir a contratação do seguro de vida. Prazo: 10 dias úteis."
    />
  </div>
);

export const WithClose = () => (
  <div style={{ padding: 16, maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Alert
      variant="success"
      title="Sinistro aprovado"
      description="Indenização de R$ 5.000,00 será depositada em 2 dias úteis."
      onClose={() => {}}
    />
    <Alert
      variant="warning"
      title="Dados desatualizados"
      onClose={() => {}}
    />
  </div>
);
