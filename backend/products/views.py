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
        instance.delete()  

class ImageProductDeleteView(generics.DestroyAPIView):
    queryset = ImageProduct.objects.all()
    serializer_class = ImageProductSerializer
    permission_classes = [IsAuthenticated, IsVendedor]
    authentication_classes = [CustomJWTAuthentication]

    def get_queryset(self):
        return ImageProduct.objects.filter(product__owner=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()