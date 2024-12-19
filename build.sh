#!/bin/bash
# Update package list
apt-get update

# Install only the required packages
apt-get install -y libportaudio2

# Export PKG_CONFIG_PATH if necessary
export PKG_CONFIG_PATH=/usr/lib/pkgconfig:/usr/local/lib/pkgconfig

# Install Node.js dependencies
npm install
