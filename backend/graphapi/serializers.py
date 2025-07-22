from rest_framework import serializers
from .models import User, Computer, Group

class UserSerializer(serializers.Serializer):
    DistinguishedName = serializers.CharField()
    ObjectSid = serializers.CharField()
    WhenCreated = serializers.CharField()

class ComputerSerializer(serializers.Serializer):
    DistinguishedName = serializers.CharField()
    ObjectSid = serializers.CharField()
    OperatingSystem = serializers.CharField()
    WhenCreated = serializers.CharField()

class GroupSerializer(serializers.Serializer):
    DistinguishedName = serializers.CharField()
    ObjectSid = serializers.CharField()
    Description = serializers.CharField()
    WhenCreated = serializers.CharField()
