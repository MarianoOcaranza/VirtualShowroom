# Virtual Showroom


## Backend (Django [Python])
- Django REST Framework
- Simple JWT authentication using cookies
- CORS Headers
- CSRF & XSS protection
    - #### Base URLs
        `api/` includes the products module URLs
        `api/admin/auth` includes the authentication module URLs
        
### Authentication Module
- #### Models & Serializers
    - `CustomUser`: adds a ROLE_CHOICES category, with 'Vendedor' and 'Cliente' as options. 
    - `UserSerializer`: serializes the CustomUser model with 'username', 'email' and 'role' fields.The field 'role' is serialized as a read-only field.
- #### Permissions
    - `IsVendedor`: has_permission (from BasePermission) returns true if user from request is authenticated and is vendedor.
- #### Authentication
    - `CustomJWTAuthentication`: gets the COOKIE which contains the token, and returns an user using get_user (from Simple JWT Authentication module) validating the request that uses it.
- #### Views
    - `LoginView`: POST request. Uses a throttling to prevent multiple failed tries. Gets 'username' and 'password' from request.data and authenticates the request using the base authenticate method from django.contrib.auth, only after validating the user input (username and password must be sent). Before assigning a token, it validates the user existence (not None) and the user role (must be 'Vendedor'). This is because only sellers can login in this version, but it aims to scalability looking forward to add customers functionalities in the future.\
    If everything is OK, a 200 HTTP response with JWT tokens for access and refresh in cookies will be sent.
    - `UserView`: GET request. Uses CustomJWTAuthentication class to validate the request, and IsAuthenticated & IsVendedor permission classes. It returns user's username and is_vendedor() as a boolean
    - `LogoutView`: POST request. Uses CustomJWTAuthentication class to validate the request, and IsAuthenticated permission class.\
    First, it looks at the refresh token in the cookies in order to blacklist it. Then, the view simply deletes the cookies which have the authentication tokens.
- #### URLs
    - `login/` uses LoginView
    - `logout/` uses LogoutView
    - `user/` uses UserView

