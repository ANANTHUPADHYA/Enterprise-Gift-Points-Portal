#!/bin/sh
docker build -t cmpe-272 .

docker tag cmpe-272:latest

docker push preetiparihar/cmpe-272:latest 