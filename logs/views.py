# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED, HTTP_200_OK
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Log, Food
from .serializers import LogSerializer, FoodSerializer


class LogListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        # not required (user will have populated log for particular user)
        logs = Log.objects.all()
        serialized_logs = LogSerializer(logs, many=True)
        return Response(serialized_logs.data, status=HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        log = LogSerializer(data=request.data)
        if log.is_valid():
            log.save()
            return Response(log.data, status=HTTP_201_CREATED)
        return Response(log.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class LogDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request, pk):
        try:
            log = Log.objects.get(pk=pk)
            serialized_log = LogSerializer(log)
            return Response(serialized_log.data)
        except Log.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            log = Log.objects.get(pk=pk)
            updated_log = LogSerializer(log, data=request.data, partial=True)
            if updated_log.is_valid():
                updated_log.save()
                return Response(updated_log.data, status=HTTP_202_ACCEPTED)
            return Response(updated_log.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except Log.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            log = Log.objects.get(pk=pk)
            if log.owner.id != request.user.id:
                return Response(HTTP_401_UNAUTHORIZED)
            log.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except Log.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)


class FoodListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        foods = Food.objects.all()
        serialized_foods = FoodSerializer(foods, many=True)
        return Response(serialized_foods.data, status=HTTP_200_OK)
