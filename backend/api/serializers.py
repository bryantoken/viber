from rest_framework import serializers
from users.models import User, Follower
from playlists.models import Playlist, Track, Comment, Like

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'nome_completo', 'foto_perfil', 'data_criacao']
        read_only_fields = ['id', 'data_criacao']

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'nome_completo', 'foto_perfil', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            nome_completo=validated_data.get('nome_completo', ''),
            foto_perfil=validated_data.get('foto_perfil', '')
        )
        return user

class FollowerSerializer(serializers.ModelSerializer):
    seguidor_username = serializers.ReadOnlyField(source='seguidor.username')
    seguido_username = serializers.ReadOnlyField(source='seguido.username')
    
    class Meta:
        model = Follower
        fields = ['id', 'seguidor', 'seguidor_username', 'seguido', 'seguido_username', 'data_criacao']
        read_only_fields = ['id', 'data_criacao', 'seguidor_username', 'seguido_username']

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ['id', 'playlist', 'titulo', 'artista', 'album', 'duracao', 'url', 'ordem', 'imagem_capa', 'data_adicionada']
        read_only_fields = ['id', 'data_adicionada']

class CommentSerializer(serializers.ModelSerializer):
    usuario_username = serializers.ReadOnlyField(source='usuario.username')
    usuario_foto = serializers.ReadOnlyField(source='usuario.foto_perfil')
    respostas = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = ['id', 'playlist', 'usuario', 'usuario_username', 'usuario_foto', 'texto', 'data_criacao', 'data_edicao', 'comentario_pai', 'respostas']
        read_only_fields = ['id', 'data_criacao', 'usuario_username', 'usuario_foto', 'respostas']
    
    def get_respostas(self, obj):
        if not obj.comentario_pai:  # Apenas para comentários principais
            respostas = Comment.objects.filter(comentario_pai=obj)
            return CommentSerializer(respostas, many=True, context=self.context).data
        return []

class LikeSerializer(serializers.ModelSerializer):
    usuario_username = serializers.ReadOnlyField(source='usuario.username')
    
    class Meta:
        model = Like
        fields = ['id', 'usuario', 'usuario_username', 'playlist', 'data_criacao']
        read_only_fields = ['id', 'data_criacao', 'usuario_username']

class PlaylistSerializer(serializers.ModelSerializer):
    criador_username = serializers.ReadOnlyField(source='criador.username')
    criador_foto = serializers.ReadOnlyField(source='criador.foto_perfil')
    tracks_count = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    comentarios_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Playlist
        fields = ['id', 'titulo', 'descricao', 'imagem_capa', 'criador', 'criador_username', 
                 'criador_foto', 'data_criacao', 'ultima_atualizacao', 'fonte', 'url_original', 
                 'slug', 'situacao', 'is_public', 'tracks_count', 'likes_count', 'comentarios_count']
        read_only_fields = ['id', 'data_criacao', 'ultima_atualizacao', 'slug', 'criador_username', 
                           'criador_foto', 'tracks_count', 'likes_count', 'comentarios_count']
    
    def get_tracks_count(self, obj):
        return obj.tracks.count()
    
    def get_likes_count(self, obj):
        return obj.likes.count()
    
    def get_comentarios_count(self, obj):
        return obj.comentarios.count()

class PlaylistDetailSerializer(PlaylistSerializer):
    tracks = TrackSerializer(many=True, read_only=True)
    comentarios = serializers.SerializerMethodField()
    user_liked = serializers.SerializerMethodField()
    
    class Meta(PlaylistSerializer.Meta):
        fields = PlaylistSerializer.Meta.fields + ['tracks', 'comentarios', 'user_liked']
    
    def get_comentarios(self, obj):
        # Apenas comentários principais (sem pai)
        comentarios = obj.comentarios.filter(comentario_pai=None)
        return CommentSerializer(comentarios, many=True, context=self.context).data
    
    def get_user_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(usuario=request.user).exists()
        return False
