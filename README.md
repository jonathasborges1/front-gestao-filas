# front-gestao-filas

Aplicação **SPA (Single Page Application)** em **React + TypeScript** para exibição em tempo real da **fila de motoristas para carregamento**, com design otimizado para TVs de 32".  
O painel mostra o motorista chamado, últimos chamados e contadores de status, integrando-se via **SSE (Server-Sent Events)** com o backend.

---

## ✨ Funcionalidades

- 📺 Painel digital em tempo real para exibição em TV
- 🔔 Exibe motorista atual chamado (número, nome, placa, mensagem e horário)
- 📋 Histórico dos últimos 4 motoristas chamados
- 🔢 Contadores: aguardando, em carregamento, finalizados
- 🗣️ **Text-to-Speech (TTS)**: pronúncia automática do nome do motorista
- 🔄 Conexão em tempo real via **SSE** (com reconexão automática)
- 🎨 UI fiel ao design definido (MUI + Clean Code + MVVM)

---

## 🏗️ Arquitetura

O projeto segue o padrão **MVVM (Model–View–ViewModel)**, princípios **SOLID** e práticas de **Clean Code**.


### Fluxo
1. **Service** (`sse.adapter.ts`) conecta ao backend via SSE  
2. **ViewModel** (`vm.ts`) recebe e valida `BroadcastPayload`  
3. **View** (`page.tsx`) renderiza UI com MUI  
4. **TTS Adapter** fala o nome do motorista  

---

## 📡 Integração em tempo real

**Payload recebido via SSE** (padrão do backend):

```ts
export interface BroadcastPayload {
  currentCall: {
    scheduleNumber: string;
    driverName: string;
    plate: string;
    message: string;
    calledAt: string;
  };
  recentCalls: {
    driverName: string;
    plate: string;
    status: "WaitingLoading" | "InLoading" | "Finished";
    icon: "check" | "loading";
    timestamp: string;
  }[];
  totals: {
    waitingLoading: number;
    inLoading: number;
    finished: number;
  };
}
```

🚀 Como rodar o projeto
Pré-requisitos

Node.js >= 18

npm ou yarn

Instalação

# clonar repositório
git clone https://github.com/sua-org/front-gestao-filas.git
cd front-gestao-filas

# instalar dependências
npm install

Variáveis de ambiente

Crie .env.local:
VITE_REALTIME_URL=http://localhost:7070/realtime/queue/stream


Rodar app + mock SSE

Em dois terminais separados:

# terminal 1: iniciar servidor mock SSE
npm run dev:sse

# terminal 2: iniciar frontend
npm run dev
