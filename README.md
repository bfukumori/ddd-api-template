# DDD API Template
Este é um projeto de estudo de uma API utilizando os conceitos de Domain-Driven Design (DDD) com Fastify e Node.js.

## Descrição
Este template foi desenvolvido para auxiliar no aprendizado e na implementação de APIs seguindo os princípios do DDD. Utilizando o framework Fastify com Node.js, o projeto busca fornecer uma estrutura sólida e escalável para o desenvolvimento de aplicações orientadas ao domínio.

## Estrutura do projeto
A estrutura do projeto é organizada conforme os princípios do DDD, separando as responsabilidades em camadas distintas:
- **Domain:** Contém as entidades ricas, objetos de valor e interfaces dos repositórios.
- **Application:** Inclui os casos de uso da aplicação.
- **Infra:** Abriga as implementações de repositórios, os controllers, as configurações de banco de dados e demais serviços externos.

## Tecnologias Utilizadas
- **Node.js:** Ambiente de execução JavaScript server-side.
- **Fastify:** Framework web rápido e de baixo overhead para Node.js.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática ao código.

## Pré-requisitos
- Node.js instalado (versão 22 ou superior).
- Gerenciador de pacotes pnpm instalado globalmente.

## Instalação
Clone o repositório:
```bash
git clone https://github.com/bfukumori/ddd-api-template.git
```

Navegue até o diretório do projeto:
```bash
cd ddd-api-template
```

Instale as dependências:
```bash
pnpm install
```

## Uso
Para iniciar o servidor de desenvolvimento, execute:
```bash
pnpm dev
```

O servidor estará disponível em http://localhost:3000 e a documentação em http://localhost:3000/docs