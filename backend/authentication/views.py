from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny

from .permissions import IsVendedor
from .authentication import CustomJWTAuthentication


# Create your views here.
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({"error": "Se requiere nombre de usuario y contraseña"},
                            status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=username, password=password)

        if user is None:
            return Response({"error": "Credenciales incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)
        
        if not user.is_vendedor():
            return Response({"error": "No tenes permiso para acceder al panel"}, status=status.HTTP_403_FORBIDDEN)
        
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response({'message': 'Login exitoso', 'is_vendedor': True}, status=status.HTTP_200_OK)
        response.set_cookie(
            key='jwt_token',
            value=access_token,
            httponly=True,
            secure=False,
            samesite='Lax',
            path='/',
        )
       
        return response
    
class UserView(APIView):
    authentication_classes = [CustomJWTAuthentication, IsVendedor]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({"username": request.user.username, "email": request.user.email, "is_vendedor": request.user.is_vendedor()})
    
class LogoutView(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        response = Response({"message": "logout exitoso"}, status=status.HTTP_200_OK)
        response.delete_cookie('jwt_token')
        response.delete_cookie('refresh_token')
        return response