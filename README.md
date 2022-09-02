![github website banner](https://user-images.githubusercontent.com/51637671/188202829-06198570-803d-4818-823f-2e4e9d559e56.svg)

## Tamanoir.net

#### Development :

client:

```bash
npm run start
```

server:

```bash
npm run server:dev
```

#### Production :

server:

```bash
npm run prod
```

generate password hash with `./scripts/genpass.sh` and change `server/.env` variables :

```text
SECRET_PASSWORD = long random password (at least 32 chars long)
POSTS_DIR       = posts directory
BLOG_USERNAME   = username
BLOG_PASSWORD   = password hash
```
