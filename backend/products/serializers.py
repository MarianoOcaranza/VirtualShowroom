import cloudinary
from rest_framework import serializers
from .models import Product, ImageProduct


class ImageProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    public_id = serializers.SerializerMethodField()

    class Meta:
        model = ImageProduct
        fields = ['id', 'image_url', 'public_id']

    def get_image_url(self, obj):
        return obj.image.url if obj.image else None
    
    def get_public_id(self, obj):
        if obj.image and isinstance(obj.image, str):
            return obj.image.split("/")[-1].split(".")[0]
        return None

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

        if not uploaded:
            raise serializers.ValidationError("Debes subir al menos una imagen")
        
        if len(uploaded)>6:
            raise serializers.ValidationError('Maximo 6 imagenes')
    
        product = Product.objects.create(**validated_data)

        for image in uploaded:
            ImageProduct.objects.create(product=product, image=image)
        
        return product
    
    def update(self, instance, validated_data):
        uploaded = validated_data.pop('uploaded', None)

        if uploaded:
            if len(uploaded) > 6 or len(uploaded) < 1:
                raise serializers.ValidationError('Maximo 6 imagenes, minimo 1 imagen')
            
            for image in uploaded:
                try:
                    upload_result = cloudinary.uploader.upload(image, folder="Empty showroom")
                    image_url = upload_result.get('secure_url')

                    if not image_url:
                        raise serializers.ValidationError({"error": "Error al subir la imagen a Cloudinary."})

                    ImageProduct.objects.create(product=instance, image=image_url)
                except Exception as e:
                    raise serializers.ValidationError({"error": f"Error al subir imagen: {str(e)}"})

        return super().update(instance, validated_data)