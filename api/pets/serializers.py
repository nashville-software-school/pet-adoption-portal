from rest_framework import serializers
from .models import Pet
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class PetSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    
    class Meta:
        model = Pet
        fields = ['id', 'name', 'type', 'breed', 'age', 'gender', 'size', 
                  'description', 'status', 'created_at', 'updated_at', 'owner']
        read_only_fields = ['created_at', 'updated_at']