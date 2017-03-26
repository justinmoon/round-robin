#!/bin/sh
echo 'Running pre-commit script'

error_count=0

# git diff --name-only --relative mobile | grep '\.jsx\?$' | xargs ./mobile/node_modules/.bin/standard;
cd mobile
yarn lint
if [ $? -ne 0 ]; then exit 1; fi
# if [ $? -ne 0 ]; then ((error_count++)); fi

# git diff --name-only --relative web | grep '\.jsx\?$' | xargs ./web/node_modules/.bin/standard;
cd ../web
yarn lint
if [ $? -ne 0 ]; then exit 1; fi
# if [ $? -ne 0 ]; then ((error_count++)); fi

# git diff --name-only --relative common | grep '\.jsx\?$' | xargs ./common/node_modules/.bin/standard;
cd ../common
yarn lint
if [ $? -ne 0 ]; then exit 1; fi
# if [ $? -ne 0 ]; then ((error_count++)); fi

# git diff --name-only --relative backend | grep '\.py$' | xargs ./backend/venv/bin/flake8;
cd ../backend
venv/bin/flake8 rr tests
if [ $? -ne 0 ]; then exit 1; fi
# if [ $? -ne 0 ]; then ((error_count++)); fi

exit $error_count
