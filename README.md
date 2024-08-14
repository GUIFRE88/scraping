
---
<h1 align="center">
  🚀 Scraping 🚀
</h1>
<br>



Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Ruby](https://www.ruby-lang.org/pt/)
- [React](https://reactjs.org)
- [MySql](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [Bitly](https://app.bitly.com/)

<div style="display: inline_block"><br>
  <img align="center" alt="Gui-Ruby" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg">
  <img align="center" alt="Gui-React" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg">
  <img align="center" alt="MySql" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg">
  <img align="center" alt="Docker" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg">
</div>


# 💻 Projeto

Este projeto é uma aplicação Ruby on Rails desenvolvida para realizar scraping de perfis do GitHub. O objetivo é coletar e exibir informações detalhadas sobre usuários da plataforma, proporcionando uma visão abrangente de suas atividades e características.

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


# 💻 Contribuição
Sinta-se à vontade para contribuir com melhorias ou correções! Para isso, faça um fork do repositório, crie uma branch com suas alterações e envie um pull request.

# 💻 Licença
Este projeto está licenciado sob a MIT License.


----
