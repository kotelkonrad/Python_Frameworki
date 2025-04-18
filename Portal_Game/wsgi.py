"""
WSGI config for Portal_Game project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
from pathlib import Path
from django.contrib import staticfiles
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise

BASE_DIR = Path(__file__).resolve().parent.parent
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Portal_Game.settings")
application = get_wsgi_application()

# Używamy STATIC_ROOT jako katalog plików statycznych
static_path = os.path.join(BASE_DIR, "staticfiles")
application = WhiteNoise(application, root=static_path)
application.use_finders = True
