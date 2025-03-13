from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.title} - {self.content}"
