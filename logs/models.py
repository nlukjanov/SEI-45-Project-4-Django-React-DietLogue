from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Food(models.Model):
    name = models.CharField(max_length=200)
    measure = models.DecimalField(max_digits=8, decimal_places=2)
    unit = models.CharField(max_length=200)
    grams = models.DecimalField(max_digits=8, decimal_places=2)
    calories = models.DecimalField(max_digits=8, decimal_places=2)
    protein = models.DecimalField(max_digits=8, decimal_places=2)
    carbs = models.DecimalField(max_digits=8, decimal_places=2)
    fiber = models.DecimalField(max_digits=8, decimal_places=2)
    fat = models.DecimalField(max_digits=8, decimal_places=2)
    sat_fat = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name


class Log(models.Model):
    food = models.ForeignKey(Food, related_name='food', on_delete=models.CASCADE)
    portion = models.PositiveSmallIntegerField()
    owner = models.ForeignKey(User, related_name='logs', on_delete=models.CASCADE)
    date = models.DateField()
