from django.db import models
from django.contrib.auth.models import User

class Pet(models.Model):
    PET_TYPES = (
        ('DOG', 'Dog'),
        ('CAT', 'Cat'),
        ('BIRD', 'Bird'),
        ('RABBIT', 'Rabbit'),
        ('OTHER', 'Other'),
    )
    
    PET_STATUS = (
        ('AVAILABLE', 'Available'),
        ('PENDING', 'Pending'),
        ('ADOPTED', 'Adopted'),
    )
    
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=10, choices=PET_TYPES)
    breed = models.CharField(max_length=100, blank=True)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=[('MALE', 'Male'), ('FEMALE', 'Female')])
    size = models.CharField(max_length=10, choices=[('SMALL', 'Small'), ('MEDIUM', 'Medium'), ('LARGE', 'Large')])
    description = models.TextField()
    status = models.CharField(max_length=10, choices=PET_STATUS, default='AVAILABLE')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pets', null=True, blank=True)
    
    def __str__(self):
        return self.name
