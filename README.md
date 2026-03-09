# CI Test - Pipeline de Integração Contínua

Este repositório contém um exemplo de pipeline de Continuous Integration (CI) para uma aplicação React com TypeScript e Vite, utilizando GitHub Actions. O pipeline é configurado para executar testes, linting e build a cada push na branch principal, garantindo a qualidade do código e a estabilidade da aplicação.

## 1. Descrição do Projeto

Uma aplicação React com TypeScript e Vite, configurada com um pipeline completo de Continuous Integration utilizando GitHub Actions. O projeto implementa automação de testes, linting e build para garantir a qualidade do código a cada push na branch principal.

## 2. Objetivo da Atividade

O objetivo deste pipeline é automatizar o processo de integração contínua, garantindo que:

- Todos os testes unitários sejam executados automaticamente
- O código seja validado contra as regras de linting (ESLint)
- A aplicação seja compilada com sucesso antes de qualquer merge
- Problemas sejam detectados precocemente no ciclo de desenvolvimento

## 3. Estrutura do Projeto

``` bash
ci-test/
├── .github/
│   └── workflows/
│       └── ci.yml              # Configuração do pipeline CI
├── src/                        # Código fonte da aplicação
│   ├── App.tsx                 # Componente principal
│   ├── App.test.tsx            # Testes do componente
│   ├── main.tsx                # Entry point
│   └── test/
│       └── setup.ts            # Configuração dos testes
├── public/                     # Arquivos estáticos
├── package.json                # Dependências e scripts
├── vite.config.ts              # Configuração do Vite
├── vitest.config.ts            # Configuração do Vitest
├── eslint.config.js            # Configuração do ESLint
├── tsconfig.json               # Configuração do TypeScript
└── README.md                   # Documentação do projeto
```

## 4. Explicação do Workflow

O arquivo `.github/workflows/ci.yml` define o pipeline de CI com três jobs independentes:

### Configuração do Trigger

```yaml
on: 
  push:
    branches: [main]
```

- O pipeline é executado automaticamente a cada push na branch `main`

### Job 1: Test

```yaml
test:
  runs-on: ubuntu-latest

  steps:
      - name: "Checkout code"
        uses: actions/checkout@v2

      - name: "Setup Node.js"
        uses: actions/setup-node@v2
        with:
          node-version: '20'

      - name: "Install dependencies"
        run: npm install

      - name: "Run tests"
        run: npm run test
```

- **Checkout code**: Clona o repositório para o ambiente de execução
- **Setup Node.js**: Instala o Node.js versão 20
- **Install dependencies**: Executa `npm install` para instalar todas as dependências
- **Run tests**: Executa `npm run test` para rodar os testes unitários com Vitest

### Job 2: Lint

```yaml
lint:
  runs-on: ubuntu-latest

  steps:
      - name: "Checkout code"
        uses: actions/checkout@v2

      - name: "Setup Node.js"
        uses: actions/setup-node@v2
        with:
          node-version: '20'

      - name: "Install dependencies"
        run: npm install

      - name: "Run tests"
        run: npm run lint
```

- **Checkout code**: Clona o repositório
- **Setup Node.js**: Instala o Node.js versão 20
- **Install dependencies**: Instala as dependências do projeto
- **Run linter**: Executa `npm run lint` para validar o código contra as regras do ESLint

### Job 3: Build

```yaml
build:
  runs-on: ubuntu-latest

  steps:
      - name: "Checkout code"
        uses: actions/checkout@v2

      - name: "Setup Node.js"
        uses: actions/setup-node@v2
        with:
          node-version: '20'

      - name: "Install dependencies"
        run: npm install

      - name: "Run tests"
        run: npm run build
```

- **Checkout code**: Clona o repositório
- **Setup Node.js**: Instala o Node.js versão 20
- **Install dependencies**: Instala as dependências necessárias
- **Run build**: Executa `npm run build` para compilar a aplicação React para produção

## 5. Fluxo do Pipeline

``` bash
Push na branch main
        ↓
Trigger do GitHub Actions
        ↓
    ┌───┴───┬───────┐
    ↓       ↓       ↓
  Test    Lint    Build
    │       │       │
    └───┬───┴───┬───┘
        ↓
   Resultado
  (✅ ou ❌)
```

**Detalhamento do fluxo:**

1. **Desenvolvedor faz push** para a branch `main`
2. **GitHub Actions detecta** o push e inicia o workflow
3. **Três jobs executam em paralelo**:
   - Job de testes valida a funcionalidade
   - Job de lint valida o padrão de código
   - Job de build valida a compilação
4. **Cada job reporta** seu status (sucesso ou falha)
5. **Pipeline completa** quando todos os jobs terminam

## 6. Resultado da Execução

Quando o pipeline é executado, os seguintes cenários podem ocorrer:

### ✅ Sucesso

- Todos os testes passam
- Código está conforme as regras de linting
- Build é gerado sem erros
- Badge verde no GitHub indica pipeline bem-sucedido
- Código está pronto para deploy

### ❌ Falha

- Se qualquer teste falhar → Job `test` falha
- Se houver violações de linting → Job `lint` falha
- Se a compilação quebrar → Job `build` falha
- Badge vermelha no GitHub indica problemas
- Desenvolvedor é notificado para corrigir os problemas

### Visualização dos Resultados

Os resultados podem ser visualizados em:

- **GitHub Actions tab**: Logs detalhados de cada job

---

## Tecnologias Utilizadas

- **React** - Biblioteca para construção de interfaces
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server
- **Vitest** - Framework de testes
- **ESLint** - Linter para JavaScript/TypeScript
- **GitHub Actions** - Automação de CI/CD
