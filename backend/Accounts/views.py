from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework import status
from django.contrib.auth import authenticate
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from allauth.account.utils import send_email_confirmation
from allauth.account.adapter import get_adapter
from allauth.account.models import EmailAddress
from django.urls import reverse
from allauth.account.views import ConfirmEmailView
from django.urls import reverse
from django.shortcuts import redirect

User = get_user_model()

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    
    # Add custom claims to the token
    refresh['username'] = user.username
    refresh['email'] = user.email
    refresh['user_type'] = user.user_type
    refresh['is_staff'] = user.is_staff

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class CustomSignupView(APIView):
    permission_classes = []  # Allow anyone to register

    @method_decorator(csrf_exempt)  # Disable CSRF for register
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not email or not password:
            return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User(username=username, email=email)
        user.set_password(password)
        user.is_active = False  # Set user as inactive until email is confirmed
        user.save()

        # Explicitly create an EmailAddress object
        EmailAddress.objects.create(user=user, email=email, primary=True, verified=False)

        # Send email confirmation without a custom redirect URL
        send_email_confirmation(request, user)

        return Response({"message": "Please confirm your email to complete the registration."}, status=status.HTTP_201_CREATED)
    
    
class CustomLoginView(APIView):
    permission_classes = []  # Allow anyone to log in

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user is not None and user.is_active:  # Check if user is active
            tokens = get_tokens_for_user(user)
            return Response(tokens, status=status.HTTP_200_OK)
        return Response({"error": "Invalid Credentials or email not verified"}, status=status.HTTP_401_UNAUTHORIZED)

class CustomConfirmEmailView(ConfirmEmailView):
    def get(self, request, *args, **kwargs):
        key = kwargs.get("key")  # Extract the confirmation key
        return redirect(f'http://localhost:3000/confirm-email/{key}')  # Redirect to React frontend