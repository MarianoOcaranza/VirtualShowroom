from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('vendedor', 'Vendedor'),
        ('cliente', 'Cliente')
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='cliente')

    def is_vendedor(self):
        return self.role == 'vendedor'
    
    def is_cliente(self):
        return self.role == 'cliente'
    
    def __str__(self):
        return self.username
        