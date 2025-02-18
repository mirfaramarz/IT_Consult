from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from allauth.account.views import LoginView, SignupView
from .views import CustomSignupView, CustomLoginView, CustomConfirmEmailView

urlpatterns = [
    path("accounts/register/", CustomSignupView.as_view(), name="account_signup"),
    path("accounts/login/", CustomLoginView.as_view(), name="custom_login"),
    path("accounts/confirm-email/", CustomConfirmEmailView.as_view(), name="confirm-email"),
    path("accounts/confirm-email/<str:key>/", CustomConfirmEmailView.as_view(), name="account_confirm_email"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
