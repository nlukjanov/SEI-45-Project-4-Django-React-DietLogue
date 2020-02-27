# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED, HTTP_200_OK
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers import UserSerializer, PopulatedUserSerializer
from django.contrib.auth import get_user_model
User = get_user_model()


class UserDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request):
        try:
            user = User.objects.get(pk=request.user.id)
            serialized_user = PopulatedUserSerializer(user)
            return Response(serialized_user.data, status=HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message: User not Found"}, status=HTTP_404_NOT_FOUND)
