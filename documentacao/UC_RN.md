# <h1 align='center'> Documento de Casos de Uso e Regras de Negócio</h1>

# <h2 align='center'> Projeto: Camarão Iotizado</h2>

** **
### Índice
- **[Atores](#atores)**
- **[Casos de Uso](#casos-de-uso)**
- **[Regras de Negócio](#regras-de-negócio)**
- **[Mensagens](#mensagens)**
- **[Glossário](#glossário)**
- **[Diagramas](#diagramas)**


** **
### Atores
| **Ator** | **Descrição** |
| --- | --- |
| Autenticado | Usuário que realizou a autenticação no sistema |
| Não autenticado | Usuário antes de realizar a autenticação no sistema |
| Operador do Sistema | Usuário autenticado responsável por definir as configurações do sistema |
| Gerente | Usuário autenticado responsável por supervisionar e definir as produções  |
| Cuidador do tanque | Usuário autenticado responsável por garantir as propriedades dos tanques|
| Biólogo | Usuário autenticado responsável por garantir a produção de camarão de acordo com o esperado |
| Boia | Responsável por fornecer dados dos sensores | 
| Tanque | Agregador responsável por coletar os dados e transforma-los em informação |


** **
### Casos de Uso
| UC01 | Autenticar usuário |
| --- | --- |
| Breve Descrição | Autenticar um usuário no sistema |
| Atores | Não Autenticado | 
| Pré-Condições | |
| Fluxo Principal |<ol><li>O ator informa o nome de usuário e a senha </li><li>O sistema valida as informações  **[A1][A2]** </li> <li>O sistema autentica o ator</li><li>O sistema fornece ao ator as funcionalidades atribuídas ao seu tipo de ator </li> </ol>|
| Fluxos Alternativos | **[A1]Nome de usuário inválido** <ol><li>O sistema invalida a autenticação</li><li>O sistema informa o erro utilizando a mensagem de erro **[[MSG01]](#mensagens)**</li> <li>O sistema redireciona o ator para pagina de login</li> </ol>**[A2]Senha inválida**<ol><li>O sistema invalida a autenticação</li> <li>O sistema informa o erro utilizando a mensagem de erro **[[MSG02]](#mensagens)**</li> <li>O sistema redireciona o ator para pagina de login</li></ol> |
| Fluxo de Exceção | |
| Pós-Condições | O ator deve estar autenticado com o seu nível de permissão correspondente|

| UC02 | Cadastrar usuário |
| --- | --- |
| Breve Descrição | Cadastrar um novo usuário |
| Atores | Operador do Sistema, Gerente |
| Pré-Condições | Ator ter concluído o fluxo principal do UC28 - Visualizar lista de usuários |
| Fluxo Principal |<ol><li>O Operador do Sistema insere as informações necessárias para o cadastro de um usuário: nome de usuário, e-mail e o nível **[A1]**</li><li>O sistema valida as informações **[A2][A3]**</li><li>O sistema informa que o novo usuário foi cadastrado com a mensagem **[[MSG03]](#mensagens)**</li> <li>O Sistema envia para o novo usuário sua senha temporária</li> <li>O Sistema notifica o gerente sobre o novo usuário</li></ol>|
| Fluxos Alternativos |**[A1] Cancelar cadastro**<ol><li>O Operador do Sistema executa a funcionalidade de cancelar cadastro</li><li>O Operador do Sistema é redirecionado para página princial</li></ol>**[A2] Nome de usuário já cadastrado no sistema**<ol><li>O Sistema invalida as informações</li><li>O sistema exibe a mensagem de erro **[[MSG04]](#mensagens)** </li><li>O sistema retorna para o passo 1 do fluxo principal</li></ol>**[A3] Email já cadastrado no sistema**<ol><li>O Sistema invalida as informações</li><li>O sistema exibe a mensagem de erro **[[MSG14]](#mensagens)** </li><li>O sistema retorna para o passo 1 do fluxo principal</li></ol>|
| Fluxo de Exceção | |
| Pós-Condições ||


| UC03 | Definir uma nova produção |
| --- | --- |
| Breve Descrição | O Gerente define no sistema uma nova produção a partir da demanda recebida do mercado/cliente e Biólogo é notificado |
| Atores | Gerente, Biólogo |
| Pré-Condições |Ator ter concluído o fluxo principal do UC26 - Visualizar lista de produções | 
| Fluxo Principal |<ol><li>O Gerente define a nova produção que deve ser atendida, informando a quantidade de camarão (kg), classe, nome ,cliente e data de despesca **[A1]**</li><li>O sistema confirma inserção de nova produção exibindo a mensagem de sucesso **[[MSG05]](#mensagens)**</li><li>O sistema notifica o Biólogo sobre a nova produção</li></ol>|
| Fluxos Alternativos | **[A1] Cancelar definição de produção**<ol><li>O Gerente executa a funcionalidade de cancelar a criação</li><li>O Gerente é redirecionado para a página principal do sistema</li></ol> |
| Fluxo de Exceção | |
| Pós-Condições | |

| UC04 | Visualizar informações de uma produção |
| --- | --- |
| Breve Descrição | Gerente ou Biólogo verificam uma determinada demanda de produção registradas no sistema |
| Atores | Gerente, Biólogo |
| Pré-Condições |Ator ter concluído o fluxo principal do UC26 - Visualizar lista de produções|
| Fluxo Principal |<ol><li>O ator seleciona uma das produções exibidas</li><li>O sistema exibe as propriedades da produção selecionada **[[G3]](#glossário)**</li></ol> |
| Fluxos Alternativos | |
| Fluxo de Exceção | |
| Pós-Condições | |

| UC05 | Definir parâmetros de funcionamento do tanque |
| --- | --- |
| Breve Descrição | Define as propriedades do tanque de acordo com a produção especificada |
| Atores | Biólogo, Cuidador do tanque, Tanque, Boia|
| Pré-Condições | Ator ter concluído o fluxo principal do UC04 - Visualizar informações de um tanque |
| Fluxo Principal |<ol><li>O biólogo seleciona a opção de definir/editar as propriedades do tanque</li><li>O sistema exibe as propriedades que podem ser definidas para a produção: Nível d'água, temperatura, turbidez, salinidade e quantidade de camarões</li><li>O biólogo define as propriedades de acordo com as opções apresentadas **[A1]**</li><li>O sistema confirma a alteração, exibindo a mensagem **[[MSG06]](#mensagens)**</li><li>O sistema notifica o Cuidador do tanque sobre a alteração nas propriedades do tanque</li> </ol>|
| Fluxos Alternativos | **[A1] Cancelar definição**<ol><li>O biólogo seleciona a opção de cancelar definição</li><li>O sistema retornar para página de informações do tanque</li> </ol>|
| Fluxo de Exceção |  |
| Pós-Condições |  |

| UC06 | Realizar consultas temporais |
| --- | --- |
| Breve Descrição | O ator realiza uma consulta de forma temporal sobre informações de um tanque |
| Atores | Gerente, Biólogo, Cuidador do Tanque, Tanque |
| Pré-Condições | |
| Fluxo Principal |<ol><li>O usuário define o(s) tanque(s) a ser(em) consultado(s) **[A1]**</li><li>O usuário define parâmetros de acordo com as informações disponíveis para o seu nível de usuário dentre as propriedades do tanque **[[G1]](#glossário)** e também a granularidade dos dados **[A1]**</li><li>O usuário define o período de tempo a ser consultado **[A1]**</li><li>O sistema exibe o resultado da consulta de forma gráfica, como uma série temporal com o tempo no eixo x e com o valor da característica observado no eixo y **[A2]**</li></ol>|
| Fluxos Alternativos | **[A1] Cancelar consulta**<ol><li>O ator seleciona a opção de cancelar a consulta</li><li>O ator é redirecionada para a página principal do sistema</li></ol>**[A2] Exportar PDF**<ol><li>O ator seleciona a opção de exportar a consulta em PDF</li><li>O Sistema gera o arquivo PDF e inicia o download</li></ol>|
| Fluxo de Exceção |  |
| Pós-Condições |  |

| UC07 | Visualizar painel dos tanques |
| --- | --- |
| Breve Descrição | O ator visualiza as informações disponíveis no painel principal |
| Atores | Autenticado, Tanque, Boia |
| Pré-Condições | |
| Fluxo Principal |<ol><li>Usuário seleciona a opção de tanques no sistema</li><li>O sistema exibe todos os tanques cadastrados e a sua situação **[[G5]](#glossário)** atual</li>| 
| Fluxos Alternativos | |
| Fluxo de Exceção | |
| Pós-Condições | |

| UC08 | Recuperar senha do usuário |
| --- | --- |
| Breve Descrição | Recuperar a senha de um usuário do sistema |
| Atores | Não Autenticado |
| Pré-Condições |  |
| Fluxo Principal |<ol><li>O ator seleciona a opção de recuperar senha na tela de login do sistema</li><li>O sistema exibe a tela de recuperação com o campo de email para ser preenchido</li><li>O ator informa o email de cadastro</li><li>O sistema valida o email **[A1]**</li><li>O sistema gera uma senha temporaria e a envia por email para o ator </li><li>O sistema exibe para o ator a mensagem de recuperação **[[MSG07]](#mensagens)**</li><li>O sistema retorna para a tela de login</li> </ol>|
| Fluxos Alternativos |**[A1] Usuário não cadastrado** <ol><li>O sistema invalida o email</li><li>O sistema informa o erro utilizando a mensagem **[[MSG13]](#mensagens)**</li><li>O sistema retorna para o 2º passo do fluxo principal</li></ol> |
| Fluxo de Exceção | |
| Pós-Condições | |

| UC09 | Editar informações do usuário |
| --- | --- |
| Breve Descrição | Altera informações de cadastro do ator logado |
| Atores | Autenticado |
| Pré-Condições | |
| Fluxo Principal |<ol><li>O sistema exibe as informações do ator **[[G4]](#glossário)** </li><li>O ator seleciona a opção de editar o perfil</li><li>O sistema deixa os campos de nome completo, nome de ator e e-mail editáveis</li><li>O ator edita os campos que desejar</li><li>O sistema valida as informações **[A1][A2]**</li><li>O sistema exibe a mensagem de sucesso **[[MSG08]](#mensagens)** e sai do modo de edição</li> </ol>|
| Fluxos Alternativos | **[A1] Nome de usuário já cadastrado no sistema**<ol><li>O sistema invalida as informações</li><li>O sistema exibe a mensagem de erro **[[MSG04]](#mensagens)** </li><li>O sistema retorna para o passo 1 do fluxo principal</li></ol>**[A2] Email já cadastrado no sistema**<ol><li>O sistema invalida as informações</li><li>O sistema exibe a mensagem de erro **[[MSG14]](#mensagens)** </li><li>O sistema retorna para o passo 1 do fluxo principal</li></ol> |
| Fluxo de Exceção | |
| Pós-Condições | |

| UC10 | Editar uma produção existente |
| --- | --- |
| Breve Descrição | O Gerente altera no sistema uma produção já existente e o Biólogo é notificado |
| Atores | Gerente, Biólogo |
| Pré-Condições | Ator ter concluído o fluxo principal do UC04 - Visualizar informações de uma produção|
| Fluxo Principal |<ol><li>O sistema deixa os campos de data da despesca, quantidade de camarão solicitada(kg) e classe editáveis</li><li>O gerente edita as informações que desejar</li><li>O sistema valida as alterações **[A1][A2]**</li><li>O sistema exibe a mensagem de sucesso **[[MSG09]](#mensagens)** e sai do modo de edição</li><li>O sistema notifica o Biólogo sobre a atualização da produção</li></ol>|
| Fluxos Alternativos | **[A1] Data de despesca anterior à data atual** <ol><li>O sistema exibe para o ator a mensagem de data de despeca anterior à data atual **[[MSG15]](#mensagens)**</li><li>O sistema invalida a data de despesca</li><li>O sistema bloqueia a edição até que a data de despesca seja validada</li></ol> **[A2] quantidade de camarão solicitada(kg) negativa** <ol><li>O sistema exibe para o ator a mensagem de data de quantidade de camarão solicitada(kg) negativa **[[MSG16]](#mensagens)**</li><li>O sistema invalida a quantidade de camarão solicitada(kg)</li><li>O sistema bloqueia a edição até que a quantidade de camarão solicitada(kg) seja validada</li></ol> |
| Fluxo de Exceção |   |
| Pós-Condições |   |

| UC11 | Desautenticar usuário |
| --- | --- |
| Breve Descrição | Desautentica o usuário do sistema |
| Atores | Autenticado |
| Pré-Condições | |
| Fluxo Principal |<ol><li>Ator solicita desautenticação do sistema</li><li>O sistema desautentica o ator</li><li>O sistema redireciona o ator para a página de login</li></ol>|
| Fluxos Alternativos | |
| Fluxo de Exceção | |
| Pós-Condições | |

| UC12 | Adicionar Tanque |
| --- | --- |
| Breve Descrição | Operador do Sistema adiciona um novo tanque ao sistema |
| Atores | Operador do Sistema, Tanque, Boia |
| Pré-Condições | Operador do Sistema ter concluído o fluxo principal do UC07 - Visualizar painel dos tanques |
| Fluxo Principal |<ol><li>O Operador do Sistema seleciona a funcionalidade de adicionar novo tanque</li><li>O sistema exibe a tela de cadastro de um novo tanque</li><li>O Operador do Sistema define a capacidade(L) e o nome do tanque **[A1]**</li><li>O sistema exibe a(s) boia(s) disponível(eis) **[A2]**</li><li>O Operador de Sistema seleciona a(s) boia(s) que será(ão) associada(s) ao tanque **[A1]**</li><li>O sistema exibe a mensagem **[[MSG10]](#mensagens)** indicando que o tanque foi adicionado com sucesso</li></ol>|
| Fluxos Alternativos | **[A1] Cancelar adição de novo tanque**<ol><li>O Operador do Sistema seleciona a opção de cancelar a adição de novo tanque</li><li>O Operador do Sistema é redirecionado para a página com os tanques cadastrados</li></ol> **[A2] Indisponibilidade de boias** <ol><li>O sistema informa ao Operador do Sistema que não existem boias disponíveis no momento e oferece a opção de adicionar o tanque sem boia ou cancelar **[A1]**</li><li>O Operador do Sistema confirma a adição do tanque sem boia</li><li>O sistema retorna para o passo 6 do fluxo principal</li></ol>|
| Fluxo de Exceção | |
| Pós-Condições | |

| UC13 | Remover Tanque |
| --- | --- |
| Breve Descrição | Operador do Sistema remove um tanque existente no sistema |
| Atores | Operador do Sistema, Tanque |
| Pré-Condições | Operador do Sistema ter concluído o fluxo principal do UC24 - Visualizar informações de um tanque |
| Fluxo Principal |<ol><li>O Operador do Sistema seleciona a funcionalidade de remover o tanque</li><li>O Sistema apresenta a mensagem de confirmação **[[MSG27]](#mensagens)** **[A1]**</li><li>O Operador do Sistema confirma a remoção do tanque</li><li>As boias associadas ao tanque removido ficam disponíveis</li><li>O sistema exibe uma mensagem **[[MSG11]](#mensagens)** indicando que o tanque foi removido com sucesso </li></ol>|
| Fluxos Alternativos | **[A1] Abortar remoção de tanque** <ol><li>O Operador do Sistema seleciona a opção de abortar a remoção de tanque</li><li>O Operador do Sistema é redirecionado para a página com o tanque selecionado anteriormente</li></ol> |
| Fluxo de Exceção | |
| Pós-Condições | |

| UC14 | Trocar senha |
| --- | --- |
| Breve Descrição | Usuário troca sua senha de acesso ao sistema |
| Atores | Autenticado |
| Pré-Condições | |
| Fluxo Principal |<ol><li>O sistema exibe as informações do ator **[[G4]](#glossário)** </li><li>O ator seleciona a opção de alterar sua senha</li><li>O ator informa sua senha atual e sua nova senha</li><li>O sistema valida as informações **[A1]** </li><li>O sistema exibe a mensagem de sucesso **[[MSG12]](#mensagens)** e sai do modo de edição</li> </ol>|
| Fluxos Alternativos | **[A1] Senha errada** <ol><li>O sistema invalida a alteração</li><li> O sistema exibe a mensagem de erro **[[MSG02]](#mensagem)**</li><li>O sistema limpa os campos de senha atual e nova senha e volta ao passo 3 do fluxo principal</li></ol> |
| Fluxo de Exceção | |
| Pós-Condições | |

| UC15 | Adicionar boia ao sistema |
| --- | --- |
| Breve Descrição | Operador do Sistema adiciona uma boia ao sistema |
| Atores | Operador do Sistema, Boia |
| Pré-Condições | Operador do Sistema ter concluído o fluxo principal do UC25 - Visualizar lista de boias |
| Fluxo Principal |<ol><li>O Operador do Sistema seleciona a funcionalidade de adicionar nova boia</li><li>O Operador do Sistema preenche o endereço MAC e o nome da nova boia </li><li>O sistema valida as informações **[A1]**</li><li>O sistema exibe a mensagem **[[MSG17]](#mensagens)** indicando que a boia foi adicionada com sucesso</li></ol> |
| Fluxos Alternativos | **[A1] Boia já cadastrada** <ol><li>O sistema invalida as informações</li><li> O sistema exibe a mensagem de erro **[[MSG18]](#mensagem)**</li><li>O sistema limpa os campos de endereço MAC e volta ao passo 3 do fluxo principal</li></ol>|
| Fluxo de Exceção | |
| Pós-Condições | |

| UC16 | Remover boia do sistema |
| --- | --- |
| Breve Descrição | Operador do Sistema remove uma boia do sistema |
| Atores | Operador do Sistema, Boia |
| Pré-Condições | Operador do Sistema ter concluído o fluxo principal do UC27 - Visualizar informações de uma boia |
| Fluxo Principal | <ol><li>O Operador do Sistema seleciona a funcionalidade de remover a boia **[A1]**</li><li>O sistema apresenta a mensagem de confirmação **[[MSG28]](#mensagem)** **[A2]**</li><li>O Operador do sistema confirma a exclução</li><li>O sistema exibe uma mensagem **[[MSG19]](#mensagem)** indicando que a boia foi removida com sucesso </li></ol> | |
| Fluxos Alternativos | **[A1] Boia associada a um tanque** <ol><li>O sistema exibe a mensagem **[[MSG23]](#mensagem)** </li><li> O sistema dá a opção do Operador do Sistema cancelar a remoção da boia **[A2]** ou prosseguir com a remoção. Caso o Operador do Sistema opte por prosseguir, o sistema retorna para o passo 4 do fluxo principal </li></ol> **[A2] Cancelar remoção da boia** <ol><li>O Operador do Sistema seleciona a opção de cancelar a remoção da boia</li><li>O Operador do Sistema é redirecionado para a página com as boias cadastradas</li></ol> | 
| Fluxo de Exceção | |
| Pós-Condições | |

| UC17 | Editar propriedades da boia |
| --- | --- |
| Breve Descrição | Operador do Sistema edita as propriedades de uma boia do sistema |
| Atores | Operador do Sistema, Boia |
| Pré-Condições | Operador do Sistema ter concluído o fluxo principal do UC27 - Visualizar informações de uma boia |
| Fluxo Principal | <ol><li>O Operador do Sistema seleciona a funcionalidade de editar a boia</li><li>O sistema deixa editável os campos de nome e última manutenção</li><li>O Operador do Sistema altera as informações desejadas </li><li>O sistema valida as informações **[A1]**</li><li>O sistema exibe a mensagem **[[MSG20]](#mensagens)** indicando que a boia foi alterada com sucesso</li></ol> |
| Fluxos Alternativos | **[A1] Data de manutenção futura à data atual** <ol><li>O sistema invalida as informações</li><li> O sistema exibe a mensagem de erro **[[MSG21]](#mensagem)**</li><li>O sistema limpa o campo data de manutenção e volta ao passo 3 do fluxo principal</li></ol>|
| Fluxo de Exceção | |
| Pós-Condições | |

| UC18 | Cancelar uma produção existente |
| --- | --- |
| Breve Descrição | O Gerente cancela no sistema uma produção existente e o Biólogo é notificado |
| Atores | Gerente, Biólogo |
| Pré-Condições | Ator ter concluído o fluxo principal do UC04 - Visualizar informações de uma produção|
| Fluxo Principal |<ol><li>O gerente seleciona a funcionalidade de cancelar a produção atual</li><li>O sistema apresenta a mensagem de confirmação **[[MSG22]](#mensagens)** **[A1]**</li><li>O Operador do Sistema confirma o cancelamento da produção</li><li>O sistema exibe a mensagem de sucesso **[[MSG24]](#mensagens)** e retorna para a tela de produções</li><li>O sistema notifica o Biólogo sobre a remoção da produção</li></ol>|
| Fluxos Alternativos | **[A1] Abortar cancelamento de produção** <ol><li>O ator seleciona a opção de abortar o cancelamento da produção</li><li>O ator é redirecionado para a página com as produções cadastradas</li></ol> |
| Fluxo de Exceção |  |
| Pós-Condições |  |

| UC19 | Editar propriedades do tanque |
| --- | --- |
| Breve Descrição | Operador do Sistema edita as propriedades de um tanque cadastrado |
| Atores | Operador do Sistema, Tanque |
| Pré-Condições | Operador do Sistema ter concluído o fluxo principal do UC24 - Visualizar informações de um tanque |
| Fluxo Principal |<ol><li>O Operador do Sistema seleciona a funcionalidade de editar as propriedades do tanque</li><li>O sistema deixa editável os campos de nome, capacidade, e boias associadas</li><li>O Operador do Sistema altera as informações desejadas</li><li>O sistema valida as informações **[A1]**</li><li>O sistema exibe a mensagem **[[MSG20]](#mensagens)** indicando que o tanque foi alterado com sucesso</li></ol>|
| Fluxos Alternativos | |
| Fluxo de Exceção |  |
| Pós-Condições |  |

| UC20 | Remover usuário | 
| --- | --- |
| Breve Descrição | Operador do Sistema remove um usuário cadastrado no sistema |
| Atores | Operador do Sistema |
| Pré-Condições | Operador do Sistema ter concluído o fluxo principal do UC29 -Visualizar informações de um usuário |
| Fluxo Principal |<ol><li>O Operador do Sistema selecionar a opção de remover o usuário</li><li>O Sistema solicita a confirmação do operador</li><li>O Operador do Sistema confirma a remoção do usuário **[A1]**</li><li>O Sistema exibe a mensagem **[[MSG26]](#mensagens)** indicando que o usuário foi removido com sucesso</li></ol> |
| Fluxos Alternativos | **[A1] Cancelar remoção de usuário**<ol><li>O Operador do Sistema seleciona a opção de cancelar a remoção do usuário</li><li>O Sistema oculta a solicitação de confirmação para remoção</li></ol> |
| Fluxo de Exceção |  |
| Pós-Condições |  |

| UC21 | Coletar dados | 
| --- | --- |
| Breve Descrição | Boia realiza coleta de dados a cada intervalo de tempo determinado |
| Atores | Boia |
| Pré-Condições | Boia ativa e funcional |
| Fluxo Principal | <ol><li>O Timer interno da boia dispara a coleta de dados</li><li>A boia realiza a coleta de dados através dos sensores</li></ol> |
| Fluxos Alternativos | |
| Fluxo de Exceção |  |
| Pós-Condições |  |

| UC22 | Receber e armazenar dados | 
| --- | --- |
| Breve Descrição | |
| Atores | Boia |
| Pré-Condições | |
| Fluxo Principal | |
| Fluxos Alternativos | |
| Fluxo de Exceção |  |
| Pós-Condições |  |

| UC23 | Ajustar frequência de atualização do painel de informações |
| --- | --- |
| Breve Descrição | Operador ajusta a frequência com que o painel atualizará as informações recebidas dos sensores. |
| Atores | Operador do Sistema  |
| Pré-Condições |  |
| Fluxo Principal |<ol><li>O Operador do Sistema seleciona a opção de configurações do sistema</li><li>O sistema exibe a frequência atual de atualização das informações</li><li>O Operador do Sistema seleciona a opção de editar a frequência atual</li><li>O sistema exibe as opções de aumentar ou diminuir a frequência atual **[A1]**</li><li>O Operador do Sistema altera e confirma a alteração **[A1]**</li><li>O sistema exibe realiza a alteração e exibe a mensagem deste sucesso **[[MSG25]](#mensagens)**</li></ol>|
| Fluxos Alternativos | **[A1] Cancelar edição de frequência** <ol><li>O usuário seleciona a opção de cancelar a edição de frequência</li><li>O usuário é redirecionado para a página de configuração do sistema</li></ol> |
| Fluxo de Exceção |  |
| Pós-Condições |  |

| UC24 | Visualizar informações de um tanque |
| --- | --- |
| Breve Descrição | Ator visualiza detalhamento de um tanque do sistema |
| Atores | Autenticado |
| Pré-Condições | Ator ter concluído o fluxo principal do UC07 - Visualizar painel dos tanques ou ter concluído o fluxo principal do UC04 - Visualizar informações de uma produção |
| Fluxo Principal |<ol><li>O ator seleciona uma dos tanques exibidos</li><li>O sistema exibe as propriedades do tanque selecionado **[[G1]](#glossário)**</li></ol> |
| Fluxos Alternativos | |
| Fluxo de Exceção | |
| Pós-Condições |  |

| UC25 | Visualizar lista de boias |
| --- | --- |
| Breve Descrição | Operador do Sistema visualiza uma lista com todas as boias cadastradas |
| Atores | Operador do Sistema |
| Pré-Condições | |
| Fluxo Principal | <ol><li>Operador do Sistema seleciona opção de boias no sistema</li><li>Sistema exibe uma lista com o nome da boia e o tanque que ela pertence (ou se não está presente em nenhum tanque)</li></ol> |
| Fluxos Alternativos | |
| Fluxo de Exceção |  |
| Pós-Condições |  |

| UC26 | Visualizar lista de produções |
| --- | --- |
| Breve Descrição | Ator visualiza uma lista com todas as produções cadastradas |
| Atores | Gerente, Biólogo |
| Pré-Condições | |
| Fluxo Principal | <ol><li>Ator seleciona opção de produções no sistema</li><li>Sistema exibe uma lista com o nome e uma descrição breve **[[G2]](#glossário)** </li></ol> |
| Fluxos Alternativos | |
| Fluxo de Exceção |  |
| Pós-Condições |  |

| UC27 | Visualizar informações de uma boia |
| --- | --- |
| Breve Descrição | Operador do Sistema visualiza detalhamento de uma boia do sistema |
| Atores | Operador do Sistema |
| Pré-Condições | Operador do Sistema ter concluído o fluxo principal do UC25 - Visualizar lista de boias |
| Fluxo Principal | <ol><li>O Operador do Sistema seleciona uma das boias exibidas</li><li>O sistema exibe as propriedades da boia: Nome, endereço MAC e data da última manutenção</li></ol> |
| Fluxos Alternativos | |
| Fluxo de Exceção |  |
| Pós-Condições |  |

| UC28 | Visualizar lista de usuários |
| --- | --- |
| Breve Descrição | O Ator visualiza uma lista com todos os usuários cadastradas |
| Atores | Operador do Sistema, Gerente |
| Pré-Condições | |
| Fluxo Principal | <ol><li>O Ator seleciona opção de usuários no sistema</li><li>Sistema exibe uma lista com o nome, nível de usuário, nome de usuário e e-mail</li></ol> |
| Fluxos Alternativos | |
| Fluxo de Exceção |  |
| Pós-Condições |  |

| UC29 | Visualizar informações de um usuário |
| --- | --- |
| Breve Descrição | Operador do Sistema visualiza detalhamento de um usuário do sistema  |
| Atores | Operador do Sistema |
| Pré-Condições | Operador do Sistema ter concluído o fluxo principal do UC28 - Visualizar lista de usuários |
| Fluxo Principal | <ol><li>O Operador do Sistema seleciona um dos usuários exibidos</li><li>O sistema exibe as informações do usuário **[[G4]](#glossário)**</li></ol> |
| Fluxos Alternativos | |
| Fluxo de Exceção |  |
| Pós-Condições |  |

** **
### Regras de Negócio
| **Código** | **Descrição da Regra de Negócio** |
| --- | --- |
| RN01 | Sempre que uma produção for criada ou editada o Biólogo será notificado |
| RN02 | Sempre que as propriedades de um tanque forem definidas/editadas o Cuidador do Tanque será notificado |
| RN03 | Tanque é considerado ativo se e somente se existe uma produção associada à ele naquele momento|
| RN04 | Tanque é considerado inativo se e somente se não existir uma produção associada à ele naquele momento|
| RN05 | Tanques que estão inativos devem exibir na interface uma faixa cinza claro|
| RN06 | Tanques ativos em estado crítico devem exibir na interface uma faixa vermelha e um ícone de estado crítico|
| RN07 | Tanques ativos em estado de alerta devem exibir na interface uma faixa amarela e um ícone de estado de alerta|
| RN08 | Tanques ativos em estado de normalidade devem exibir na interface uma faixa azul|
| RN09 | Tanques ativos que possuem boia devem exibir na interface o ícone de boia conectada e o número de boias que possui|
| RN10 | Tanques ativos que não possuem boia devem exibir na interface uma faixa cinza escuro e o ícone de sem boia conectada|

** **
### Mensagens
| **Código** | **Descrição da Mensagem** |
| --- | --- |
| MSG01 | Usuário inválido |
| MSG02 | Senha inválida |
| MSG03 | Novo usuário cadastrado com sucesso Gerente será informado |
| MSG04 | Nome de usuário informado já consta no sistema |
| MSG05 | Nova produção salva com sucesso. Biólogo será informado |
| MSG06 | Definições de propriedades do tanque salvas com sucesso Cuidador do tanque será informado |
| MSG07 | Nova senha de acesso foi enviada para o email |
| MSG08 | Perfil alterado com sucesso |
| MSG09 | Produção alterada com sucesso. Biólogo será informado |
| MSG10 | Novo tanque foi adicionado com sucesso |
| MSG11 | Tanque removido com sucesso |
| MSG12 | Senha alterada com sucesso |
| MSG13 | Email não cadastrado no sistema |
| MSG14 | Email informado já consta no sistema |
| MSG15 | Data de despesca não pode ser anterior à data atual |
| MSG16 | Quantidade de camarão solicitada(kg) não pode ser negativa |
| MSG17 | Nova boia foi adicionada com sucesso |
| MSG18 | Endereço MAC informado da boia já consta no sistema |
| MSG19 | Boia removida com sucesso |
| MSG20 | Propriedades da boia alteradas com sucesso |
| MSG21 | Data de manutenção não pode ser futura à data atual |
| MSG22 | Tem certeza que deseja cancelar a produção? |
| MSG23 | Esta boia [] está associada ao tanque []. Deseja prosseguir com a remoção? |
| MSG24 | Produção cancelada com sucesso. Biólogo será informado |
| MSG25 | Frequência de atualização das informações alterada com sucesso |
| MSG26 | Usuário removido com sucesso |
| MSG27 | Tem certeza que deseja remover o tanque? Depois que o tanque [] for removido, boias associadas a ele ficarão disponíveis. |
| MSG28 | Tem certeza que deseja remover a boia?|

** **
### Glossário
| **Código** | **Termo** | **Significado** |
| --- | --- | --- |
| G1 | Propriedades do Tanque | Nome do tanque, nível d'água, temperatura, turbidez, salinidade, quantidade de camarões, tipo de alimentação, status do tanque **[G6]**, capacidade(L), boia(s) associada(s) |
| G2 | Descrição breve da Produção | Quantidade de camarão solicitada (kg), data de início da produção, cliente | 
| G3 | Propriedades da produção | Quantidade de camarão solicitada (kg), estimativa de quantidade atual de camarão (kg), data de ínicio da produção, data de despesca, classe, nome, cliente, tanque(s) pertencente(s) à produção | 
| G4 | Informações do usuário | Nome de usuário, Nome completo, e-mail, senha, nível de acesso |
| G5 | Situação do Tanque Ativo | Estado de normalidade, Estado de alerta, Estado crítico |
| G6 | Status do Tanque | Tanque Ativo **[[RN03]](#regras-de-negócio)** e Tanque Inativo **[[RN04]](#regras-de-negócio)** |


** **
### Diagramas
![Diagrama de Casos de Uso](https://www.mrdevops-gitlab.com/camarao-iot/documentacao/raw/master/UC_Diagram.png)
* Disponível no reposítorio de Documentação

