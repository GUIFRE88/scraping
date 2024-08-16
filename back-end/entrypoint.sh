#!/bin/bash

# Espera o banco de dados estar pronto
echo "Waiting for database..."
until bin/rails db:version; do
  sleep 1
done

# Rodar as migrações
echo "Running migrations..."
bin/rails db:migrate RAILS_ENV=production

# Iniciar o servidor
echo "Starting server..."
bundle exec rails server -b 0.0.0.0
