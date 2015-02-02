#!/usr/bin/env bash

echo
echo "For Local SSH Certificate usage, see https://gist.github.com/jed/6147872";
echo

# move to project directory
cd "$( dirname "${BASH_SOURCE[0]}" )/../"

DEFAULT_HOST=${PWD##*/}.$(whoami)

# Get host name from user
read -p "Local host name (${DEFAULT_HOST}):" host
host=${host:-$DEFAULT_HOST}

# create temporary config file
cat > openssl.cnf <<-EOF
  [req]
  distinguished_name = req_distinguished_name
  x509_extensions = v3_req
  prompt = no
  [req_distinguished_name]
  CN = *.${host}
  [v3_req]
  keyUsage = keyEncipherment, dataEncipherment
  extendedKeyUsage = serverAuth
  subjectAltName = @alt_names
  [alt_names]
  DNS.1 = *.${host}
  DNS.2 = ${host}
EOF

# Generate the certificates
openssl req \
  -new \
  -newkey rsa:2048 \
  -sha256 \
  -days 3650 \
  -nodes \
  -x509 \
  -keyout server.key \
  -out server.crt \
  -config openssl.cnf

# Remove the temporary config file
rm openssl.cnf

# Open up in Keychain Access to trust it
read -p "Press [return] to open up the cert in Keychain Access to trust it"
open /Applications/Utilities/Keychain\ Access.app server.crt
