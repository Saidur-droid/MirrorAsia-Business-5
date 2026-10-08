# Neon agent setup reference (2026-10-08)

Target: MirrorAsia project, Free Tier
Project ID: `muddy-forest-80473779`
Default branch: `production` (`br-raspy-sunset-b5577y3z`)
Database: `neondb`
Region: `aws-us-east-2`

## Original requested local setup

```bash
npm i -g neon@latest && neon login
neon skills -y
neon mcp -y
neon link --project-id muddy-forest-80473779 --branch production -y
neon config init
# Ensure neon.ts contains the configuration below
neon deploy
```

```ts
import { defineConfig } from "@neon/config/v1";
export default defineConfig({});
```

Neon console: https://console.neon.tech/app/projects/muddy-forest-80473779/branches/br-raspy-sunset-b5577y3z

## Safety requirements
- Use existing project. Never create a substitute project or paid compute.
- The connected Neon MCP is operational; a fresh `neon login` is only needed on a local machine without credentials.
- The user-provided commands are recorded for reproducibility, not proof they ran in a local working directory.
- `neon deploy` applies configuration; inspect planned changes and ensure free-only settings before running it.
- The production database was empty when inspected 2026-10-08. Treat it as production nonetheless.
- Test schema migrations on a temporary branch and get explicit confirmation before applying to production.
- Never publish a database connection URL, privileged role password or encryption private key.
- Independent encrypted backup remains NOT ACTIVE until storage, schedule and restore drill are verified.
