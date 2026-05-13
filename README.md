# Helpdesk SaaS

## Sobre este repositório 

API de atendimento inteligente construída com Node.js, TypeScript, Fastify, Prisma e MongoDB.

O projeto simula um agente de suporte com:
- roteamento de intenção
- chamadas de tools
- eventos de execução
- histórico de sessão
- criação de tickets
- arquitetura inspirada em agentes de IA

---

## Tech Stack

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- MongoDB Atlas
- Docker + Docker Compose
- Jest + Supertest

---

## Arquitetura

O projeto segue uma arquitetura em camadas:

```txt
Controller
↓
Service
↓
Repository
↓
Prisma
↓
MongoDB
```

Além disso, o fluxo do chat registra:
- mensagens do usuário e do agente
- pensamentos do agente
- tool calls
- tool results
- eventos

---

## Funcionalidades

- Criação de sessões
- Histórico completo de sessão
- Fluxo STATUS
- Fluxo SUPPORT
- Fluxo BILLING
- Fluxo SMALLTALK
- Fluxo UNKNOWN
- Criação de ticket
- Persistência de mensagens
- Persistência de eventos
- Docker Compose
- Testes de integração

---

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/ArthurBoaro/Helpdesk-SaaS.git
```

---

### 2. Instalar dependências

```bash
npm install
```

---

### 3. Criar `.env`

Copie:

```bash
cp .env.example .env
```

Altere USER e PASSWORD:

```env
DATABASE_URL="mongodb+srv://USER:PASSWORD@cluster.mongodb.net/helpdesk"
PORT=3333
```

---

## Rodando com Docker

### Build e start

```bash
docker compose up --build
```

---

## Rodando sem Docker

### Gerar Prisma Client

```bash
npx prisma generate
```

---

### Aplicar schema

```bash
npx prisma db push
```

---

### Iniciar API

```bash
npm run start
```

---

## Endpoints

---

### POST `/sessions`

Cria uma nova sessão.

#### Response

```json
{
  "sessionId": "uuid"
}
```

---

### POST `/chat`

Processa mensagens do usuário.

#### Request

```json
{
  "sessionId": "uuid",
  "message": "Qual o status do sistema?",
  "metadata": { "userId": "opcional", "channel": "whatsapp|web|etc" }
}
```

---

#### Response STATUS

```json
{
  "sessionId": "uuid",
  "assistantMessage": "api: ok, webhook: down, dashboard: degraded",
  "events": [...]
}
```

---

#### Response SUPPORT

```json
{
  "sessionId": "uuid",
  "assistantMessage": "Ticket: TICKET-123",
  "events": [...]
}
```

---

### GET `/sessions/:sessionId/messages`

Retorna:
- mensagens
- eventos
- histórico completo da sessão

#### Response

```json
{
  "sessionId": "uuid",
  "messages": [...],
  "events": [...]
}
```

---

## Testes

### Rodar testes

```bash
npm test
```

---

### Testes implementados

#### STATUS FLOW
Valida:
- tool call
- eventos
- resposta

#### SUPPORT FLOW
Valida:
- coleta de email
- createTicket
- eventos
- resposta

---

## Docker

### Arquivos

- Dockerfile
- docker-compose.yml
- .dockerignore

---

## Decisões técnicas (trade-offs)

### Fastify ao invés de Express

Escolhido por:
- maior performance
- tipagem melhor com TypeScript
- menor overhead

Trade-off:
- ecossistema menor que Express

---

### MongoDB

Escolhido por:
- flexibilidade para eventos
- estrutura dinâmica
- rapidez para prototipação

Trade-off:
- menos rígido que SQL

---

### Prisma ORM

Escolhido por:
- tipagem forte
- integração com TypeScript
- produtividade

Trade-off:
- suporte Mongo menos completo que SQL

---

### Arquitetura em eventos

Eventos foram separados das mensagens para:
- rastreabilidade
- debugging
- observabilidade
- auditabilidade

Trade-off:
- maior complexidade estrutural

---

## Evolução do Projeto

- Streaming SSE/Chunked
- Rate limit por sessionId
- Plannner + Executor
- Guardrails de output

---