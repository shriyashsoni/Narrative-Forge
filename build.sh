#!/usr/bin/env bash
# Exit on error
set -e

echo "Building Next.js frontend..."
cd frontend
# Install Node.js dependencies
npm install
# Build the frontend to static files
npm run build
cd ..

echo "Installing Python backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

echo "Build complete. Ready to serve unified application."
