from rest_framework import serializers
from .models import Product, ImageProduct


class ImageProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageProduct
        fields = ['id', 'image']


class ProductSerializer(serializers.ModelSerializer):
    images = ImageProductSerializer(many=True, read_only=True)
    uploaded = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'images', 'uploaded', 'price', 'is_featured', 'sizes_available', 'colors_available', 'category' ,'created_at', 'updated_at']
    
    def create(self, validated_data):
        uploaded = validated_data.pop('uploaded', [])
        if len(uploaded)>6 or len(uploaded)<1:
            raise serializers.ValidationError('Maximo 6 imagenes, minimo 1 imagen')
    
        product = Product.objects.create(**validated_data)

        for image in uploaded:
            ImageProduct.objects.create(product=product, image=image)
        
        return product
    
    def update(self, instance, validated_data):
        uploaded = validated_data.pop('uploaded', None)

        if uploaded:
            if len(uploaded) > 6 or len(uploaded) < 1:
                raise serializers.ValidationError('Maximo 6 imagenes, minimo 1 imagen')
            instance.images.all().delete()
            for image in uploaded:
                ImageProduct.objects.create(product=instance, image=image)
            
        return super().update(instance, validated_data)