<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Pagges Backend

# Project setup

## Clone the repository

```bash
git clone https://tools.ages.pucrs.br/pagges/pagges-backend.git
cd pagges-backend
```

## Install NodeJS

- Download and install NodeJS from the official website: [https://nodejs.org](https://nodejs.org)

- Install the `Prettier` extension in VSCode;

## Compile and run the project

Install package dependencies, performing the command below:

```bash
$ npm install
```

## Install Docker

- Instale o Docker so site oficial: [https://www.docker.com/get-started](https://www.docker.com/get-started)

## Environment Variables

Copie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente necessárias.

```bash
PORT=8080
DATABASE_URL=postgresql://postgres:12345678@localhost:5432/pagges?schema=public
```

## Database

Para inicializar o banco de dados Postgres, execute o seguinte comando:

```bash
docker compose up -d
```

## Prisma

Para rodar as migrations do Prisma e criar as entidades no banco de dados definidas no shema.prisma, execute o seguinte comando:

```bash
npx prisma migrate deploy
```

Para popular o banco de dados com dados iniciais, execute o seguinte comando:

```bash
npx prisma db seed
```

Para rodar o projeto:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

Para rodar os testes:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Prisma

- Para criar uma nova migration, utilize o comando abaixo, substituindo `<migration-name>` pelo nome desejado para a migration:

```bash
npx prisma migrate dev --name <migration-name>
```

O comando acima deve ser executado quando existe uma alteração em alguma model definida no schema.prisma.

# Branch Naming Convention

## Format

### Types:

- `feature/` → For new features
- `fix/` → For bug fixes
- `refactor/` → For code refactoring or improvements

### Examples:

- `feature/US-01-login-page`
- `fix/US-02-login-error`
- `refactor/US-03-optimize-api-calls`

### Rules:

1. **US-XX**: Represents the user story or issue number.
2. **SHORT-NAME**: A concise description of the feature, fix, or refactor.
3. **Use lowercase** for the short name and separate words with hyphens (`-`).
4. **Keep it short and meaningful**.

This ensures consistency across branches and makes it easier to track work in progress.

# Commit Message Conventions

- The `<TYPE>` defines the purpose of the commit.
- The `<Short description>` should be concise and written in **present tense** (e.g., "add login validation" instead of "added login validation").

---

## Commit Types:

- **feat**: A new feature  
  _Example:_ `feat: add user profile page`
- **fix**: A bug fix  
  _Example:_ `fix: resolve login validation error`
- **refactor**: Code restructuring without changing behavior  
  _Example:_ `refactor: improve authentication logic`
- **docs**: Documentation updates  
  _Example:_ `docs: update README with setup instructions`
- **style**: Code style changes (formatting, missing semi-colons, etc.), no functional changes  
  _Example:_ `style: fix indentation in settings component`
- **test**: Adding or updating tests  
  _Example:_ `test: add unit tests for login service`
- **chore**: Maintenance tasks, dependencies updates, or build process changes  
  _Example:_ `chore: update eslint dependencies`
- **perf**: Performance improvements  
  _Example:_ `perf: optimize database query for faster response time`
- **ci**: Continuous integration updates  
  _Example:_ `ci: add GitHub Actions workflow for testing`
- **build**: Changes that affect the build system or external dependencies  
  _Example:_ `build: upgrade Webpack to version 5`

---

## Additional Guidelines:

1. **Use lowercase** for commit types.
2. **Keep descriptions concise** but meaningful.
3. **Use imperative mood** (_"fix issue"_, not _"fixed issue"_).
4. **Reference issues if applicable** (e.g., `fix: resolve login issue (#123)`).
5. **Use multiple types when needed**  
   _Example:_ `feat(auth): add JWT token refresh`

---

Following this convention improves clarity, makes commits easier to read, and integrates well with tools like **Conventional Commits**, **Semantic Versioning**, and **Changelogs**.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Logging

This project uses a Singleton logger named `PaggesLogger` for logging purposes. The `PaggesLogger` is a custom logger service that wraps the Winston logger, providing a consistent and centralized way to handle logging throughout the application.

### Setting Up the Logger

The `PaggesLogger` is configured in the `winston-logger.config.ts` file, which defines the transports and formatting for the logs. The logger is then initialized and set up in the `main.ts` file.

### Using the Logger

To use the `PaggesLogger` in your controllers, services, or any other part of the application, simply import and use it as shown below:

```typescript
import { PaggesLogger } from 'src/config/winston-logger/pagges-logger.utils'

@Controller('example-module')
export class ExampleModuleController {
  constructor(private readonly exampleModuleService: ExampleModuleService) {}

  @Get('/hello')
  hello() {
    PaggesLogger.log('Testing info log')
    PaggesLogger.error('Testing error log')
    PaggesLogger.warn('Testing warn log')
    PaggesLogger.debug('Testing debug log')
    PaggesLogger.http('Testing http log')
    return 'Hello from example'
  }
}
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License Below

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
# pagges_back
