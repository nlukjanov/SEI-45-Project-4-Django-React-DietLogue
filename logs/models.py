from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Food(models.Model):
    name = models.CharField(max_length=200)
    grams = models.FloatField()
    calories = models.FloatField()
    protein = models.FloatField()
    carbs = models.FloatField()
    fiber = models.FloatField()
    fat = models.FloatField()
    sat_fat = models.FloatField()

    def __str__(self):
        return self.name


class Log(models.Model):
    food = models.ForeignKey(Food, related_name='food', null=True, on_delete=models.CASCADE)
    portion = models.PositiveSmallIntegerField()
    owner = models.ForeignKey(User, related_name='logs', null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
