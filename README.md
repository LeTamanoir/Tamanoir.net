![github website banner](https://user-images.githubusercontent.com/51637671/188202829-06198570-803d-4818-823f-2e4e9d559e56.svg)

## :rocket: My personnal website

#### Made with :

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

## :computer: Commands

#### Development :

```bash
# Client:
npm run client:dev

# Server:
npm run server:dev
```

#### Production :

```bash
npm run prod
```

Generate password hash :

```bash
npm run blog:password <password>
```

Change `server/.env` variables :

| Variable        | Description                                 |
| --------------- | ------------------------------------------- |
| SECRET_PASSWORD | Long random string (at least 32 chars long) |
| POSTS_DIR       | Posts directory                             |
| BLOG_USERNAME   | Username                                    |
| BLOG_PASSWORD   | Password hash                               |

### Benchmark

**express.static** VS **nginx static** (measured with [oha](https://github.com/hatoo/oha))

|                  | express (localhost)        | nginx static (localhost) | express (tamanoir.net)     | nginx static (tamanoir.net) |
| ---------------- | -------------------------- | ------------------------ | -------------------------- | --------------------------- |
| **req/s**        | 3805.8748                  | 35566.0796               | 290.7661                   | 1775.8587                   |
| **sec**          | 0.0131                     | 0.0014                   | 0.1653                     | 0.0275                      |
|                  |                            |                          |                            |                             |
| **improvements** | 35566 / 3805 = **9.34**    |                          | 1776 / 291 = **6.10**      |                             |
|                  | 0.0131 / 0.0014 = **9.35** |                          | 0.1653 / 0.0275 = **6.01** |                             |

**nginx static** is **9.3x** faster than **express** on localhost.
**nginx static** is **6xx** faster than **express** on the internet (tamanoir.net).
