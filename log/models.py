from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Log(models.Model):
    food = models.ForeignKey(Food, related_name='food', null=True, on_delete=models.CASCADE)
    portion = models.PositiveSmallIntegerField()
    owner = models.ForeignKey(User, related_name='logs', null=True, on_delete=models.CASCADE)
