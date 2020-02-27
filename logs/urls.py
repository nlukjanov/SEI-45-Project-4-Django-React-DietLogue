from django.urls import path
from .views import LogListView, LogDetailView


urlpatterns = [
    path('', LogListView.as_view()),
    path('<int:pk>/', LogDetailView.as_view())
]