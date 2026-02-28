# Mission Control - Notification Routing Strategy

**Objetivo**: Notificar squads de forma contextual e inteligente, reduzindo ruído e aumentando relevância.

---

## 📊 Arquitetura

### Princípios
1. **Notificação Contextual**: Cada squad só recebe o que é relevante para ele
2. **Central para Geral**: Central recebe notificações gerais e resumos
3. **Rafael recebe tudo**: Telegram pessoal + resumo na Central
4. **Redundância Inteligente**: Bloqueios críticos vão para múltiplos canais

---

## 🎯 Mapeamento Squad → WhatsApp Group

```json
{
  "youtube-content": "120363424196533902@g.us",
  "copywriting": "120363406587885552@g.us",
  "full-stack-dev": "120363406026510701@g.us",
  "deep-scraper": "120363423300665938@g.us",
  "project-management": "120363407597476119@g.us",
  "orquestrador": "120363406314822971@g.us",
  "content-ecosystem": "120363404710981133@g.us",
  "squad-creator": "120363406656215906@g.us",
  "infoproduct-creation": "120363422153688546@g.us",
  "sales": "120363405780687881@g.us",
  "conselho": "120363425327638973@g.us",
  "design-system": "120363423380627383@g.us",
  "creative-studio": "120363425012662387@g.us",
  "youtube-lives": "120363404442774199@g.us",
  "data-analytics": "120363422673222745@g.us",
  "media-buy": "120363405238158159@g.us",
  "funnel-creator": "120363426405865296@g.us",
  "devops": "120363423692903314@g.us"
}
```

---

## 📱 Canais de Notificação

### Rafael (Admin)
- **Telegram**: `726437877`
- **WhatsApp Central**: `120363406314168390@g.us`

### Squads
- Cada squad tem seu grupo WhatsApp dedicado

### Fallback
- Sem squad definido → **Central**

---

## 🔔 Regras de Roteamento por Workflow

### 1. Nova Demanda no Inbox

```javascript
// Lógica n8n:
const squad = task.customFields.find(f => f.name === "Squad")?.value;
const chatIds = [];

// 1. Notificar squad específico
if (squad && SQUAD_GROUPS[squad]) {
  chatIds.push(SQUAD_GROUPS[squad]);
} else {
  // Sem squad → Central
  chatIds.push(CENTRAL_GROUP);
}

// 2. Sempre notificar Rafael via Telegram
chatIds.push({
  type: "telegram",
  id: RAFAEL_TELEGRAM_ID
});

return chatIds;
```

**Mensagem**:
```
🆕 Nova demanda: {título}
Squad: {squad ou "Geral"}
Solicitado por: {requester}
Prioridade: {priority}

📎 {clickup_url}
```

---

### 2. Status Alterado

```javascript
const squad = task.customFields.find(f => f.name === "Squad")?.value;
const oldStatus = event.historyItems[0].before.status;
const newStatus = event.historyItems[0].after.status;
const chatIds = [];

// 1. Notificar squad específico
if (squad && SQUAD_GROUPS[squad]) {
  chatIds.push(SQUAD_GROUPS[squad]);
}

// 2. Se moveu para "Done" → notificar Central também
if (newStatus === "done") {
  chatIds.push(CENTRAL_GROUP);
}

// 3. Sempre notificar Rafael via Telegram
chatIds.push({
  type: "telegram",
  id: RAFAEL_TELEGRAM_ID
});

return chatIds;
```

**Mensagem**:
```
📊 {título}
Status: {oldStatus} → {newStatus}
Squad: {squad}
Assignee: {assignee}

📎 {clickup_url}
```

---

### 3. Daily Digest (9h)

```javascript
// Buscar tasks por squad
const tasksBySquad = groupTasksBySquad(tasks);
const chatIds = [];

// 1. Enviar resumo para Central
chatIds.push({
  type: "whatsapp",
  id: CENTRAL_GROUP,
  message: generateGlobalDigest(tasks)
});

// 2. Enviar resumo específico para cada squad
Object.keys(tasksBySquad).forEach(squad => {
  if (SQUAD_GROUPS[squad]) {
    chatIds.push({
      type: "whatsapp",
      id: SQUAD_GROUPS[squad],
      message: generateSquadDigest(squad, tasksBySquad[squad])
    });
  }
});

// 3. Rafael recebe resumo completo via Telegram
chatIds.push({
  type: "telegram",
  id: RAFAEL_TELEGRAM_ID,
  message: generateAdminDigest(tasks, tasksBySquad)
});

return chatIds;
```

**Mensagem (Central)**:
```
📊 Resumo Diário - Mission Control

📥 Inbox: {count} tasks
⏳ Aguardando aprovação: {count}
🚧 Bloqueadas: {count}
✅ Concluídas hoje: {count}

Por Squad:
• youtube-content: {count} tasks
• copywriting: {count} tasks
• full-stack-dev: {count} tasks
...
```

**Mensagem (Squad Específico)**:
```
📊 Resumo Diário - {Squad Name}

📥 No Inbox: {count}
⏳ Aguardando aprovação: {count}
🚧 Bloqueadas: {count}
✅ Concluídas hoje: {count}

Top 3 prioridades:
1. {task_title}
2. {task_title}
3. {task_title}
```

---

### 4. Blocked Alert (Cron 6h em 6h)

```javascript
const blockedTasks = tasks.filter(t =>
  t.status.status === "blocked" &&
  isOlderThan(t.dateUpdated, 48) // >48h
);

const chatIds = [];

blockedTasks.forEach(task => {
  const squad = task.customFields.find(f => f.name === "Squad")?.value;

  // 1. Notificar squad
  if (squad && SQUAD_GROUPS[squad]) {
    chatIds.push({
      type: "whatsapp",
      id: SQUAD_GROUPS[squad],
      message: generateBlockedAlert(task)
    });
  }

  // 2. Bloqueio >48h → também notificar Central
  chatIds.push({
    type: "whatsapp",
    id: CENTRAL_GROUP,
    message: generateBlockedAlert(task)
  });

  // 3. Rafael via Telegram
  chatIds.push({
    type: "telegram",
    id: RAFAEL_TELEGRAM_ID,
    message: generateBlockedAlert(task)
  });
});

return chatIds;
```

**Mensagem**:
```
⚠️ BLOQUEIO CRÍTICO

{título}
Squad: {squad}
Bloqueada há: {duration}
Assignee: {assignee}
Motivo: {blocker_reason}

📎 {clickup_url}
```

---

## 🔧 Variáveis de Ambiente (.env)

```bash
# Admin (Rafael)
MISSION_CONTROL_TELEGRAM_CHAT_ID=726437877
MISSION_CONTROL_WHATSAPP_CENTRAL=120363406314168390@g.us

# Squad Groups
MISSION_CONTROL_WHATSAPP_YOUTUBE_CONTENT=120363424196533902@g.us
MISSION_CONTROL_WHATSAPP_COPYWRITING=120363406587885552@g.us
MISSION_CONTROL_WHATSAPP_FULL_STACK_DEV=120363406026510701@g.us
MISSION_CONTROL_WHATSAPP_DEEP_SCRAPER=120363423300665938@g.us
MISSION_CONTROL_WHATSAPP_PROJECT_MANAGEMENT=120363407597476119@g.us
MISSION_CONTROL_WHATSAPP_ORQUESTRADOR=120363406314822971@g.us
MISSION_CONTROL_WHATSAPP_CONTENT_ECOSYSTEM=120363404710981133@g.us
MISSION_CONTROL_WHATSAPP_SQUAD_CREATOR=120363406656215906@g.us
MISSION_CONTROL_WHATSAPP_INFOPRODUCT_CREATION=120363422153688546@g.us
MISSION_CONTROL_WHATSAPP_SALES=120363405780687881@g.us
MISSION_CONTROL_WHATSAPP_CONSELHO=120363425327638973@g.us
MISSION_CONTROL_WHATSAPP_DESIGN_SYSTEM=120363423380627383@g.us
MISSION_CONTROL_WHATSAPP_CREATIVE_STUDIO=120363425012662387@g.us
MISSION_CONTROL_WHATSAPP_YOUTUBE_LIVES=120363404442774199@g.us
MISSION_CONTROL_WHATSAPP_DATA_ANALYTICS=120363422673222745@g.us
MISSION_CONTROL_WHATSAPP_MEDIA_BUY=120363405238158159@g.us
MISSION_CONTROL_WHATSAPP_FUNNEL_CREATOR=120363426405865296@g.us
MISSION_CONTROL_WHATSAPP_DEVOPS=120363423692903314@g.us
```

---

## 📊 Matriz de Notificação

| Evento | Squad Group | Central | Rafael Telegram |
|--------|-------------|---------|-----------------|
| Nova demanda com squad | ✅ | ❌ | ✅ |
| Nova demanda sem squad | ❌ | ✅ | ✅ |
| Status alterado | ✅ | Só se "Done" | ✅ |
| Daily digest | ✅ (específico) | ✅ (global) | ✅ (completo) |
| Bloqueio crítico | ✅ | ✅ | ✅ |

---

## 🎛️ Configuração n8n

### Módulo Helper: Squad Router

Criar nó reusável em cada workflow:

```javascript
// Nome: "Route to Squad Groups"
// Type: Function

const SQUAD_GROUPS = {
  "youtube-content": "120363424196533902@g.us",
  "copywriting": "120363406587885552@g.us",
  // ... todos os outros
};

const CENTRAL_GROUP = "120363406314168390@g.us";
const RAFAEL_TELEGRAM = "726437877";

function routeNotification(task, eventType) {
  const squad = task.customFields?.find(f => f.name === "Squad")?.value;
  const destinations = [];

  // Lógica de roteamento baseada no eventType
  switch(eventType) {
    case "new_task":
      if (squad && SQUAD_GROUPS[squad]) {
        destinations.push({ type: "whatsapp", id: SQUAD_GROUPS[squad] });
      } else {
        destinations.push({ type: "whatsapp", id: CENTRAL_GROUP });
      }
      destinations.push({ type: "telegram", id: RAFAEL_TELEGRAM });
      break;

    case "status_changed":
      if (squad && SQUAD_GROUPS[squad]) {
        destinations.push({ type: "whatsapp", id: SQUAD_GROUPS[squad] });
      }
      if (task.status.status === "done") {
        destinations.push({ type: "whatsapp", id: CENTRAL_GROUP });
      }
      destinations.push({ type: "telegram", id: RAFAEL_TELEGRAM });
      break;

    case "blocked_alert":
      if (squad && SQUAD_GROUPS[squad]) {
        destinations.push({ type: "whatsapp", id: SQUAD_GROUPS[squad] });
      }
      destinations.push({ type: "whatsapp", id: CENTRAL_GROUP });
      destinations.push({ type: "telegram", id: RAFAEL_TELEGRAM });
      break;
  }

  return destinations;
}

// Retornar para o workflow
return items.map(item => ({
  json: {
    ...item.json,
    destinations: routeNotification(item.json.task, item.json.eventType)
  }
}));
```

---

## 🧪 Testes

### 1. Teste de Roteamento por Squad
```bash
# Criar task de teste para youtube-content
# Verificar que notificação vai APENAS para:
# - Grupo YouTube Content
# - Telegram Rafael
# - NÃO vai para Central
```

### 2. Teste de Task Sem Squad
```bash
# Criar task sem preencher campo Squad
# Verificar que notificação vai para:
# - Central
# - Telegram Rafael
```

### 3. Teste de Bloqueio Crítico
```bash
# Marcar task como bloqueada há >48h
# Verificar que notificação vai para:
# - Grupo do squad
# - Central
# - Telegram Rafael
```

---

## 📈 Métricas de Sucesso

- [ ] Squads recebem apenas notificações relevantes
- [ ] Central recebe visão geral sem sobrecarga
- [ ] Rafael recebe tudo via Telegram
- [ ] Sem notificações duplicadas desnecessárias
- [ ] Bloqueios críticos têm redundância (squad + central)

---

_Criado em: 2026-02-07_
_Parte do Mission Control Phase 4 - Smart Notifications_
