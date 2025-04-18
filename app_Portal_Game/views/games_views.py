from django.shortcuts import render
from app_Portal_Game.models.GameModel import Game


def games_index(request):
    games = Game.objects.all().order_by('-id')  # Pobiera wszystkie gry, sortując je malejąco po ID
    context = {
        'games': games,
    }
    return render(request, 'games_list.html', context)


def search(request):
    query = request.GET.get('q', '')
    results = Game.objects.filter(title__icontains=query) if query else []
    context = {
        'query': query,
        'results': results,
    }
    return render(request, 'search_results.html', context)
