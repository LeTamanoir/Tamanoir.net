![github website banner](https://user-images.githubusercontent.com/51637671/188202829-06198570-803d-4818-823f-2e4e9d559e56.svg)

## Commands

#### Development :

Client:

```bash
npm run client:dev
```

Server:

```bash
npm run server:dev
```

#### Production :

Server:

```bash
npm run prod   # which is (npm run client:build && NODE_ENV=production PORT=3000 npm run server:prod)
```

Generate password hash with `./scripts/genpass.sh` and change `server/.env` variables :

```text
SECRET_PASSWORD = long random string (at least 32 chars long)
POSTS_DIR       = posts directory
BLOG_USERNAME   = username
BLOG_PASSWORD   = password hash
```
