from django.shortcuts import render
from app_Portal_Game.models import Game

# Create your views here.
def index(request):
    games = Game.objects.all().order_by('-id')

    # Kontekst, który zostanie przekazany do szablonu lista gier

    context = {
        'games': games
                }

    return render(request, "index.html")
