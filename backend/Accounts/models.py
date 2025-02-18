from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    USER_TYPES = (
        ("free", "Free User"),
        ("premium", "Premium User"),
        ("admin", "Admin"),
    )
    user_type = models.CharField(max_length=10, choices=USER_TYPES, default="free")
    verification_token = models.CharField(max_length=32, null=True, blank=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username
# Create your models here.
