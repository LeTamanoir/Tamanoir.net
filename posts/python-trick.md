---
title: Shell upgrade
description: Easily upgrade your shell with python
date: 09/01/2022
---

# Shell upgrade

Use these commands to easily upgrade your shell with python (python and python3).

```shell
bash
nc -lnvp 1234
python3 -c 'import pty; pty.spawn("/bin/sh")' # or with python
```

<kbd>**CTRL + Z**</kbd>

```bash
stty raw -echo; fg
export TERM=xterm
```
