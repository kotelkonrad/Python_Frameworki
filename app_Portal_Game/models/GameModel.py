from django.db.models.deletion import models

class Game(models.Model):
    title = models.CharField(max_length=150, null=True),
    content = models.CharField(max_length=255),
    file = models.FileField(upload_to='games/')

    def __str__(self):
        return f"{self.title}"

