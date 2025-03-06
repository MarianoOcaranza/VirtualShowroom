from django.urls import path
from .views import (
    ProductListView, ProductDetailView, FeaturedListView,
    ProductCreateView, ProductUpdateView, ProductDeleteView,
    ImageProductCreateView, ImageProductDeleteView
    )

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/featured/', FeaturedListView.as_view(), name='featured-products'),
    path('admin/products/create/', ProductCreateView.as_view(), name='create-product'),
    path('admin/products/<int:pk>/update/', ProductUpdateView.as_view(), name='update-product'),
    path('admin/products/<int:product_id>/images/add/', ImageProductCreateView.as_view(), name='add-product-image'),
    path('admin/images/<int:pk>/delete/', ImageProductDeleteView.as_view(), name='delete-product-image'),
    path('admin/products/<int:pk>/delete/', ProductDeleteView.as_view(), name='delete-product'),
]