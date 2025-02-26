# Generated by Django 5.1.5 on 2025-02-26 16:48

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Nombre')),
                ('description', models.TextField(verbose_name='Descripción')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Precio')),
                ('sizes_available', models.CharField(help_text='Lista de talles disponibles separados por comas, por ejemplo: S, M, L', max_length=255, verbose_name='Talles disponibles')),
                ('category', models.CharField(default='', help_text='Categoria (Buzos, Pantalones, Remeras, etc.) EN PLURAL', max_length=255, verbose_name='Categoria')),
                ('is_featured', models.BooleanField(default=False, help_text='Activalo para destacar el producto (va a aparecer en la pagina principal como producto destacado)', verbose_name='Destacar producto')),
                ('colors_available', models.CharField(help_text='Lista de colores disponibles separados por comas, por ejemplo: Rojo, Azul, Verde', max_length=255, verbose_name='Colores disponibles')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Fecha de actualización')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Producto',
                'verbose_name_plural': 'Productos',
            },
        ),
        migrations.CreateModel(
            name='ImageProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='product_images/', verbose_name='Imagen')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='products.product')),
            ],
            options={
                'verbose_name': 'Imagen del producto',
                'verbose_name_plural': 'Imágenes del producto',
            },
        ),
    ]
