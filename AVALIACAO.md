# EVIDÊNCIAS

## Tarefa 1:

**Link execução verde:**
https://github.com/juliavieirarodrigues/2bim-Avalia1/actions/runs/38611391570

**Link execução vermelha:**
https://github.com/juliavieirarodrigues/2bim-Avalia1/actions/runs/38612165627

**Linha do log com erro:**
Parse error near line 1: near "TABLEEE": syntax error

## Tarefa 2:

**Link do PR bloqueado e liberado:**
https://github.com/juliavieirarodrigues/2bim-Avalia1/pull/1

**Saída do git push recusado:**
remote: - Changes must be made through a pull request.
remote: - Required status check "verificar" is expected.

## Tarefa 3:

**Link do PR com os dois comentários da IA:**
https://github.com/juliavieirarodrigues/2bim-Avalia1/pull/2

Error:  ALERTA DE SEGURANÇA (IA): Comando perigoso 'DROP TABLE' detetado no código!
Error: Process completed with exit code 1.

**Link do log com erro de API:**
https://github.com/juliavieirarodrigues/2bim-Avalia1/actions/runs/38641980859

**Log do erro de permissão:**
Error: API error: TypeError: Cannot use 'in' operator to search for 'choices' in OK
Error: Cannot use 'in' operator to search for 'choices' in OK

## Tarefa 4:

**Link da execução do merge:**
https://github.com/juliavieirarodrigues/2bim-Avalia1/actions/runs/38646045984

**Saída do PRAGMA:**
https://github.com/juliavieirarodrigues/2bim-Avalia1/actions/runs/38651076987/job/116149727718

Run npx wrangler d1 migrations apply desenho-assinado-db --remote
Resource location: remote

X ERROR In a non-interactive environment, it's necessary to set a CLOUDFLARE_API_TOKEN environment variable for wrangler to work.
Error: Process completed with exit code 1.

## Perguntas:

**1-** Porque o GitHub interpreta o evento tanto como um push direto na branch quanto como um pull_request associado, sendo que o status check considera apenas a execução atrelada ao evento de pull_request.

**2-** Para impedir um ataque de exfiltração de dados sensíveis, garantindo que utilizadores externos não consigam roubar credenciais as imprimindo nos registos públicos do Actions.

**3-** para garantir apenas o acesso mínimo necessário para a tarefa, evitando dar permissões em excesso que poderiam gerar falhas de segurança.

**4-** A revisão da IA não pode substituir o status check tradicional porque a IA depende de serviços externos que podem cair ou dar respostas inesperadas, enquanto os testes automáticos dão verificações exatas, diretas e garantidas.
