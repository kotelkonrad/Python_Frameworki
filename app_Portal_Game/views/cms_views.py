from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "index.html")

def about(request):
    return render(request, "about.html")
def labirynt(request):
    return render(request, "games/labirynt.html")
def snake(request):
    return render(request, "games/snake.html")
def quiz(request):
    return render(request, "games/quiz.html")
def tetris(request):
    return render(request, "games/tetris.html")