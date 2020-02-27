from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    height = models.PositiveSmallIntegerField(null=True)
    weight = models.FloatField(null=True)
    gender = models.CharField(max_length=1, null=True, choices=GENDER_CHOICES)
    dob = models.DateField(null=True, max_length=8)
    profile_image = models.CharField(max_length=500, blank=True)
