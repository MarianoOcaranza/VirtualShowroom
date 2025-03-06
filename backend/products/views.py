import cloudinary
from django.shortcuts import render
from rest_framework import generics
from .models import Product, ImageProduct
from .serializers import ProductSerializer, ImageProductSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from authentication.permissions import IsVendedor
from authentication.authentication import CustomJWTAuthentication
from rest_framework import serializers
from rest_framework.parsers import MultiPartParser, FormParser
from cloudinary.uploader import destroy


# Create your views here.
class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes=[AllowAny]

    def get_queryset(self):
        category = self.request.GET.get('category')
        if category:
            return Product.objects.filter(category__iexact=category)
        return Product.objects.all()
        

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes=[AllowAny]


class FeaturedListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(is_featured=True)
    permission_classes=[AllowAny]


class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsVendedor]
    authentication_classes = [CustomJWTAuthentication]
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ProductUpdateView(generics.UpdateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsVendedor]
    authentication_classes = [CustomJWTAuthentication]
    def get_queryset(self):
        return Product.objects.filter(owner=self.request.user)

class ProductDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated, IsVendedor]
    authentication_classes = [CustomJWTAuthentication]

    def get_queryset(self):
        return Product.objects.filter(owner=self.request.user)
    
    def perform_destroy(self, instance):
        for image in instance.images.all():
            try:
                public_id = image.image.public_id 
                destroy(public_id)  
            except Exception as e:
                print(f"Error al eliminar imagen {image.image.url}: {e}")
        
        instance.delete()  

class ImageProductCreateView(generics.CreateAPIView):
    serializer_class = ImageProductSerializer
    permission_classes = [IsAuthenticated, IsVendedor]
    authentication_classes = [CustomJWTAuthentication]
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        product_id = self.kwargs.get('product_id')
        product = generics.get_object_or_404(Product, id=product_id, owner=self.request.user)

        if product.images.count()>=6:
            raise serializers.ValidationError({'error': 'Maximo de 6 imagenes'})
        
        uploaded_file = self.request.FILES.get('image')

        if not uploaded_file:
            raise serializers.ValidationError({'error': 'No se subió ninguna imagen'})
        
        upload_result = cloudinary.uploader.upload(uploaded_file)

        image_url = upload_result['secure_url']  

        serializer.save(product=product, image=image_url)

class ImageProductDeleteView(generics.DestroyAPIView):
    queryset = ImageProduct.objects.all()
    serializer_class = ImageProductSerializer
    permission_classes = [IsAuthenticated, IsVendedor]
    authentication_classes = [CustomJWTAuthentication]

    def get_queryset(self):
        return ImageProduct.objects.filter(product__owner=self.request.user)

    def perform_destroy(self, instance):
        cloudinary.uploader.destroy(instance.image.public_id)
        instance.delete()