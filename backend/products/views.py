from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

# Create your views here.
class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    def get_queryset(self):
        category = self.request.GET.get('category')
        if category:
            return Product.objects.filter(category__iexact=category)
        return Product.objects.all()
        
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer