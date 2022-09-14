---
title: Express.static VS Nginx static
description: Wich is the fastest ??
date: 14/09/2022
---

# express.static VS nginx static

I wanted to know the difference in speed between **express.static** and **nginx static**, so I made a little benchmark :

:warning: Note that **express.static** is behind an Nginx reverse proxy.

### Benchmark (measured with [oha](https://github.com/hatoo/oha))

|           | express.static (localhost) | nginx static (localhost) | express.static (tamanoir.net) | nginx static (tamanoir.net) |
| --------- | -------------------------- | ------------------------ | ----------------------------- | --------------------------- |
| **req/s** | 3805.8748                  | 35566.0796               | 290.7661                      | 2309.5644                   |
| **sec**   | 0.0131                     | 0.0014                   | 0.1653                        | 0.0216                      |

<br>

| localhost                  | internet (tamnoir.net)    |
| -------------------------- | ------------------------- |
| 35566 / 3805 = **9.34**    | 2310 / 291 = **7.9**      |
| 0.0131 / 0.0014 = **9.35** | 0.1653 / 0.0216 = **7.7** |

### Conclusion

**Nginx static** is **9.3x** faster than **express.static** on localhost.
**Nginx static** is **7.8x** faster than **express.static** on the internet (tamanoir.net).

Thanks for reading <3
