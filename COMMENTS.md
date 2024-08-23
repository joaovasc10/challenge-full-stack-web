# Documentação do Projeto

## Arquitetura

Utilizei a arquitetura MVC (Model-View-Controller) para organizar o projeto. A arquitetura MVC é uma abordagem amplamente utilizada para desenvolver aplicações web, pois separa a aplicação em três componentes principais:

- **Model**: Responsável pela camada de dados da aplicação. No nosso caso, utilizamos o Prisma para interagir com o banco de dados.
- **View**: Responsável pela interface do usuário. Utilizamos o Vue.js e Vuetify para construir a interface do usuário.
- **Controller**: Responsável por gerenciar a lógica da aplicação e a comunicação entre o Model e a View. Os controladores foram implementados em Node.js utilizando Fastify.

A escolha da arquitetura MVC foi baseada na minha familiaridade com ela, especialmente por trabalhar com PHP utilizando essa abordagem. A separação clara entre as camadas facilita a manutenção e escalabilidade do projeto.

## Bibliotecas Utilizadas

### Backend

- **Fastify**: Utilizado para a criação de rotas e gerenciamento de requisições HTTP. Fastify é um framework web rápido e de baixo overhead para Node.js.
- **Zod**: Utilizado para validação de dados. Zod é uma biblioteca de validação e parsing de esquemas que facilita a definição de regras de validação para os dados.
- **Prisma**: Utilizado como ORM (Object-Relational Mapping) para interagir com o banco de dados. Prisma facilita a manipulação de dados e a execução de consultas SQL.
- **jsonwebtoken (JWT)**: Utilizado para autenticação no backend. JWT (JSON Web Token) é um padrão aberto que permite a transmissão segura de informações entre as partes como um objeto JSON. No nosso caso, utilizamos JWT para autenticar e autorizar usuários nas rotas protegidas da API.


### Frontend

- **Vue.js**: Framework JavaScript utilizado para construir a interface do usuário. Vue.js é conhecido por sua facilidade de uso e flexibilidade.
- **Vuetify**: Framework de UI baseado em Material Design para Vue.js. Vuetify fornece uma ampla gama de componentes prontos para uso, facilitando a construção de interfaces modernas e responsivas.

## Banco de Dados

- **PostgreSQL**: Escolhi o PostgreSQL como banco de dados devido à sua robustez, escalabilidade e suporte a recursos avançados como transações ACID, índices complexos e extensões. PostgreSQL é um banco de dados relacional de código aberto amplamente utilizado em aplicações web.

## Docker

- **Docker**: Utilizei o Docker para rodar o banco de dados PostgreSQL em um contêiner. O Docker facilita a configuração e o gerenciamento de ambientes de desenvolvimento, garantindo que o banco de dados seja executado de forma consistente em diferentes máquinas. Com o Docker, é possível criar, implantar e executar aplicações em contêineres, que são ambientes isolados e portáteis.

## Melhorias Futuras

Se tivesse mais tempo, eu melhoraria os seguintes aspectos do projeto:

- **Testes de Unidade**: Adicionar testes de unidade para garantir a qualidade e a robustez do código.
- **Documentação**: Melhorar a documentação do código e da API para facilitar a compreensão e manutenção do projeto.
- **Segurança**: Implementar autenticação e autorização para proteger as rotas e os dados sensíveis.
- **Tratamento de Erros**: Melhorar o tratamento de erros para fornecer mensagens de erro mais claras e úteis.
