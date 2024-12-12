#!/bin/bash

npm ci && \
npm run build && \

previous_process_id=$(pm2 list | grep 'deploy/pm2.config.js' | awk '{print $4}')

if [ ! -z "$previous_process_id" ]; then
    pm2 delete $previous_process_id
    echo "Previous process $previous_process_id stopped."
else
    echo "No previous process found."
fi

pm2 start deploy/pm2.config.js && \
pm2 save

nginx -t && \
service nginx restart


echo "Init complete!"