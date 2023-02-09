#!/bin/bash

response=$(curl -s https://pokedex-fj.fly.dev/health)

if [ "$response" == "ok" ]; then
  echo "Health check success!"
  exit 0
  fi

echo "Health check failed."
exit 1