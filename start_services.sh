# Arquivo de configuração para iniciar o backend e o frontend juntos

# Iniciar o backend Django
cd /home/ubuntu/viber-project && source backend/venv/bin/activate && cd backend && python manage.py runserver 0.0.0.0:8000 &

# Aguardar 5 segundos para o backend iniciar
sleep 5

# Iniciar o frontend Next.js
cd /home/ubuntu/viber-project/frontend && npm run dev &

echo "Serviços iniciados:"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "Para acessar externamente, use o comando deploy_expose_port"
