require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module App
  class Application < Rails::Application
    config.load_defaults 7.0
    config.api_only = true
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head]
      end
    end
    config.autoload_paths += %W(#{config.root}/app/repository)
    config.autoload_paths += %W(#{config.root}/app/service)
    config.autoload_paths += %W(#{config.root}/lib)
  end
end
