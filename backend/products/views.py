from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Product, ImageProduct
from .serializers import ProductSerializer, ImageProductSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from authentication.permissions import IsVendedor

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
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ProductUpdateView(generics.UpdateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsVendedor]

    def get_queryset(self):
        return Product.objects.filter(owner=self.request.user)

class ProductDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated, IsVendedor]
    def get_queryset(self):
        return Product.objects.filter(owner=self.request.user)