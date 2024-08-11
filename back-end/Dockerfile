FROM ruby:3.2.2

# Instala dependências do sistema
RUN apt-get update -qq && apt-get install -y \
  nodejs \
  npm \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock /app/
RUN bundle install

COPY . /app

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
