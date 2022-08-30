---
title: CAP
description: FTP data leak
---

# CAP HTB

## Enumeration

After enumerating I headed to the `http://cap.htb/data/0` directory on the webserver.
I then downloaded the `.pcap` file and opened it with **wireshark** and found nathan's **ftp** password. It turned out that it was also the **ssh** password.

![](images/wireshark.png)

| username | password        |
| -------- | --------------- |
| nathan   | Buck3tH4TF0RM3! |

After connecting via **ssh** I downloaded [linpeas.sh](https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/blob/master/linPEAS/linpeas.sh) on the machine and executed it. Finally with the data provided from the script I discovered that **python3** was vulnerable. After a quick look on [gtfobins](https://gtfobins.github.io/gtfobins/python/#capabilities) I retrieved this command and got **ROOT** access :

```bash
python3 -c 'import os; os.setuid(0); os.system("/bin/sh")'
```

### Thank's for reading :)
