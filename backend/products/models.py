from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name='Nombre')
    description = models.TextField(verbose_name='Descripción')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Precio')
    image = models.ImageField(upload_to='product_images/', verbose_name='Imagen')
    sizes_available = models.CharField(max_length=255, help_text="Lista de talles disponibles separados por comas, por ejemplo: S, M, L", verbose_name='Talles disponibles')
    category = models.CharField(max_length=255, default='', help_text="Categoria (Buzos, Pantalones, Remeras, etc.) EN PLURAL", verbose_name='Categoria')
    colors_available = models.CharField(max_length=255, help_text="Lista de colores disponibles separados por comas, por ejemplo: Rojo, Azul, Verde", verbose_name='Colores disponibles')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Fecha de actualización')
    
    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self):
        return self.name