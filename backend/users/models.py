from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
import uuid

class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('O endereço de e-mail é obrigatório')
        if not username:
            raise ValueError('O nome de usuário é obrigatório')
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser deve ter is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser deve ter is_superuser=True.')
        
        return self.create_user(email, username, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    nome_completo = models.CharField(max_length=255, blank=True)
    foto_perfil = models.URLField(max_length=500, blank=True)
    data_criacao = models.DateTimeField(default=timezone.now)
    ultima_atualizacao = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'

class Follower(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    seguidor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='seguindo')
    seguido = models.ForeignKey(User, on_delete=models.CASCADE, related_name='seguidores')
    data_criacao = models.DateTimeField(default=timezone.now)
    
    class Meta:
        unique_together = ('seguidor', 'seguido')
        verbose_name = 'Seguidor'
        verbose_name_plural = 'Seguidores'
    
    def __str__(self):
        return f"{self.seguidor.username} segue {self.seguido.username}"
