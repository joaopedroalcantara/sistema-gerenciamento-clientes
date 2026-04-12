# 🏢 Empresa S.A - Sistema de Cadastro de Clientes e Contatos

> Um sistema completo **Full-Stack** para gerenciamento de clientes e seus respectivos contatos, desenvolvido com foco em regras de negócio consistentes, validações robustas e uma interface de usuário responsiva e dinâmica.

---

## 🎯 Visão Geral

Este projeto foi desenvolvido para fornecer uma plataforma **ágil e intuitiva** no cadastro e manutenção de dados de clientes. O sistema oferece:

- ✅ Registro de dados pessoais com validações matemáticas
- ✅ Gerenciamento flexível de múltiplos contatos (telefone e e-mail)
- ✅ Arquitetura bem definida em duas camadas claras

### 🔧 Stack Tecnológico

| Camada | Tecnologia |
|--------|-----------|
| **Backend** | Java 17 + Spring Boot + MySQL |
| **Frontend** | HTML5 + CSS3 + Vanilla JavaScript |
| **Padrão** | REST API + SPA (Single Page Application) |

---

## ✨ Funcionalidades

### 👤 Gerenciamento de Clientes

- [x] Cadastro de novos clientes *(Nome, CPF, Data de Nascimento e Endereço)*
- [x] Listagem completa de clientes cadastrados
- [x] Edição de dados do cliente existente
- [x] Exclusão de clientes
- [x] **Validação matemática de CPF** (bloqueio de CPFs inválidos)
- [x] **Validação de unicidade** (alerta para CPF duplicado)
- [x] **Validação de Data de Nascimento** (intervalo 1900 até data atual)

### 📞 Gerenciamento de Contatos

- [x] Adição de múltiplos contatos por cliente *(E-mail ou Telefone)*
- [x] Edição inline de contatos existentes
- [x] Exclusão de contatos
- [x] **Validação de Telefone** (mínimo 10 dígitos)
- [x] **Validação de E-mail** (presença de @ e tamanho mínimo)

### 🎨 Interface e Experiência

- [x] Navegação fluida sem recarregamento *(Manipulação de DOM)*
- [x] Tooltips informativas ao passar o cursor
- [x] Botões dinâmicos com feedback visual
- [x] Design responsivo e moderno

---

## 🏗️ Arquitetura do Projeto

```
PROJETO-CADASTRO-S.A/
├── backend/
│   ├── src/main/java/com/empresa/Sistema_Cadastro/
│   │   ├── business/           # Serviços e regras de negócio
│   │   ├── controller/         # Endpoints REST
│   │   ├── infrastructure/     # Repositórios e Banco de Dados
│   │   └── SistemaCadastroApplication.java
│   └── pom.xml
│
├── frontend/
│   ├── index.html              # Estrutura HTML
│   ├── style.css               # Estilização responsiva
│   └── app.js                  # Lógica e manipulação DOM
│
├── entregaveis/
│   ├── fluxograma.png          # Mapeamento visual
│   └── video-demonstrativo.mp4 # Demonstração em uso
│
├── SCRIPT.sql                  # Criação do Banco MySQL
└── README.md                   # Documentação
```

---

## 🚀 Como Executar

### Pré-requisitos

- ☕ **Java 17** ou superior
- 📦 **Maven** configurado
- 🗄️ **MySQL Server** na porta 3306

### 1️⃣ Configuração do Banco de Dados

**Passo 1:** Execute o script SQL
```bash
# No MySQL Workbench ou terminal
source SCRIPT.sql
```

**Passo 2:** Configure as credenciais
```properties
# backend/src/main/resources/application.properties

spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

### 2️⃣ Rodando o Backend

```bash
cd backend
mvn spring-boot:run
```

✅ API disponível em: **http://localhost:8080**

### 3️⃣ Rodando o Frontend

```bash
cd frontend
# Abra index.html em seu navegador
```

> 💡 **Dica:** O backend deve estar rodando para que os dados sejam carregados corretamente.

---

## 📚 Dependências

### Backend (Maven)
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
</dependency>
```

### Frontend
- **FontAwesome** (CDN) - Ícones
- **Fetch API** - Requisições HTTP
- **JavaScript Vanilla** - Lógica pura

---

## 🤖 Sobre o Desenvolvimento

Durante o desenvolvimento, foram utilizadas ferramentas de **Inteligência Artificial** (Gemini e ChatGPT) como assistentes de apoio para:

- 🔍 Resolução rápida de dúvidas pontuais
- 📖 Aprendizado de sintaxes específicas
- 🐛 Análise e debugging de erros

O impacto foi **altamente positivo**, otimizando o tempo de desenvolvimento e mantendo a qualidade do código em alta padrão.

---

## 📁 Entregáveis Adicionais

Acesse a pasta `/entregaveis` para visualizar:

| Arquivo | Descrição |
|---------|-----------|
| 📊 **fluxograma.png** | Mapeamento visual das regras de negócio |
| 🎬 **video-demonstrativo.mp4** | Demonstração do sistema em operação real |

---

## 🔗 Referências

- 📖 [Documentação Spring Boot](https://spring.io/projects/spring-boot)
- 📖 [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- 🎨 [FontAwesome Icons](https://fontawesome.com)

---

<div align="center">

**Desenvolvido como projeto de gerenciamento de dados - Empresa S.A** ✨

*João Pedro Alcantara* | 2026

</div>