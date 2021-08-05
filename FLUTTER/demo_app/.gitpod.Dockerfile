FROM gitpod/workspace-full:latest

ENV FLUTTER_HOME=/home/gitpod/flutter
ENV FLUTTER_VERSION=v1.9.1+hotfix.6-stable

# Install dart
USER root

RUN curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  apt-get update && \
  apt-get -y install libpulse0 build-essential libkrb5-dev gcc make && \
  apt-get clean && \
  apt-get -y autoremove && \
  apt-get -y clean && \
  rm -rf /var/lib/apt/lists/*;

USER gitpod

# Install Flutter sdk
RUN cd /home/gitpod && \
  wget -qO flutter_sdk.tar.xz https://storage.googleapis.com/flutter_infra/releases/stable/linux/flutter_linux_${FLUTTER_VERSION}.tar.xz && \
  tar -xvf flutter_sdk.tar.xz && rm flutter_sdk.tar.xz

RUN cd /home/gitpod && \
  wget -qO android_studio.zip \
  https://dl.google.com/dl/android/studio/ide-zips/3.3.0.20/android-studio-ide-182.5199772-linux.zip && \
  unzip android_studio.zip && \
  rm -f android_studio.zip

RUN mkdir -p /home/gitpod/android-sdk && \
  cd /home/gitpod/android-sdk && \
  wget https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip && \
  unzip sdk-tools-linux-4333796.zip && \
  rm -f sdk-tools-linux-4333796.zip

RUN $FLUTTER_HOME/bin/flutter channel master && $FLUTTER_HOME/bin/flutter config --enable-web

# Change the PUB_CACHE to /workspace so dependencies are preserved.
ENV PUB_CACHE=/workspace/.pub_cache

# add executables to PATH
RUN echo 'export PATH=${FLUTTER_HOME}/bin:${FLUTTER_HOME}/bin/cache/dart-sdk/bin:${PUB_CACHE}/bin:${FLUTTER_HOME}/.pub-cache/bin:$PATH' >>~/.bashrc