from django.urls import path
from .views import UserDetailView


urlpatterns = [
    path('myaccount/', UserDetailView.as_view())
]