FROM python:3.6-slim

RUN apt-get -y update
RUN apt-get install -y build-essential
RUN apt-get install -y nano

ADD . /opt
WORKDIR /opt/

RUN pip3 install -r requirements.txt

ENTRYPOINT [ "python3", "./flask_app.py"]