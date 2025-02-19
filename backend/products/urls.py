from django.urls import path
from .views import ProductListView, ProductDetailView, FeaturedListView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/featured/', FeaturedListView.as_view(), name='featured-products')
]