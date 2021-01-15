FROM python:3.8
RUN mkdir /ideahunt
COPY . /ideahunt
WORKDIR /ideahunt
RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction
EXPOSE 5000
ENTRYPOINT ["gunicorn -b 0.0.0.0:$PORT ideahunt.app:app"]