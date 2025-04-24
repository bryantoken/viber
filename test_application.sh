#!/bin/bash

# Script para testar a aplicação Viber

echo "Iniciando testes da aplicação Viber..."
echo "========================================"

# Verificar se o backend está rodando
echo "Testando conexão com o backend..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/ > /tmp/backend_status.txt
BACKEND_STATUS=$(cat /tmp/backend_status.txt)

if [ "$BACKEND_STATUS" == "200" ] || [ "$BACKEND_STATUS" == "404" ]; then
  echo "✅ Backend está respondendo (status: $BACKEND_STATUS)"
else
  echo "❌ Backend não está respondendo corretamente (status: $BACKEND_STATUS)"
  echo "Iniciando o backend..."
  cd /home/ubuntu/viber-project && source backend/venv/bin/activate && cd backend && python manage.py runserver 0.0.0.0:8000 &
  sleep 5
  echo "Backend iniciado."
fi

# Verificar se o frontend está rodando
echo "Testando conexão com o frontend..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 > /tmp/frontend_status.txt
FRONTEND_STATUS=$(cat /tmp/frontend_status.txt)

if [ "$FRONTEND_STATUS" == "200" ]; then
  echo "✅ Frontend está respondendo (status: $FRONTEND_STATUS)"
else
  echo "❌ Frontend não está respondendo corretamente (status: $FRONTEND_STATUS)"
  echo "Iniciando o frontend..."
  cd /home/ubuntu/viber-project/frontend && npm run dev &
  sleep 10
  echo "Frontend iniciado."
fi

# Testar API de usuários
echo "Testando API de usuários..."
curl -s -o /tmp/users_api.txt http://localhost:8000/api/users/
USERS_API_STATUS=$?

if [ $USERS_API_STATUS -eq 0 ]; then
  echo "✅ API de usuários está funcionando"
else
  echo "❌ API de usuários não está funcionando corretamente"
fi

# Testar API de playlists
echo "Testando API de playlists..."
curl -s -o /tmp/playlists_api.txt http://localhost:8000/api/playlists/
PLAYLISTS_API_STATUS=$?

if [ $PLAYLISTS_API_STATUS -eq 0 ]; then
  echo "✅ API de playlists está funcionando"
else
  echo "❌ API de playlists não está funcionando corretamente"
fi

# Testar integração CORS
echo "Testando integração CORS..."
curl -s -o /dev/null -w "%{http_code}" -H "Origin: http://localhost:3000" -H "Access-Control-Request-Method: GET" -X OPTIONS http://localhost:8000/api/ > /tmp/cors_status.txt
CORS_STATUS=$(cat /tmp/cors_status.txt)

if [ "$CORS_STATUS" == "200" ] || [ "$CORS_STATUS" == "204" ]; then
  echo "✅ Configuração CORS está funcionando (status: $CORS_STATUS)"
else
  echo "❌ Configuração CORS não está funcionando corretamente (status: $CORS_STATUS)"
fi

echo "========================================"
echo "Testes concluídos."
echo "Para iniciar a aplicação completa, execute: ./start_services.sh"
echo "Para expor a aplicação externamente, execute: deploy_expose_port 3000"
