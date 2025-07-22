from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, Computer, Group
from .serializers import UserSerializer, ComputerSerializer, GroupSerializer

class UserList(APIView):
    def get(self, request):
        users = User.nodes.all()
        data = [UserSerializer(u).data for u in users]
        return Response(data)

class ComputerList(APIView):
    def get(self, request):
        computers = Computer.nodes.all()
        data = [ComputerSerializer(c).data for c in computers]
        return Response(data)

class GroupList(APIView):
    def get(self, request):
        groups = Group.nodes.all()
        data = [GroupSerializer(g).data for g in groups]
        return Response(data)

class UserDetail(APIView):
    def get(self, request, sid):
        try:
            user = User.nodes.get(ObjectSid=sid)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        data = UserSerializer(user).data

        data["GenericAll"] = [n.ObjectSid for n in user.generic_all]
        data["WriteDacl"] = [n.ObjectSid for n in user.write_dacl]
        data["ForceChangePassword"] = [n.ObjectSid for n in user.force_change_pw]

        return Response(data)
    
class ComputerDetail(APIView):
    def get(self, request, sid):
        try:
            computer = Computer.nodes.get(ObjectSid=sid)
        except Computer.DoesNotExist:
            return Response({"error": "Computer not found"}, status=404)

        data = ComputerSerializer(computer).data
        return Response(data)
    
class GroupDetail(APIView):
    def get(self, request, sid):
        try:
            group = Group.nodes.get(ObjectSid=sid)
        except Group.DoesNotExist:
            return Response({"error": "Group not found"}, status=404)

        data = GroupSerializer(group).data
        return Response(data)