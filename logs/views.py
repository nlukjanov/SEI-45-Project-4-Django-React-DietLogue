# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED, HTTP_200_OK
from .models import Log
# from .serializers import LogSerializer, PopulatedLogSerializer


# class LogListView(APIView):

#     def get(self, _request):
#         logs = Log.objects.all()
#         serialized_logs = PopulatedLogSerializer(logs, many=True)
#         return Response(serialized_logs.data, status=HTTP_200_OK)