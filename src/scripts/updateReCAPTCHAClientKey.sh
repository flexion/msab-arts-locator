#!/bin/bash

if [[ ! -z "$GOOGLE_CLIENT_RECAPTCHA_KEY" ]]; then 
  echo "module.exports = { RECAPTCHA_KEY: '$GOOGLE_CLIENT_RECAPTCHA_KEY' };" > config/config.js && \
  echo "Updated client config.js"; 
else 
  echo "No GOOGLE_CLIENT_RECAPTCHA_KEY var set, not updating client config.js"; 
fi