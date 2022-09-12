#!/bin/bash

if [ $# == 0 ] ; then
    echo "Usage: npm run blog:password <password>";
    exit 1;
fi

PASSWORD=$1;

echo "$PASSWORD encrypted : $(htpasswd -bnBC 10 "" $PASSWORD | tr -d ':\n' | sed 's/$2y/$2a/')";
exit 0;