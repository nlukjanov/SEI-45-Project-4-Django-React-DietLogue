from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED, HTTP_200_OK
from django.contrib.auth import get_user_model
from django.conf import settings
import datetime
import jwt
from .serializers import UserSerializer
User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'})

        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

        token = jwt.encode({'sub': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=6)}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})