from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.exceptions import AuthenticationFailed



class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
#        header_auth = super().authenticate(request)
#        if header_auth:
#            return header_auth
#       ^^^^^ podria borrarse? ^^^^^^^

        jwt_token = request.COOKIES.get("jwt_token")
        if not jwt_token:
            return None

        try:
            validated_token = self.get_validated_token(jwt_token)
            return (self.get_user(validated_token), validated_token)
        except InvalidToken:
            raise AuthenticationFailed("Token inválido o expirado")