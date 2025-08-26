FROM codercom/code-server:4.96.4

USER ROOT

RUN apt-get update \
    && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


USER coder
# Expose code-server's default port

RUN mkdir -p /home/coder/project
EXPOSE 8080
