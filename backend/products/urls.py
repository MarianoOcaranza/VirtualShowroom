from django.urls import path
from .views import (
    ProductListView, ProductDetailView, FeaturedListView,
    ProductCreateView, ProductUpdateView, ProductDeleteView
    )

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/featured/', FeaturedListView.as_view(), name='featured-products'),
    path('products/create/', ProductCreateView.as_view(), name='create-product'),
    path('products/<int:pk>/update/', ProductUpdateView.as_view(), name='update-product'),
    path('products/<int:pk>/delete/', ProductDeleteView.as_view(), name='delete-product'),
]