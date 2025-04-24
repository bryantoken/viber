# Documentação do Projeto Viber

## Visão Geral

Viber é uma plataforma web para compartilhamento de playlists específicas para momentos específicos. Os usuários podem criar, compartilhar e descobrir playlists do YouTube Music, YouTube e Spotify, organizadas por situações específicas da vida, como "playlist para quando você tem que decidir entre viajar com seu pai ou com sua mãe".

## Tecnologias Utilizadas

### Backend
- Django 4.2
- Django REST Framework
- PostgreSQL
- JWT Authentication

### Frontend
- Next.js
- React
- Tailwind CSS
- Axios

## Estrutura do Projeto

```
viber-project/
├── backend/               # Aplicação Django
│   ├── api/               # API REST
│   ├── playlists/         # App de playlists
│   ├── users/             # App de usuários
│   └── viber_project/     # Configurações do projeto
├── frontend/              # Aplicação Next.js
│   ├── app/               # Páginas da aplicação
│   ├── components/        # Componentes React
│   ├── contexts/          # Contextos React
│   ├── hooks/             # Hooks personalizados
│   └── services/          # Serviços de API
└── scripts/               # Scripts de implantação e teste
```

## Funcionalidades

### Usuários
- Cadastro e login de usuários
- Perfil de usuário com foto
- Sistema de seguidores

### Playlists
- Criação de playlists com situações específicas
- Adição de músicas a partir de links do YouTube/Spotify
- Visualização de playlists em cards
- Detalhes de playlist com lista de músicas

### Interação Social
- Curtir playlists
- Comentar em playlists
- Seguir outros usuários

## Instalação e Execução

### Requisitos
- Python 3.10+
- Node.js 18+
- PostgreSQL

### Configuração do Backend
1. Crie um ambiente virtual Python:
   ```
   python3 -m venv backend/venv
   source backend/venv/bin/activate
   ```

2. Instale as dependências:
   ```
   cd backend
   pip install -r requirements.txt
   ```

3. Configure o banco de dados:
   ```
   python manage.py migrate
   ```

4. Crie um superusuário:
   ```
   python manage.py createsuperuser
   ```

5. Inicie o servidor:
   ```
   python manage.py runserver
   ```

### Configuração do Frontend
1. Instale as dependências:
   ```
   cd frontend
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

### Execução Completa
Para iniciar tanto o backend quanto o frontend simultaneamente:
```
./start_services.sh
```

## Implantação em Produção
Para implantar a aplicação em ambiente de produção:
```
./deploy_production.sh
```

## Testes
Para testar a aplicação:
```
./test_application.sh
```

## API Endpoints

### Autenticação
- `POST /api/token/` - Obter token JWT
- `POST /api/token/refresh/` - Renovar token JWT

### Usuários
- `GET /api/users/` - Listar usuários
- `POST /api/users/` - Criar usuário
- `GET /api/users/{id}/` - Detalhes do usuário
- `PATCH /api/users/{id}/` - Atualizar usuário
- `POST /api/users/{id}/follow/` - Seguir usuário
- `POST /api/users/{id}/unfollow/` - Deixar de seguir usuário

### Playlists
- `GET /api/playlists/` - Listar playlists
- `POST /api/playlists/` - Criar playlist
- `GET /api/playlists/{slug}/` - Detalhes da playlist
- `PATCH /api/playlists/{slug}/` - Atualizar playlist
- `DELETE /api/playlists/{slug}/` - Excluir playlist
- `POST /api/playlists/{slug}/like/` - Curtir playlist
- `POST /api/playlists/{slug}/unlike/` - Descurtir playlist
- `POST /api/playlists/{slug}/comment/` - Comentar na playlist

### Músicas
- `GET /api/tracks/` - Listar músicas
- `POST /api/tracks/` - Adicionar música
- `PATCH /api/tracks/{id}/` - Atualizar música
- `DELETE /api/tracks/{id}/` - Excluir música

## Design e Interface

A interface do Viber segue um design minimalista com a seguinte paleta de cores:
- Cor principal: Ruby (#9B111E)
- Fundo: Escuro (#121212)
- Elementos de destaque: Ruby claro (#C41E3A)
- Texto: Branco (#FFFFFF) e cinza claro (#E0E0E0)

A logo do Viber consiste na palavra "Viber" com um quadrado rotacionado em torno da letra V, simbolizando a diversidade de momentos e situações para as quais as playlists são criadas.

## Responsividade

A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:
- Desktop: Layout completo com sidebar e múltiplas colunas
- Tablet: Layout adaptado com menos colunas
- Mobile: Layout simplificado com menu hambúrguer e cards em coluna única

## Segurança

- Autenticação baseada em JWT
- Proteção contra CSRF
- Validação de formulários no frontend e backend
- Sanitização de inputs
- Permissões baseadas em usuário

## Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT.
