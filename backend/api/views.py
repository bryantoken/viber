from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q

from users.models import User, Follower
from playlists.models import Playlist, Track, Comment, Like
from .serializers import (
    UserSerializer, UserCreateSerializer, FollowerSerializer,
    PlaylistSerializer, PlaylistDetailSerializer, TrackSerializer,
    CommentSerializer, LikeSerializer
)

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Permissão personalizada para permitir que apenas o proprietário de um objeto o edite.
    """
    def has_object_permission(self, request, view, obj):
        # Permissões de leitura são permitidas para qualquer requisição
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Permissões de escrita são apenas para o proprietário
        if hasattr(obj, 'usuario'):
            return obj.usuario == request.user
        elif hasattr(obj, 'criador'):
            return obj.criador == request.user
        return False

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'nome_completo']
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsOwnerOrReadOnly()]
        return [permissions.IsAuthenticated()]
    
    @action(detail=True, methods=['get'])
    def playlists(self, request, pk=None):
        user = self.get_object()
        playlists = Playlist.objects.filter(criador=user, is_public=True)
        serializer = PlaylistSerializer(playlists, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def followers(self, request, pk=None):
        user = self.get_object()
        followers = Follower.objects.filter(seguido=user)
        serializer = FollowerSerializer(followers, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def following(self, request, pk=None):
        user = self.get_object()
        following = Follower.objects.filter(seguidor=user)
        serializer = FollowerSerializer(following, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def follow(self, request, pk=None):
        user_to_follow = self.get_object()
        user = request.user
        
        if user == user_to_follow:
            return Response({"detail": "Você não pode seguir a si mesmo."}, status=status.HTTP_400_BAD_REQUEST)
        
        follower, created = Follower.objects.get_or_create(seguidor=user, seguido=user_to_follow)
        
        if created:
            return Response({"detail": f"Você está seguindo {user_to_follow.username}."}, status=status.HTTP_201_CREATED)
        return Response({"detail": f"Você já está seguindo {user_to_follow.username}."}, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'])
    def unfollow(self, request, pk=None):
        user_to_unfollow = self.get_object()
        user = request.user
        
        try:
            follower = Follower.objects.get(seguidor=user, seguido=user_to_unfollow)
            follower.delete()
            return Response({"detail": f"Você deixou de seguir {user_to_unfollow.username}."}, status=status.HTTP_200_OK)
        except Follower.DoesNotExist:
            return Response({"detail": f"Você não está seguindo {user_to_unfollow.username}."}, status=status.HTTP_400_BAD_REQUEST)

class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['titulo', 'descricao', 'situacao']
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PlaylistDetailSerializer
        return PlaylistSerializer
    
    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsOwnerOrReadOnly()]
        elif self.action == 'create':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = Playlist.objects.all()
        
        # Filtrar playlists públicas ou do usuário autenticado
        if self.request.user.is_authenticated:
            queryset = queryset.filter(Q(is_public=True) | Q(criador=self.request.user))
        else:
            queryset = queryset.filter(is_public=True)
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(criador=self.request.user)
    
    @action(detail=True, methods=['post'])
    def like(self, request, slug=None):
        playlist = self.get_object()
        user = request.user
        
        like, created = Like.objects.get_or_create(usuario=user, playlist=playlist)
        
        if created:
            return Response({"detail": "Playlist curtida com sucesso."}, status=status.HTTP_201_CREATED)
        return Response({"detail": "Você já curtiu esta playlist."}, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'])
    def unlike(self, request, slug=None):
        playlist = self.get_object()
        user = request.user
        
        try:
            like = Like.objects.get(usuario=user, playlist=playlist)
            like.delete()
            return Response({"detail": "Curtida removida com sucesso."}, status=status.HTTP_200_OK)
        except Like.DoesNotExist:
            return Response({"detail": "Você não curtiu esta playlist."}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def likes(self, request, slug=None):
        playlist = self.get_object()
        likes = Like.objects.filter(playlist=playlist)
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def comment(self, request, slug=None):
        playlist = self.get_object()
        user = request.user
        
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(usuario=user, playlist=playlist)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    
    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'create']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        playlist_id = self.request.query_params.get('playlist', None)
        if playlist_id:
            return Track.objects.filter(playlist__id=playlist_id)
        return Track.objects.all()
    
    def perform_create(self, serializer):
        playlist = serializer.validated_data.get('playlist')
        
        # Verificar se o usuário é o criador da playlist
        if playlist.criador != self.request.user:
            raise permissions.PermissionDenied("Você não tem permissão para adicionar músicas a esta playlist.")
        
        # Definir a ordem automaticamente se não for fornecida
        if 'ordem' not in serializer.validated_data:
            last_track = Track.objects.filter(playlist=playlist).order_by('-ordem').first()
            ordem = 1 if not last_track else last_track.ordem + 1
            serializer.save(ordem=ordem)
        else:
            serializer.save()

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsOwnerOrReadOnly()]
        elif self.action == 'create':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        playlist_id = self.request.query_params.get('playlist', None)
        if playlist_id:
            return Comment.objects.filter(playlist__id=playlist_id, comentario_pai=None)
        return Comment.objects.filter(comentario_pai=None)
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
