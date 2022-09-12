#!/bin/bash

if [[ $# == 0 || $# > 1 ]] ; then
    echo "Usage: npm run blog:post <title>";
    exit 1;
fi

TITLE=$1;
FILE=./posts/$TITLE.md

if [[ -e $FILE ]] ; then
    echo "$FILE : File already exists";
    exit 1;
fi

touch $FILE

echo "---
title: $TITLE
description: sample
date: $(date '+%d/%m/%Y')
---

# $TITLE" > $FILE

vim $FILE
