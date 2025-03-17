"""
URL configuration for Portal_Game project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app_Portal_Game.views.cms_views import home, about, kolkoikrzyzyk, quiz, snake, tetris
from app_Portal_Game.views.games_views import games_index

urlpatterns = [
    path('', home, name='home'),
    path('about/', about, name='about'),
    path('games/', games_index, name='games:index'),
    path('admin/', admin.site.urls),
    path('kolkoikrzyzyk/', kolkoikrzyzyk, name='games/kolkoikrzyzyk'),
    path('quiz/', quiz, name='games/quiz'),
    path('snake/', snake, name='games/snake'),
    path('tetris/', tetris, name='games/tetris'),

]





