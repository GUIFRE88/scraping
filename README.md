Encurtamento de URL

Inicialmente pensei em utilizar a gem 'short_url' porém ela tem poucos downloads e não é muito conhecida, portando optei por utilizar a gem 'bitly', creio que essa gem consiga cumprir bem a função de realizar o encurtamento de urls.


require 'short_url'

original_url = 'http://example.com/some/very/long/url'
short_url = ShortUrl.generate(original_url)

puts "Shortened URL: #{short_url}"


3. Encurtamento de URLs
Ao cadastrar um perfil, a URL do Github deverá ser armazenada de forma encurtada, por exemplo, https://bitly.com/. Você está livre para decidir como irá implementar isso, portanto saiba justificar sua escolha.





Bitly.use_api_version_4
bitly = Bitly::API::Client.new(token: 'c549c653fe4f9d91a7bc3160ed4805e36da30a16')
short_url = bitly.shorten('https://github.com/GUIFRE88')
puts short_url.link