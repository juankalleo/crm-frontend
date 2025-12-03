# CRM System - Elegant Project Management Platform

Uma solução completa de CRM minimalista e elegante com design pastel, tema escuro e gerenciamento de projetos. Arquitetura desacoplada: **Frontend Next.js** + **Backend externo** para AI/IA.

## ✨ Características Principais

### Dashboard & Projetos
- Grid responsivo de projetos com cards elegantes
- Filtros por nome, prioridade, data e valor
- Capa de projeto customizável
- Prioridades (Baixa, Média, Alta) com badges coloridas
- Prazos de entrega e valores sugeridos

### Mesa (Workspace)
- Visão geral completa do projeto
- Gerenciamento de participantes
- Notas internas por projeto
- Links rápidos com emoji
- Comentários colaborativos

### Tasks & Notificações
- Criar, completar e deletar tasks
- Atribuir usuários a tasks
- Prioridades por task
- Sistema de notificações em tempo real
- Badge de contagem de notificações

### Notas Pessoais
- Editor com autosave
- Persistência em localStorage
- Sem necessidade de backend
- Timestamp de última alteração

### Audit Logs
- Timeline completa de atividades
- Filtros por tipo de ação (Created, Updated, Deleted)
- Ícones e cores por ação
- Timestamps precisos

### Perfil & Conta
- Edição de informações pessoais
- Mudança de senha com confirmação
- Avatar customizável
- Bio do usuário

### Configurações
- **Tema**: Light/Dark mode elegante
- **Fonte**: Geist (padrão), Sans System, Serif
- **Estilo de Cards**: Rounded ou Square
- **Notificações**: Push e Email (toggleable)
- **Privacidade**: 2FA, dispositivos, segurança

## 🔐 Autenticação

### Teste Rápido
\`\`\`
Email: ana@example.com
Password: password123
\`\`\`

### Criar Nova Conta
- Registre-se com email e senha
- Avatar gerado automaticamente
- Perfil pré-configurado

---

## 🏗️ Arquitetura do Sistema

### Visão Geral

O CRM foi projetado com uma **arquitetura desacoplada**:

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND (Next.js)                         │
│  Dashboard │ Projects │ Tasks │ Workspace │ Settings       │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         │                           │
    API Routes              Backend Externo
    (In-memory)            (Node/Python/Rails)
    - Basic Auth           - PostgreSQL
    - CRUD Ops             - Redis Cache
    - Session              - Email Queue
                           - AI/IA Integration
\`\`\`

### Frontend (Este Repositório)

**Stack:**
- **Framework**: Next.js 16 (App Router)
- **UI**: shadcn/ui Components
- **Styling**: Tailwind CSS v4 com tokens pastel
- **Animações**: Framer Motion
- **Estado**: React Hooks + localStorage
- **API Client**: Fetch API nativo

**API Routes Básicas** (podem ser substituídas):
- `/api/auth/login` - Autenticação JWT
- `/api/auth/register` - Registro de usuários
- `/api/projects` - CRUD de projetos
- `/api/tasks` - CRUD de tasks
- `/api/comments` - Sistema de comentários
- `/api/notifications` - Notificações
- `/api/audit-logs` - Registro de atividades

---

## 🚀 Backend Externo (IA/AI Ready)

### Por Que Backend Separado?

1. **Escalabilidade**: Backend pode crescer independentemente
2. **IA Integration**: Rodas processamento pesado e modelos de ML
3. **Multitenancy**: Suporta múltiplos frontends
4. **Cache**: Redis para performance
5. **Jobs Assíncronos**: Email, notificações, processamento IA
6. **Database**: PostgreSQL com relações complexas

### Estrutura Recomendada de Backend

Crie um novo repositório com a seguinte estrutura:

\`\`\`
backend-crm-ia/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts       # Login/Register/JWT
│   │   ├── auth.service.ts
│   │   └── jwt.strategy.ts
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── user.entity.ts
│   ├── projects/
│   │   ├── projects.controller.ts
│   │   ├── projects.service.ts
│   │   ├── project.entity.ts
│   │   └── project.repository.ts
│   ├── tasks/
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   └── task.entity.ts
│   ├── comments/
│   │   ├── comments.controller.ts
│   │   ├── comments.service.ts
│   │   └── comment.entity.ts
│   ├── ai/                         # 🤖 IA Integration
│   │   ├── ai.controller.ts
│   │   ├── ai.service.ts
│   │   ├── ai-suggestions.ts       # Task suggestions
│   │   ├── ai-analysis.ts          # Project analysis
│   │   └── llm.client.ts           # OpenAI/Claude/etc
│   ├── notifications/
│   │   ├── notifications.service.ts
│   │   ├── email.service.ts        # Nodemailer
│   │   └── queue.service.ts        # Bull Queue
│   ├── audit-logs/
│   │   ├── audit.controller.ts
│   │   ├── audit.service.ts
│   │   └── audit.entity.ts
│   ├── database/
│   │   ├── database.module.ts      # TypeORM/Prisma config
│   │   └── migrations/
│   ├── config/
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   └── jwt.config.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── logger.middleware.ts
│   │   └── error-handler.ts
│   └── main.ts                      # Entry point
├── .env.example
├── docker-compose.yml               # PostgreSQL + Redis
├── package.json
└── README.md
\`\`\`

### Stack Backend Recomendado

**Opção 1: NestJS + TypeScript (Recomendado)**
\`\`\`bash
npm i -g @nestjs/cli
nest new backend-crm-ia
cd backend-crm-ia

# Dependências principais
npm install @nestjs/common @nestjs/core @nestjs/platform-express
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @nestjs/typeorm typeorm pg
npm install redis ioredis
npm install @nestjs/bull bull
npm install nodemailer
npm install axios dotenv
\`\`\`

**Opção 2: FastAPI + Python**
\`\`\`bash
pip install fastapi uvicorn
pip install sqlalchemy psycopg2-binary
pip install redis
pip install python-jose[cryptography]
pip install pydantic
pip install aiohttp
\`\`\`

**Opção 3: Rails + Ruby**
\`\`\`bash
rails new backend-crm-ia --api --database=postgresql --skip-javascript
bundle add jwt
bundle add redis
bundle add sidekiq
bundle add openai  # ou anthropic
\`\`\`

---

## 🔗 Integrando Frontend com Backend

### 1. Substitua as API Routes

No frontend, altere o arquivo `lib/api.ts`:

\`\`\`typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = \`Bearer \${token}\`;
  }

  const response = await fetch(\`\${API_URL}\${endpoint}\`, {
    ...options,
    headers,
  });

  if (!response.ok) throw new Error('API Error');
  return response.json();
}

// Exemplo de uso
export const authAPI = {
  login: (email: string, password: string) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};
\`\`\`

### 2. Configure Variáveis de Ambiente

Crie `.env.local`:

\`\`\`env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_NAME=CRM System

# Se usar Supabase para dados
NEXT_PUBLIC_SUPABASE_URL=seu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key
\`\`\`

### 3. Deploy com Backend

\`\`\`bash
# Backend (porta 3001)
cd backend-crm-ia
npm start  # ou rails s -p 3001

# Frontend (porta 3000)
cd crm-system
npm run dev
\`\`\`

---

## 🤖 Integrando IA/ML

### Exemplos de Features com IA

#### 1. Sugestão Automática de Tasks
\`\`\`typescript
// Backend endpoint
POST /api/ai/suggest-tasks
Body: {
  projectId: string
  description: string
}

Response: [
  { title: "Setup database", priority: "high" },
  { title: "Configure API", priority: "high" },
  ...
]
\`\`\`

#### 2. Análise de Projetos
\`\`\`typescript
// Gera insights sobre status do projeto
POST /api/ai/analyze-project
Body: { projectId: string }

Response: {
  summary: "2 tasks atrasadas, 5 em progresso",
  risks: ["Prazo apertado", "Recursos limitados"],
  suggestions: ["Aumentar prioridade de X", "Adicionar recurso em Y"]
}
\`\`\`

#### 3. Geração de Descrições
\`\`\`typescript
// IA gera descrição a partir do título
POST /api/ai/generate-description
Body: { title: "Build user dashboard" }

Response: {
  description: "Create a responsive user dashboard with..."
}
\`\`\`

#### 4. Agendamento Inteligente
\`\`\`typescript
// IA sugere datas ideais
POST /api/ai/suggest-deadline
Body: {
  taskId: string
  workload: number
  teamSize: number
}

Response: {
  suggestedDate: "2025-01-15",
  confidence: 0.85
}
\`\`\`

### Providers de IA Recomendados

1. **OpenAI**: GPT-4, perfeito para análise e geração
2. **Anthropic Claude**: Melhor para análise complexa
3. **Groq**: Rápido e eficiente para chat
4. **Local LLM**: Ollama para privacidade
5. **Hugging Face**: Modelos open-source

### Exemplo Backend com OpenAI

\`\`\`typescript
// backend/src/ai/ai.service.ts (NestJS)
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async suggestTasks(projectDescription: string): Promise<any[]> {
    const message = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Você é um assistente de gerenciamento de projetos.',
        },
        {
          role: 'user',
          content: \`Dado este projeto: "\${projectDescription}", sugerindo 5 tasks.\`,
        },
      ],
    });

    return this.parseTasksFromAI(message.content[0].text);
  }
}
\`\`\`

---

## 📊 Estrutura de Banco de Dados (Backend)

### Schema PostgreSQL Recomendado

\`\`\`sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  cover_image_url VARCHAR(255),
  priority VARCHAR(50),
  deadline DATE,
  suggested_value DECIMAL(10, 2),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Participants
CREATE TABLE project_participants (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  user_id UUID REFERENCES users(id),
  role VARCHAR(50),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, user_id)
);

-- Tasks
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  project_id UUID REFERENCES projects(id),
  assigned_to UUID REFERENCES users(id),
  priority VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Comments
CREATE TABLE comments (
  id UUID PRIMARY KEY,
  content TEXT NOT NULL,
  project_id UUID REFERENCES projects(id),
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action VARCHAR(100),
  entity_type VARCHAR(100),
  entity_id UUID,
  changes JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(100),
  title VARCHAR(255),
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

---

## 🐳 Docker Compose para Backend

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: crm_db
      POSTGRES_USER: crm_user
      POSTGRES_PASSWORD: crm_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
\`\`\`

Inicie com:
\`\`\`bash
docker-compose up -d
\`\`\`

---

## 📋 Checklist de Integração

- [ ] Backend rodando na porta 3001
- [ ] Banco de dados PostgreSQL conectado
- [ ] JWT configurado e funcionando
- [ ] CORS habilitado no backend
- [ ] Variáveis de ambiente configuradas
- [ ] API de autenticação testada
- [ ] CRUD de projects sincronizado
- [ ] Tasks com notificações
- [ ] AI service integrado (opcional)
- [ ] Email queue configurada

---

## 📁 Estrutura de Pastas (Frontend)

\`\`\`
├── app/
│   ├── page.tsx                 # Login & Register
│   ├── dashboard/
│   │   ├── page.tsx            # Dashboard principal
│   │   ├── project/[id]/       # Detalhe do projeto
│   │   ├── tasks/              # Página de tasks
│   │   ├── notes/              # Notas pessoais
│   │   ├── audit/              # Audit logs
│   │   ├── profile/            # Perfil do usuário
│   │   └── settings/           # Configurações
│   ├── api/
│   │   ├── auth/               # Autenticação (substituir por backend)
│   │   ├── projects/           # Projetos CRUD
│   │   ├── tasks/              # Tasks CRUD
│   │   ├── comments/           # Comentários
│   │   ├── notifications/      # Notificações
│   │   └── audit-logs/         # Registros
│   └── globals.css             # Tema pastel
├── components/
│   ├── dashboard-layout.tsx    # Layout principal
│   ├── sidebar.tsx             # Sidebar navegação
│   ├── top-bar.tsx             # Barra superior
│   ├── project-card.tsx        # Card de projeto
│   ├── project-grid.tsx        # Grid de projetos
│   ├── mesa-header.tsx         # Header workspace
│   ├── mesa-content.tsx        # Conteúdo workspace
│   ├── task-card.tsx           # Card de task
│   ├── task-list.tsx           # Lista de tasks
│   ├── user-menu.tsx           # Menu do usuário
│   └── notifications-panel.tsx # Painel de notificações
├── lib/
│   ├── auth.ts                 # JWT e autenticação
│   ├── storage.ts              # In-memory database (remover)
│   ├── api.ts                  # Cliente de API
│   └── utils.ts                # Utilitários
└── hooks/
    ├── use-theme.ts            # Hook de tema
    └── use-notifications.ts    # Hook de notificações
\`\`\`

## 🎨 Cores Pastel (Paleta)

### Light Mode
- **Background**: `oklch(0.98 0.002 280)` - Branco suave
- **Primary**: `oklch(0.6 0.15 280)` - Azul pastel
- **Secondary**: `oklch(0.85 0.08 180)` - Teal pastel
- **Accent**: `oklch(0.7 0.12 45)` - Amarelo pastel
- **Destructive**: `oklch(0.6 0.2 30)` - Vermelho pastel

### Dark Mode
- **Background**: `oklch(0.15 0.01 280)` - Preto elegante
- **Primary**: `oklch(0.7 0.14 280)` - Azul luminoso
- **Secondary**: `oklch(0.45 0.06 180)` - Teal escuro
- **Card**: `oklch(0.22 0.01 280)` - Card com profundidade

---

## 🚀 Como Executar

### Desenvolvimento Completo (Frontend + Backend)

**Terminal 1 - Backend:**
\`\`\`bash
cd backend-crm-ia
docker-compose up -d  # Inicia PostgreSQL + Redis
npm install
npm run dev           # Backend na porta 3001
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd crm-system
npm install
npm run dev           # Frontend na porta 3000
\`\`\`

### Build para Produção

\`\`\`bash
# Frontend
npm run build
npm run start

# Backend
npm run build
npm run start
\`\`\`

---

## 🌐 Deployment

### Frontend no Vercel
\`\`\`bash
vercel deploy
\`\`\`

Adicione variável de ambiente:
\`\`\`
NEXT_PUBLIC_API_URL=https://seu-backend.com/api
\`\`\`

### Backend no Render / Railway / Heroku
\`\`\`bash
# Com docker
docker build -t backend-crm-ia .
docker push seu-registry/backend-crm-ia
\`\`\`

---

## 📚 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [OpenAI API](https://platform.openai.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [Redis Docs](https://redis.io/documentation)
- [Framer Motion](https://www.framer.com/motion)

---

## 📝 Licença

MIT

---

**Desenvolvido com ❤️ para elevar sua produtividade**
