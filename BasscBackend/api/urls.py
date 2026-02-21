from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'homepagepic', views.HomePagePicViewSet, basename='homepagepic')
router.register(r'boards', views.BoardViewSet, basename='board')
router.register(r'introductions', views.IntroductionViewSet, basename='introduction')
router.register(r'news', views.NewsViewSet, basename='news')
router.register(r'navitems', views.NavItemViewSet, basename='navitem')
router.register(r'courses', views.CourseViewSet, basename='course')

urlpatterns = [
    path('health/', views.health_check),
    path('homepage/', views.homepage),
    path('courses/by_slug/<slug:slug>/', views.course_by_slug),
    path('auth/login/', views.auth_login),
    path('auth/logout/', views.auth_logout),
    path('auth/me/', views.auth_me),
    path('upload/', views.upload_image),
    path('', include(router.urls)),
]
