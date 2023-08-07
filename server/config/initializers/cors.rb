Rails.application.config.middleware.use Rack::Cors do
  allow do
    origins 'http://localhost:3000', 'http://localhost:3001'
    resource '*', headers: :any, methods: [:get, :post, :options, :delete]
  end
end

