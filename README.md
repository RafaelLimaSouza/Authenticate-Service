### Definition

- Construir uma aplicação pra atendimento de alguns critérios de segurança simulando o processo de autenticação
- Business Roles:

  1. Not is possible create an user with same userId.
  2. The system created first password.
  3. Necessary password crypto.
  4. Send initial password through email.
  5. The first access has limit until 30 minutes. After the userId shell to be cancelled.

  Força da senha

  - <= 30 = fraca - tamanho < 7 e letras e numéros a e A
  - > 30 e <= 55 = média - tamanho < 7 e letras, numéros e carac esp
  - > 45 = alto - tamanho > 7 e letras, numéros e carac esp

### Languages

- Typescript
- NodeJS

### Frameworks or Libraries

- Express
- TypeORM
- PostgreSQL
- Bcrypt
- Crypto
- Date-Fns e Date-Fns-Tz
- NodeMailer
- Uuid

### How do it work?

- The app run into a docker container because is compatible in any environment (Windows or Linux).
- In the BackEnd has NodeJS controling workflow.

### Step-to-Steop for running

1. Install the docker environment (docker, docker-compose, docker engine)

2. yarn install

3. Run command docker-compose up
