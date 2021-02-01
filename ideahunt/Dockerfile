FROM python:3.8
EXPOSE 5000
RUN pip install poetry
RUN mkdir /ideahunt
WORKDIR /ideahunt
RUN poetry config virtualenvs.create false
COPY . /ideahunt
RUN poetry install --no-interaction
CMD entrypoint.sh
