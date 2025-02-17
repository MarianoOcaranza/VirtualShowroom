from django.contrib import admin
from .models import Product

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('name', 'description', 'sizes_available', 'colors_available')
    ordering = ('-created_at',)
    fieldsets = (
        ('Información básica', {
            'fields': ('name', 'description', 'price', 'category', 'image')
        }),
        ('Detalles adicionales', {
            'fields': ('sizes_available', 'colors_available'),
            'classes': ('collapse',)
        }),
        ('Fechas', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')