from rest_framework_simplejwt.authentication import JWTAuthentication


class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):

        header_auth = super().authenticate(request)
        if header_auth:
            return header_auth

        jwt_token = request.COOKIES.get("jwt_token")

        if jwt_token:
            try:
                validated_token = self.get_validated_token(jwt_token)
                return (self.get_user(validated_token), validated_token)
            except Exception as e:
                return None
        return None