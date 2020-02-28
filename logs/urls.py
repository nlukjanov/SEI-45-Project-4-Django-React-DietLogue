from django.urls import path
from .views import LogListView, LogDetailView, FoodListView


urlpatterns = [
    path('logs/', LogListView.as_view()),
    path('logs/<int:pk>/', LogDetailView.as_view()),
    path('foods/', FoodListView.as_view())
]