from django.db import models
from django.utils import timezone
from django.utils.text import slugify
import uuid
from users.models import User

class Playlist(models.Model):
    FONTE_CHOICES = (
        ('youtube', 'YouTube'),
        ('youtube_music', 'YouTube Music'),
        ('spotify', 'Spotify'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titulo = models.CharField(max_length=255)
    descricao = models.TextField(blank=True)
    imagem_capa = models.URLField(max_length=500, blank=True)
    criador = models.ForeignKey(User, on_delete=models.CASCADE, related_name='playlists')
    data_criacao = models.DateTimeField(default=timezone.now)
    ultima_atualizacao = models.DateTimeField(auto_now=True)
    fonte = models.CharField(max_length=20, choices=FONTE_CHOICES)
    url_original = models.URLField(max_length=500)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    situacao = models.CharField(max_length=255)
    is_public = models.BooleanField(default=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titulo)
            # Garantir unicidade do slug
            original_slug = self.slug
            count = 1
            while Playlist.objects.filter(slug=self.slug).exists():
                self.slug = f"{original_slug}-{count}"
                count += 1
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.titulo
    
    class Meta:
        verbose_name = 'Playlist'
        verbose_name_plural = 'Playlists'
        ordering = ['-data_criacao']

class Track(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, related_name='tracks')
    titulo = models.CharField(max_length=255)
    artista = models.CharField(max_length=255)
    album = models.CharField(max_length=255, blank=True)
    duracao = models.IntegerField(help_text='Duração em segundos')
    url = models.URLField(max_length=500)
    ordem = models.IntegerField()
    imagem_capa = models.URLField(max_length=500, blank=True)
    data_adicionada = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.titulo} - {self.artista}"
    
    class Meta:
        verbose_name = 'Música'
        verbose_name_plural = 'Músicas'
        ordering = ['ordem']
        unique_together = ('playlist', 'ordem')

class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, related_name='comentarios')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comentarios')
    texto = models.TextField()
    data_criacao = models.DateTimeField(default=timezone.now)
    data_edicao = models.DateTimeField(null=True, blank=True)
    comentario_pai = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='respostas')
    
    def __str__(self):
        return f"Comentário de {self.usuario.username} em {self.playlist.titulo}"
    
    class Meta:
        verbose_name = 'Comentário'
        verbose_name_plural = 'Comentários'
        ordering = ['-data_criacao']

class Like(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, related_name='likes')
    data_criacao = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.usuario.username} curtiu {self.playlist.titulo}"
    
    class Meta:
        verbose_name = 'Curtida'
        verbose_name_plural = 'Curtidas'
        unique_together = ('usuario', 'playlist')
