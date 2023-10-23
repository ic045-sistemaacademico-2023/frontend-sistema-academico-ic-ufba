# Sistema Acadêmico para o IC UFBA

## Componente Curricular

### IC045: Tópicos em Sistemas de Informação e Web I

## [Deploy](https://ic045-siag.netlify.app)

## [Drive](https://drive.google.com/drive/folders/1QJ4PaNYhIkvsSdNPGOQN3nP7j8SYYtgN?usp=sharing)

## [Requisitos](https://docs.google.com/document/d/1Dzjv17Old3uu1rwtQg_xaMUMJ1OL9CvtbSKM_gnplww/edit?usp=drive_link)

## [Modelagem do banco de dados](https://dbdesigner.page.link/28BjhNgupwdhX9Tp8)

## [Protótipo](https://www.figma.com/file/43HvdK6cT0hJ4XjSFZDL04/SIGA---IC045?type=design&mode=design&t=ogiUXiYnDVzzZ5J4-1)

## [Documento de Arquitetura de Software](https://docs.google.com/document/d/1b8DwGg7oZ-APcK7_UBkhEQnsvwaKZnzY/edit?usp=sharing&ouid=114509522047919530579&rtpof=true&sd=true)

## [Plano de Teste](https://docs.google.com/document/d/14-j3w0bYvJGLhpsmsXG_i86Z4zQMQpVhaE_vOw9HVgU/edit)

## [Documento de Implantação/Instalação]([https://docs.google.com/document/d/14-j3w0bYvJGLhpsmsXG_i86Z4zQMQpVhaE_vOw9HVgU/edit?usp=sharing](https://docs.google.com/document/d/1AfUttj2DfImhIPl24RdDgZtM6SBJ3-jEPB4A_ky386s/edit?usp=sharing))

## Tecnologias

1. JavaScript
2. ReactJS
3. Tailwind CSS

## Time de Desenvolvimento

| Nome           | Cargo                                   |
| -------------- | --------------------------------------- |
| Karen Botelho  | Gerente do Projeto e desenvolvedor      |
| Gustavo Mendel | Vice Gerente do Projeto e desenvolvedor |
| Elis Marcela   | Desenvolvedor                           |
| Victor Andrade | Desenvolvedor                           |
| Glauber        | Desenvolvedor                           |
| Igor Dantas    | Desenvolvedor                           |
| Lávio          | Desenvolvedor                           |
| Vitor de Jesus | Desenvolvedor                           |
| Lucas Natanael | Desenvolvedor                           |

## Setup

Todo o ambiente de desenvolvimento desde projeto é baseado em sistemas Unix (**Linux** e **Mac**), entretanto este mesmo ambiente pode ser replicado no Windows com o WSL (Windows Subsystem for Linux).

Requer o [NodeJS](https://nodejs.org/pt-br) instalado no seu Linux, pelo menos na versão 16.16.0. Além do Git para fazer clone do repositório.

### Clonando o repositório

```bash
git clone https://github.com/ic045-sistemaacademico-2023/frontend-sistema-academico-ic-ufba.git sistema-academico-ic
cd sistema-academico-ic
```

### Instalando o Yarn

```bash
npm install -g yarn
```

### Baixe os node_modules e execute o programa

```bash
yarn
yarn dev
```

Agora abra o link pelo navegador: [http://127.0.0.1:5173/](http://127.0.0.1:5173)

## Instruções para rodar o back-end localmente e Integrar com o front

Novamente, estou considerando que você está em um ambiente Linux, de preferência o Ubuntu. Caso esteja no Windows, simplesmente instale o WSL2, com a distribuição Ubuntu.

### Instale o Java 17 (openjdk-java17) de acordo com a sua distribuição

Para a distribuição Ubuntu, faça o seguinte, caso não seja, procure algum tutorial no google.

Abra o terminal e rode os seguintes comandos:

`sudo add-apt-repository ppa:linuxuprising/java`

Ele vai pedir uma mensagem de confirmação de leitura dos termos, tecle Enter.

Depois atualize a lista de pacotes do Ubuntu:

`sudo apt update -y`

Caso esteja numa WSL com um Ubuntu recém instalado e der o seguinte erro: `E: Release file for http://security.ubuntu.com/ubuntu/dists/jammy-security/InRelease is not valid yet (invalid for another 3h 33min 11s). Updates for this repository will not be applied.`. Rode o seguinte comando e dê o `sudo apt update` novamente:

`sudo hwclock --hctosys`

Após atualizar a lista de pacotes com o apt update, instale o Java 17 rodando o seguinte comando:

`sudo apt install oracle-java17-installer --install-recommends -y`

Vai pedir várias confirmações, então sempre escolha o OK e Yes, usando as 'setinhas' e Enter para escolher.

Caso esteja tudo ok, rode o comando `java --version` e deverá vir a versão 17, caso venha erro, procure ajuda e/ou submeta uma issue com seu problema.

### Rode o projeto

Faça o clone usando o git:

`git clone git@github.com:ic045-sistemaacademico-2023/backend-sistema-academico-ic-ufba.git`

_Esse comando está usando a opção de clonar por SSH_

Depois entre no projeto:

`cd backend-sistema-academico-ic-ufba`

E instale as dependências do Maven usando o comando:

`./mvnw install`

_Pode demorar um pouco a depender da internet_

Logo em seguida faça um build do projeto:

`./mvnw clean package`

Feito isso, o projeto estará pronto para ser rodado usando o comando:

`java -jar target/sistema-academico-0.0.1-SNAPSHOT.jar`

E pronto... não exatamente, você perceberá que subiu um erro, isso porque a gente ainda falta instalar e configurar o banco de dados MySQL.

### Instalando o MYSQL

`sudo apt install mysql-server -y`

`sudo systemctl start mysql.service`

`sudo systemctl enable mysql.service`

`sudo mysql_secure_installation`

Coloque a senha como `root` para padronizar.

Responda as perguntas com Y ou N, não importa muito o que escolher, coloque N para tudo.

Pronto. Agora na raiz do projeto back-end, crie um arquivo `.env.properties`:

```bash
DATABASE_URL=jdbc:mysql://localhost:3306/sistemaacademico?useSSL=false&allowPublicKeyRetrieval=true&useTimezone=true=America/Bahia
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
```

Agora, rode as migrations do projeto entrando na linha de comando do Mysql:

`mysql -u root -proot` (exatamente assim, sem espaço entre -p e root)

Depois faça:

`source ./src/main/java/com/ic045/sistemaacademico/utils/migrations/01_Database.sql`

`source ./src/main/java/com/ic045/sistemaacademico/utils/migrations/Insert.sql`

### Finalmente rode o projeto novemente

`./mvnw clean package && java -jar target/sistema-academico-0.0.1-SNAPSHOT.jar`

Finalizado. É possível que gere alguns erros na execução, mas se não interromper o comando e vier algo parecido com isso logo após o erro, então está funcionando normalmente.

```bash
2023-10-09T23:02:10.790-03:00  INFO 121988 --- [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2023-10-09T23:02:11.118-03:00  INFO 121988 --- [           main] o.s.d.j.r.query.QueryEnhancerFactory     : Hibernate is in classpath; If applicable, HQL parser will be used.
2023-10-09T23:02:11.635-03:00  WARN 121988 --- [           main] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning
2023-10-09T23:02:12.010-03:00  INFO 121988 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path '/sistemaacademico'
2023-10-09T23:02:12.028-03:00  INFO 121988 --- [           main] c.i.s.SistemaAcademicoApplication        : Started SistemaAcademicoApplication in 6.021 seconds (process running for 6.994)
```
