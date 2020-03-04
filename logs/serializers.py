from rest_framework import serializers
from .models import Log, Food

class LogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Log
        fields = '__all__'

class FoodSerializer(serializers.ModelSerializer):

    class Meta:
        model = Food
        fields = ('id', 'name', 'measure', 'unit', 'grams', 'calories', 'protein', 'carbs', 'fiber', 'fat', 'sat_fat')