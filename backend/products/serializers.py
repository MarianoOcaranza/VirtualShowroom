from rest_framework import serializers
from .models import Product, ImageProduct


class ImageProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageProduct
        fields = ['id', 'image']


class ProductSerializer(serializers.ModelSerializer):
    images = ImageProductSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'images', 'price', 'sizes_available', 'colors_available', 'category' ,'created_at', 'updated_at']