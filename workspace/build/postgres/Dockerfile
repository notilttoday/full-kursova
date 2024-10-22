FROM bitnami/postgresql:11

USER root

RUN apt-get update -y

RUN apt-get install -y unzip wget make postgis

RUN wget https://github.com/gavinwahl/postgres-json-schema/archive/master.zip \
    && unzip master.zip \
    && cd postgres-json-schema-master \
    && make install \
    && cd -

USER 1001
