#! /bin/bash

SITE_PATH='/home/blog/github/dafeizizhu.github.com'

cd $SITE_PATH
git pull origin master
gulp build
