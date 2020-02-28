from logs.models import Log, Food
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email',
                  'height', 'weight', 'gender', 'dob', 'profile_image', 'logs')


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


class PopulatedUserSerializer(UserSerializer):
    logs = PopulatedLogSerializer(many=True)