# Arranjos 
## Cenário 5 - Cuidadora do tanque recebe notificação de situação adversa no tanque
### OA10 
- Os sensores no tanque coletam dados referentes ao nível d'água, temperatura, turbidez, e salinidade. 
- Os dados coletados pelos sensores no tanque são enviados para o sistema e tratados.
**Explicitar tratamento dos dados**
- O sistema verifica se algum dos dados está em situação de não conformidade com o valor de referência previamente definido. 
- Caso algum dos dados esteja em situação de não conformidade, o sistema envia para a cuidadora do tanque uma notificação por email ou sinalização interna explicitando qual dos dados está em situação de não conformidade e qual o tipo da anomalia, além de qual o valor atual da informação registrada pelo sensor. 

## Cenário 6 - Gerente recebe notificação de situação adversa no tanque
### OA10
- Os sensores no tanque coletam dados referentes ao nível d'água, temperatura, turbidez, e salinidade. 
- Os dados coletados pelos sensores no tanque são enviados para o sistema e tratados.
**Explicitar tratamento dos dados**
- O sistema verifica se os valores registrados pelos sensores do tanque têm discrepância relativa de mais de 10% frente ao valor de referência previamente definido. 
- Caso algum dos dados tenha discrepância relativa maior que 10% frente ao valor de referência, o sistema envia para o gerente uma notificação por email ou sinalização interna explicitando qual dos dados está em situação de não conformidade e qual o tipo de anomalia registrado. 

## Cenário 7 - Cuidadora do tanque visualiza informações do tanque
### OA2
- Os sensores no tanque coletam dados referentes ao nível d'água, temperatura, turbidez, e salinidade. 
- Os dados coletados pelos sensores no tanque são enviados para o sistema e tratados para permitir que sejam visualizados.
**Explicitar qual deve ser o tratamento dos dados e onde os dados devem ser visualizados**
- A cuidadora do tanque entra no painel de visualização de informações.
- **O formato dos dados ainda deve ser decidido.**
- O sistema disponibiliza a visualização dos dados, que permite que a cuidadora verifique se existe necessidade de tomar medidas para alterar a situação do tanque.

## Cenário 9 - Gerente visualiza painel de informações do Tanque 
### OA2
- Os sensores no tanque coletam dados referentes ao nível d'água, temperatura, turbidez, e salinidade. 
- Os dados coletados pelos sensores no tanque são enviados para o sistema e tratados para permitir que sejam visualizados. 
**Explicitar qual deve ser o tratamento dos dados e onde os dados devem ser visualizados**
- O gerente entra no painel de visualização de informações.
- **O formato dos dados ainda deve ser decidido. Nesse passo, além dos dados capturados por IoT, devem ser expostas também informações referente à estimativa do número de camarões do tanque**
- O sistema disponibiliza a visualização dos dados, que permite que o gerente avalie a situação geral da fazenda de produção de camarões.
