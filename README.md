
---
<h1 align="center">
  🚀 Scraping 🚀
</h1>
<br>



Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Ruby](https://www.ruby-lang.org/pt/)
- [React](https://reactjs.org)
- [Chakra-ui](https://v2.chakra-ui.com/)
- [MySql](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [Bitly](https://app.bitly.com/)
- [Render](https://render.com/)
- [Netlify](https://app.netlify.com/)

<div style="display: inline_block"><br>
  <img align="center" alt="Gui-Ruby" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg">
  <img align="center" alt="Gui-React" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg">
  <img align="center" alt="MySql" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg">
  <img align="center" alt="Docker" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg">
</div>


# 💻 Projeto

Este projeto é uma aplicação Ruby on Rails desenvolvida para realizar scraping de perfis do GitHub. O objetivo é coletar e exibir informações detalhadas sobre usuários da plataforma, proporcionando uma visão abrangente de suas atividades e características.

### Acesso a aplicação (deploy): 
* https://feat-deploy--incredible-youtiao-512c96.netlify.app/


### Busca dos valores:
Para fazer o scraping dos valores foi utilizado gem <b>httparty</b> para fazer uma requisição para o endereço do github informado e a gem <b>nokogiri</b> foi utilizada para converter esse conteúdo HTML em uma estrutura de documento que pode ser facilmente manipulada e consultada.
Isso permite que você acesse e extraia informações específicas do HTML, conforme será explicado a seguir:.

* <b>Parsing de HTML:</b> Após obter o conteúdo HTML de uma página web usando <b>HTTParty</b>, a <b>Nokogiri</b> é utilizada para converter esse conteúdo HTML em uma estrutura de documento que pode ser facilmente manipulada e consultada. 

* <b>Extração de Dados:</b> Com a estrutura de documento criada por Nokogiri, você pode usar seletores CSS e XPath para localizar e extrair elementos específicos do HTML. No seu caso, Nokogiri está sendo usado para encontrar e extrair informações como seguidores, seguindo, estrelas, contribuições, imagem do perfil, organização, localização e nome de usuário a partir do HTML da página do GitHub.

### Encurtamento de link:

Para encurtar URLs, o código utiliza a API do Bitly, um serviço popular para transformar URLs longas em links curtos. O processo é realizado em duas etapas principais:

* A autenticação é feita através de um token de API, que deve ser fornecido pelo serviço Bitly ao registrar uma aplicação. Esse token é necessário para autorizar o acesso à API e permitir a execução de operações como encurtamento de URLs.

* Após a criação do cliente Bitly, o método shorten é chamado para encurtar uma URL longa (link). O shorten envia uma solicitação à API do Bitly, que retorna um objeto representando a URL encurtada. O atributo link deste objeto contém o URL encurtado gerado pelo Bitly, que pode ser utilizado para compartilhar de forma mais compacta.

#  💻 Passos para montar ambiente local

* Fazer o clone no GitHub
* Entrar na pasta <b>back-end</b> e rodar o comando `docker compose build`
* Após rodar `docker compose up`
* Abrir outro aba do terminal entrar dentro do bash através `docker exec -it back-end-web-1 /bin/bash` da aplicação e rodar `rails db:create` e depois `rails db:migrate`.
* Entrar na pasta <b>front-end</b> e rodar `npm install` para baixar os pacotes.
* Após rodar o comando `npm start` para iniciar front-end.


#  💻 Tela inicial
<br>
Na tela inicial temos a listagem de todos os perfis cadastrados.
É possivel fazer a atualização, visualização, edição e exclusão dos perfils, assim como também incluir novos ou fazer o filtro.
<br>

![alt text](https://github.com/GUIFRE88/scraping/blob/main/images/telainicial.png)

#  💻 Incluir novo perfil
<br>
É possivel adicionar um novo perfil apenas informando o nome e o link do github do perfil.
<br>

![alt text](https://github.com/GUIFRE88/scraping/blob/main/images/incluirnovo.png)

#  💻 Editar um perfil
<br>
É possivel editar um perfil apenas alterando o nome e o link do github do perfil.
<br>

![alt text](https://github.com/GUIFRE88/scraping/blob/main/images/editarprofile.png)


#  💻 Filtro
<br>
É possivel filtar registros preenchendo o campo de filtro, ele fará uma busca pelos campos (:name, :link, :organization, :location)
<br>

Conforme as imagens a seguir:
<br>

![alt text](https://github.com/GUIFRE88/scraping/blob/main/images/telainicial.png)

<br>

![alt text](https://github.com/GUIFRE88/scraping/blob/main/images/filtro.png)


#  💻 Visualizar perfil

<br>

É possível visualizar o perfil, não sendo possível alterar nenhum dado.

<br>

![alt text](https://github.com/GUIFRE88/scraping/blob/main/images/visualizarperfil.png)

#  💻 Responsividade

<br>
Foi aplicado responsívidade ao projeto.
<br>

![alt text](https://github.com/GUIFRE88/scraping/blob/main/images/responsividade1.png)

#  💻 Cobertura de testes Rspec

<br>

A seguir temos a cobertura geral dos testes com Rspec aplicados ao back-end em Ruby.

<br>

![alt text](https://github.com/GUIFRE88/scraping/blob/main/images/rspec-cobertura.png)


#  💻 Encurtamento de links

Acabei utilizando a ferramenta https://app.bitly.com/ para encurtamentos de links através da gem <b>bitly</b>, acabei avaliando
outras gems como <b>tinyurl</b> porém não corresponderam bem ao meu objetivo final.


#  💻 Melhorias no projeto

Todo projeto oferece desafios e melhorias, creio que as melhorias seriam:

 * O token do Bitly, o correto seria jogar para dentro do .env e utilizar o gitcrypt ou alguma ferramenta para criptografar fontes específicos, essa seria uma implementação interessante.
 * A parte do front-end poderia apresentar uma paginação, talvez utilizando a gem <b>will_paginate</b>. 

#  💻 Gaps no projeto

* Identifiquei um Gap, que utilizando a gem <b>httparty</b>  e <b>Nokogiri</b> não seria capaz resolver, seria referente a busca do valor "Nº DE CONTRIBUIÇÕES", pois esse valor ele é carregado de forma reativa após o carregamento da página e o mesmo não está presenta quando é feita a requisição utilizando a <b>httparty</b>, seria necessário utilizar algum outro meio para buscar esse valor, talvez como através da api do GitHub.

#  💻 Deploy do projeto

* Foi usado o NetliFly para fazer o deploy do front-end da aplicação.
* Foi utilizado o Render para fazer a publicação da Api e a criação do banco PostgreSql(Obs. A aplicação local, foi feita com Mysql, precisei fazer essa mudança para usar o banco do Render também.)
* Link para acesso: https://feat-deploy--incredible-youtiao-512c96.netlify.app/


# 💻 Contribuição
Sinta-se à vontade para contribuir com melhorias ou correções! Para isso, faça um fork do repositório, crie uma branch com suas alterações e envie um pull request.

# 💻 Licença
Este projeto está licenciado sob a MIT License.


----
