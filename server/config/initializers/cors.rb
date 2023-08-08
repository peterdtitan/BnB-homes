Rails.application.config.middleware.use Rack::Cors do
  allow do
    origins 'http://localhost:3001'
    resource '*', headers: :any, methods: %i[get post options delete]
  end
end
