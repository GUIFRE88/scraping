Encurtamento de URL

Inicialmente pensei em utilizar a gem 'short_url' porém ela tem poucos downloads e não é muito conhecida, portando optei por utilizar a gem 'bitly', creio que essa gem consiga cumprir bem a função de realizar o encurtamento de urls.


require 'short_url'

original_url = 'http://example.com/some/very/long/url'
short_url = ShortUrl.generate(original_url)

puts "Shortened URL: #{short_url}"




2. Webscrapper
Quando o cadastro de um novo membro for realizado, então através de um webscrapper deve-se recuperar e armazenar da página do Github as informações:

Nome de usuário do Github
Número de Followers
Número de Following
Número de Stars
Número de contribuições no último ano
URL da imagem de perfil
Fique atento porque algumas informações podem ou não existir, tais como:

Organização
Localização
Lembre-se que você pode usar classes, ids e data-attributes para encontrar no HTML os dados que precisa. Por exemplo:

Nome de usuário do Github: p-nickname vcard-username d-block

Informações
Nome: Yukihiro "Matz" Matsumoto
Nick do Github: @matz
Followers: 7.7k
Following: 1
Stars: 7
Contribuições no último ano: 663
URL da imagem de perfil: https://avatars2.githubusercontent.com/u/30733?s=460&v=4



3. Encurtamento de URLs
Ao cadastrar um perfil, a URL do Github deverá ser armazenada de forma encurtada, por exemplo, https://bitly.com/. Você está livre para decidir como irá implementar isso, portanto saiba justificar sua escolha.

4. Re-escanear
Após cadastrado, também deve ser possível escanear (de forma manual) o perfil do Github em busca de novas informações que possam ter sido adicionadas.

5. Interface de Usuário
Esse é um desafio Fullstack, portanto você deverá implementar o front-end também. Ele deve ser funcional, portanto não se preocupe se suas habilidades de design não forem 10/10 😅.

As interações necessárias são:

5.1 Busca e resultados
A página principal do sistema deverá exibir um campo de busca.
A busca poderá ser preenchida com qualquer informação do perfil (nome, usuário do Github, organização, localização, etc).
Os resultados deverão ser uma lista de usuários contendo nome, URL encurtada do perfil do Github e botões para editar/visualizar o registro.
5.2 Perfil
A página de perfil deverá exibir todos os campos salvos.
Deve-se exibir a imagem de perfil do usuário utilizando a URL salva do Github.
Deve-se adicionar botões para re-escanear/editar/remover o registro.
OBS: deve-se apenas editar o nome e URL, já que os outros dados serão extraídos com o Webscrapper.
Avaliação
Avaliaremos sua solução por completo, incluindo código front-end, back-end, testes e documentação. Preste atenção nos seguintes pontos:

Arquitetura geral da solução;
Se possível, publique sua aplicação para que possamos acessar remotamente;
Boas práticas de codificação;
Lembre-se que é um desafio Fullstack, então avaliaremos todas as habilidades: Ruby, Rails, HTML, CSS e Javascript.
Busque trazer algum conhecimento em relação ao frontend, dessa forma, podemos entender um pouco mais do seu conhecimento nessa frente também.
Técnicas e padrões de projeto;
SOLID e DRY, por exemplo.
Testes;
Documentação/README contendo:
Passo a passo de instalação;
Descrição da solução:
Técnicas utilizadas;
Algum ponto de melhoria? (Nenhum código é perfeito. Enxergar esses pontos também é importante)
Limitações.
Você está livre para definir a melhor arquitetura e tecnologias para solucionar este desafio, mas não se esqueça de contar sua motivação no arquivo README que deve acompanhar sua solução.

Bom desafio!