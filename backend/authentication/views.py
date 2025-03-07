from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework import status
import requests
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from backend import settings
from .permissions import IsVendedor
from .authentication import CustomJWTAuthentication

def verify_recaptcha(recaptcha_token):
    url = 'https://www.google.com/recaptcha/api/siteverify'
    payload = {
        'secret': settings.RECAPTCHA_SECRET,
        'response': recaptcha_token
    }
    response = requests.post(url, data=payload)
    result = response.json()
    return result.get('success') and result.get('score', 0) >= 0.5


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
         
        if getattr(request, 'limited', False):
            return Response({'error': 'demasiadas solicitudes'}, status=status.HTTP_429_TOO_MANY_REQUESTS)

        username = request.data.get('username')
        password = request.data.get('password')
        recaptcha_token = request.data.get('recaptcha-token')
       

        if not verify_recaptcha(recaptcha_token):
            return Response({'error': 'reCAPTCHA failed'})
        
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