from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
import re

User = get_user_model()

# Generate JWT Token
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

# Password strength validation function
def is_password_strong(password):
    return (len(password) >= 8 and 
            re.search(r"[A-Z]", password) and 
            re.search(r"[a-z]", password) and 
            re.search(r"[0-9]", password) and 
            re.search(r"[!@#$%^&*(),.?\":{}|<>]", password))

# User Registration API
class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        
        # Password strength validation
        if not is_password_strong(data["password"]):
            return Response({"error": "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."}, status=status.HTTP_400_BAD_REQUEST)

        # Create user
        user = User.objects.create(
            username=data["username"],
            email=data["email"],
            password=make_password(data["password"]),
            user_type=data.get("user_type", "free"),  # Default to 'free' if not provided
        )
        
        # Generate verification token
        token = get_random_string(length=32)
        user.verification_token = token
        user.save()

        # Send verification email
        subject = 'Email Verification'
        verification_link = request.build_absolute_uri(f'/api/verify-email/{token}/')  # Adjust the URL as needed
        message = f'Please verify your email by clicking on the following link: {verification_link}'
        send_mail(subject, message, 'from@example.com', [data["email"]])  # Replace 'from@example.com' with your sender email

        return Response({"message": "User registered successfully. Please verify your email."}, status=status.HTTP_201_CREATED)

# Login API
class LoginView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = User.objects.filter(username=username).first()

        if user and user.check_password(password):
            tokens = get_tokens_for_user(user)
            return Response({
                **tokens,
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'user_type': user.user_type
                }
            }, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class EmailVerificationView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def get(self, request, token):
        user = User.objects.filter(verification_token=token).first()

        if user:
            user.is_verified = True
            user.verification_token = None  # Clear the token after verification
            user.save()
            return Response({"message": "Email verified successfully"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
