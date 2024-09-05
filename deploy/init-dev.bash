#!/bin/bash

npm ci && \
npm run build && \
pm2 kill && \
pm2 start deploy/pm2-dev.config.js && \
pm2 save && \
echo "Init complete!"