web: >
  npm run build:css
  python manage.py migrate &&
  python manage.py collectstatic --noinput &&
  gunicorn Portal_Game.wsgi --bind 0.0.0.0:$PORT