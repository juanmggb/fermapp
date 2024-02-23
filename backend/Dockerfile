FROM python:3.11.4-slim-bullseye

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

COPY requirements.txt /app/

RUN apt-get update \
    && pip install --upgrade pip \
    && pip install -r requirements.txt


# This is necessary to store the default image for users inside the container
# RUN mkdir -p /tmp/media/images/default
# COPY user-default.jpg /tmp/media/images/default/

COPY . /app
