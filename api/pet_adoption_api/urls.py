"""
URL configuration for pet_adoption_api project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("pets.urls")),
    path("api/auth/", include("accounts.urls")),
    path("api-auth/", include("rest_framework.urls")),
    path("docs/", include_docs_urls(title="Pet Adoption API")),
]
