from django.shortcuts import render

# Create your views here.
def about(request):
    return render(request, 'about.html')
def index(request):
    return render(request, "index.html")
def home(request):
    greeting = "Witaj na mojej stronie!"
    items = ["jabłko", "banan", "czereśnia"]


    # Kontekst, który przekazujemy do szablonu
    context = {
        'greeting': greeting,
        'items': items,
    }

    return render(request, 'index.html', context)
def kolkoikrzyzyk(request):
    return render(request, "games/kolkoikrzyzyk.html")
def snake(request):
    return render(request, "games/snake.html")
def quiz(request):
    return render(request, "games/quiz.html")
def tetris(request):
    return render(request, "games/tetris.html")