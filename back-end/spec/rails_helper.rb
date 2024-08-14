# spec/rails_helper.rb

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rspec/rails'
require 'factory_bot_rails'
require 'faker'
require 'simplecov'
require 'webmock/rspec'

# Add additional requires below this line. Rails is not loaded until this point!

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # Configures FactoryBot
  config.include FactoryBot::Syntax::Methods

  # Ensure that tests run within a transaction
  config.use_transactional_fixtures = true

  # Additional RSpec configurations
end

SimpleCov.start do
  add_filter '/spec/'
end

WebMock.disable_net_connect!(allow_localhost: true)