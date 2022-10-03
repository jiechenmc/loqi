FROM python:slim

WORKDIR /app

COPY ./requirements.txt ./


RUN pip install -r requirements.txt

COPY ./ ./

RUN python core.py

CMD [ "uvicorn", "main:app", "--reload", "--host", "0.0.0.0"]

EXPOSE 8000