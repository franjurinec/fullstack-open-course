#!/bin/bash

response=$(curl -s https://young-frost-5915.fly.dev/health)

if [ "$response" == "ok" ]; then
  echo "Health check success!"
  exit 0
  fi

echo "Health check failed."
exit 1