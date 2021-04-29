### Definition

- Build an application to meet some security criteria simulating the authentication process.

- Business Roles:

1. Not is possible create an user with same userId.
2. The system created first password.
3. Necessary password crypto.
4. Send initial password through email.
5. The first access has limit until 30 minutes. After the userId shell to be cancelled.

### Password Strength

- Role: <= 30 = low - size < 7 , letters e numbers a e A
- Role: > 30 e <= 55 = medium - size < 7 e letters, numbers and special character
- Role: > 45 = high - size > 7, letters, numbers and special character

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

### Step-to-Step for running

1. Install the docker environment (docker, docker-compose, docker engine)

2. yarn install

3. Run command docker-compose up
