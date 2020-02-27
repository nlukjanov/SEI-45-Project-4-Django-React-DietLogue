from rest_framework import serializers
from .models import Log, Food


class FoodSerializer(serializers.ModelSerializer):

    class Meta:
        model = Food
        fields = '__all__'


class LogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Log
        fields = '__all__'


class PopulatedLogSerializer(LogSerializer):
    food = FoodSerializer()
