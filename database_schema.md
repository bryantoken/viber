# Esquema de Banco de Dados - Projeto Viber

## Visão Geral
O sistema Viber necessita de um banco de dados que suporte usuários, playlists, músicas e interações sociais como comentários e likes. Abaixo está o design do esquema de banco de dados com os modelos principais e seus relacionamentos.

## Modelos

### Usuário (User)
- id: UUID (Chave primária)
- username: String (Único)
- email: String (Único)
- password: String (Hash)
- nome_completo: String
- foto_perfil: String (URL)
- data_criacao: DateTime
- ultima_atualizacao: DateTime
- is_active: Boolean
- is_staff: Boolean

### Playlist
- id: UUID (Chave primária)
- titulo: String
- descricao: Text
- imagem_capa: String (URL)
- criador: ForeignKey (User)
- data_criacao: DateTime
- ultima_atualizacao: DateTime
- fonte: String (Enum: "youtube", "youtube_music", "spotify")
- url_original: String (URL da playlist original)
- slug: String (URL amigável)
- situacao: String (Descrição da situação/momento para a playlist)
- is_public: Boolean

### Música (Track)
- id: UUID (Chave primária)
- playlist: ForeignKey (Playlist)
- titulo: String
- artista: String
- album: String (Opcional)
- duracao: Integer (em segundos)
- url: String (URL da música)
- ordem: Integer (Posição na playlist)
- imagem_capa: String (URL)
- data_adicionada: DateTime

### Comentário (Comment)
- id: UUID (Chave primária)
- playlist: ForeignKey (Playlist)
- usuario: ForeignKey (User)
- texto: Text
- data_criacao: DateTime
- data_edicao: DateTime (Opcional)
- comentario_pai: ForeignKey (Self, Opcional - para respostas)

### Curtida (Like)
- id: UUID (Chave primária)
- usuario: ForeignKey (User)
- playlist: ForeignKey (Playlist)
- data_criacao: DateTime

### Seguidor (Follower)
- id: UUID (Chave primária)
- seguidor: ForeignKey (User)
- seguido: ForeignKey (User)
- data_criacao: DateTime

## Relacionamentos

1. **Usuário -> Playlist**: Um usuário pode criar várias playlists (1:N)
2. **Playlist -> Música**: Uma playlist contém várias músicas (1:N)
3. **Usuário -> Comentário**: Um usuário pode fazer vários comentários (1:N)
4. **Playlist -> Comentário**: Uma playlist pode ter vários comentários (1:N)
5. **Comentário -> Comentário**: Um comentário pode ter várias respostas (1:N)
6. **Usuário -> Curtida -> Playlist**: Relacionamento muitos-para-muitos entre usuários e playlists através de curtidas (N:M)
7. **Usuário -> Seguidor -> Usuário**: Relacionamento muitos-para-muitos entre usuários (seguidor/seguido) (N:M)

## Índices
- username e email em User (para buscas rápidas e unicidade)
- slug em Playlist (para URLs amigáveis)
- combinação de usuario e playlist em Like (para evitar duplicatas)
- combinação de seguidor e seguido em Follower (para evitar duplicatas)

## Considerações
- Utilizaremos PostgreSQL como banco de dados relacional
- Implementaremos validação de dados no nível do modelo Django
- Utilizaremos migrations do Django para controle de versão do banco de dados
- Implementaremos soft delete para registros importantes (flag is_active em vez de exclusão física)
