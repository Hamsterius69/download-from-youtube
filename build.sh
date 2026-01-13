#!/bin/bash

# Build script for Cloudflare Pages
# This script copies environment example files and builds the project

echo "Setting up environment files..."
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts

echo "Installing dependencies..."
npm ci

echo "Building project..."
npm run build

echo "Build complete!"
