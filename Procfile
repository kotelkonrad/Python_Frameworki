web: >
    npm run build:css &&
    npm run migrate &&
    python manage.py collectstatic --noinput &&
    python manage.py gzipstatic --noinput &&
    gunicorn Portal_Game.wsgi --bind 0.0.0.0:$PORT --no-sendfile --timeout 120