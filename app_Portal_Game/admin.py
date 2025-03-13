from django.contrib import admin
from app_Portal_Game.models import Article, Game

# Register your models here.
admin.site.register(Article)
admin.site.register(Game)

admin.site_header = "Panel zarządzania grami"
admin.site_title = "Panel Admina"
admin.site.index_title = "Zarządzanie grami"