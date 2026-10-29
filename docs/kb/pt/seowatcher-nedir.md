---
title: O que é o seowatcher?
description: O seowatcher é um app de SEO gratuito e de código aberto que reúne Search Console, GA4, auditoria do site e PageSpeed no seu computador.
kind: kavram
updated: 2026-10-29
---

Todos os dados aparecem em um só painel e ficam no seu computador, não na nuvem. No Windows 10 e 11 basta um único instalador; no Mac e no Linux, o app roda no Docker. No GitHub, o projeto se chama seotracker: é o mesmo app.

## Em resumo

| Pergunta             | Resposta                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------ |
| Preço                | Gratuito. Sem assinatura, sem conta, sem cartão                                            |
| Licença              | Código aberto MIT, todo o código está no GitHub                                            |
| Plataformas          | Instalador para Windows 10/11 (64 bits); Docker no Mac e no Linux                          |
| Fontes de dados      | Google Search Console, Google Analytics 4, o rastreador do próprio app, PageSpeed Insights |
| Auditoria do site    | 202 regras                                                                                 |
| Conexão com IA       | Agentes como Claude Code, Codex, Cursor e Gemini CLI via MCP; 6 skills prontas             |
| Idiomas da interface | Turco, inglês, alemão, francês, italiano, português                                        |
| Usuários             | Um só usuário, acessível apenas do seu computador                                          |
| Onde ficam os dados  | `%LOCALAPPDATA%\seowatcher` no Windows, o volume `seotracker_data` no Docker               |
| Versão               | 0.8.7 Alpha, 29 de outubro de 2026                                                         |
| Tamanho              | Instalador 86 MB, instalado 313 MB                                                         |
| Baseado em           | open-seo (every-app)                                                                       |

## O que o seowatcher faz?

- **Desempenho da pesquisa:** cliques, impressões, taxa de cliques e posição média do Search Console, por consulta, página, país e dispositivo. O Google fornece 16 meses de histórico; enquanto a tela Desempenho da pesquisa ou Acompanhamento de posições estiver aberta, o app também o copia para um arquivo próprio.
- **Oportunidades:** ordena as páginas que o Google já mostra pela quantidade de cliques extras que poderiam trazer com as taxas de cliques do seu próprio site, e sugere o trabalho para cada página.
- **Auditoria do site:** rastreia o site com 202 regras: links quebrados, títulos ausentes ou longos demais, páginas lentas, páginas que o Google não indexa. Cada achado diz o que fazer.
- **Status de indexação:** lê pela Inspeção de URL o registro que o Google mantém de cada página (indexada ou não, por quê, último rastreamento). O Google limita isso a 2.000 URLs por propriedade por dia.
- **Analytics:** mostra visitas, engajamento e eventos principais do GA4 ao lado dos dados de pesquisa.
- **Relatórios:** salva relatórios HTML em um só arquivo, para abrir no celular, imprimir ou enviar por e-mail.
- **Agente de IA:** via MCP, um agente lê os números, executa a auditoria e escreve o relatório.

## O que o seowatcher não faz?

- Não estima volume de pesquisa: as impressões exibidas vêm do Google.
- Não conta os sites que apontam para você (backlinks).
- Não acompanha a posição dos concorrentes; lê apenas os sites que você adiciona como projetos.
- Não é um serviço hospedado na nuvem; não há contas de equipe nem acesso multiusuário.
- Ainda não há um app móvel separado nem extensão de navegador.

## Qual a diferença para o Search Console?

O Search Console fornece os números; o seowatcher os lê e monta com eles uma lista de trabalho, mostrando em um só lugar qual página olhar primeiro, onde o site falha nas 202 regras e o que o Analytics mediu. Como guarda um arquivo no seu computador, com o tempo você também pode olhar para além da janela de 16 meses do Google. Os números vêm da mesma fonte, mas o Google os entrega com cerca de três dias de atraso e oculta consultas muito raras; por isso o total das páginas e o total do site podem ser diferentes.

## Qual a diferença para as suítes de SEO pagas?

As suítes de SEO pagas vendem estimativas de volume de pesquisa, backlinks e posições de concorrentes a partir de rastreamentos próprios e dados comprados. O seowatcher não faz nada disso; usa apenas os dados que o Google já entrega a você como dono do site, mais o seu próprio rastreamento. Por isso é gratuito, e por isso não foi feito para pesquisa de mercado. Ele serve se você quer acompanhar, corrigir e relatar a presença do seu próprio site no Google.

## Para quem é?

Para donos de sites, equipes de conteúdo e profissionais de SEO autônomos que querem ver em um só lugar os dados do Search Console e do GA4 dos seus sites ou dos sites dos clientes. Cada projeto guarda as suas próprias propriedades do Google, auditorias e relatórios.

## Perguntas frequentes

### É gratuito mesmo?

Sim. É um projeto de código aberto com licença MIT. Os serviços do Google que ele usa ficam dentro dos limites de uso gratuito.

### Onde ficam os meus dados?

No Windows, na pasta `%LOCALAPPDATA%\seowatcher`: o banco de dados, a sua chave de acesso ao Google e os logs. Desinstalar o app não mexe nessa pasta. No Docker, os dados ficam no volume `seotracker_data`.

### Com o que o app se conecta?

Com o Google (Search Console, Analytics, PageSpeed), com o site que você audita e com o GitHub para verificar versões. Se você conectar um agente de IA, os dados que ele lê podem ir para o fornecedor desse agente; essa conexão é opcional.

### Funciona no Mac ou no Linux?

Sim, com Docker. No Windows, a instalação com um único arquivo é mais simples.

### Por que preciso criar uma credencial no Google Cloud?

O seowatcher não é um serviço na nuvem; ele roda no seu computador e se conecta direto ao Google. O Google quer saber a quem pertence o app que se conecta. Você faz isso uma vez.

### Preciso expor o app na internet?

Não. O app só abre no seu computador.

## Por onde começar?

1. [Instalar no Windows](/docs/kurulum-windows/) ou [instalar com Docker](/docs/kurulum-docker/).
2. [Conectar ao Google](/docs/google-baglantisi/).
3. Opcional: a [chave do PageSpeed](/docs/pagespeed-anahtari/) e a [configuração do agente](/docs/ajan-kurulumu/).

<!-- Kaynaklar: scripts/site-home.tr.html (Kısaca, Sorular, Neler yapar); docs/kb/kurulum-windows.md; docs/kb/kurulum-docker.md; docs/kb/dizin-durumu.md; src/shared/i18n.ts (LOCALES); package.json (version) -->
