#!/bin/bash

# Script para implantar a aplicação Viber em ambiente de produção

echo "Iniciando implantação da aplicação Viber..."
echo "==========================================="

# Verificar se o ambiente virtual do Python está ativado
if [[ "$VIRTUAL_ENV" == "" ]]; then
  echo "Ativando ambiente virtual Python..."
  source /home/ubuntu/viber-project/backend/venv/bin/activate
fi

# Configurar variáveis de ambiente para produção
export DJANGO_SETTINGS_MODULE=viber_project.settings
export DEBUG=False
export ALLOWED_HOSTS=localhost,127.0.0.1

# Coletar arquivos estáticos do Django
echo "Coletando arquivos estáticos do Django..."
cd /home/ubuntu/viber-project/backend
python manage.py collectstatic --noinput

# Aplicar migrações do banco de dados
echo "Aplicando migrações do banco de dados..."
python manage.py migrate

# Construir o frontend Next.js para produção
echo "Construindo o frontend Next.js para produção..."
cd /home/ubuntu/viber-project/frontend
npm run build

# Iniciar o backend Django
echo "Iniciando o backend Django..."
cd /home/ubuntu/viber-project/backend
python manage.py runserver 0.0.0.0:8000 &
BACKEND_PID=$!
echo "Backend iniciado com PID: $BACKEND_PID"

# Aguardar o backend iniciar
sleep 5

# Iniciar o frontend Next.js
echo "Iniciando o frontend Next.js..."
cd /home/ubuntu/viber-project/frontend
npm start &
FRONTEND_PID=$!
echo "Frontend iniciado com PID: $FRONTEND_PID"

echo "==========================================="
echo "Implantação concluída!"
echo "Backend rodando em: http://localhost:8000"
echo "Frontend rodando em: http://localhost:3000"
echo ""
echo "Para expor a aplicação externamente, execute:"
echo "deploy_expose_port 3000"
echo ""
echo "Para parar a aplicação, execute:"
echo "kill $BACKEND_PID $FRONTEND_PID"
