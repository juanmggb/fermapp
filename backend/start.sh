#!/bin/sh
python manage.py makemigrations element
python manage.py makemigrations users
python manage.py makemigrations experiment
# python manage.py makemigrations 
python manage.py migrate --no-input
# python manage.py runserver 0.0.0.0:8000
python manage.py collectstatic --no-input
gunicorn backend.wsgi:application --bind 0.0.0.0:8000
