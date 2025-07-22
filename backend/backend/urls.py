from django.contrib import admin
from django.urls import path
from graphapi.views import UserList, ComputerList, GroupList, UserDetail, ComputerDetail, GroupDetail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users', UserList.as_view()),
    path('api/v1/computers', ComputerList.as_view()),
    path('api/v1/groups', GroupList.as_view()),

    path('api/v1/users/<str:sid>', UserDetail.as_view()),
    path('api/v1/computers/<str:sid>', ComputerDetail.as_view()),
    path('api/v1/groups/<str:sid>', GroupDetail.as_view()),
]
