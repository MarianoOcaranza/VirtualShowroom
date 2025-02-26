from rest_framework.permissions import BasePermission


class IsVendedor(BasePermission):
    def has_permissions(self, request, view):
        return request.user.is_authenticated and request.user.is_vendedor()