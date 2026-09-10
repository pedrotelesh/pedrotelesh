# Pedro Teles Studio

Landing page estática para divulgar serviços de Sites e sistemas para o seu negócio.

## Rodar localmente

No terminal:

```bash
cd /Users/pedroteles/Documents/adega-do-dede/outros-projetos/pedrotelesh-reference/sites/negocios-locais
python3 -m http.server 4173
```

Depois, abra `http://localhost:4173`.

## Publicar no Cloudflare Pages

O projeto é estático, não depende de Node.js nem de variáveis de ambiente.

1. Em **Workers & Pages**, selecione **Create application** e **Pages**.
2. Escolha **Import an existing Git repository** e conecte o repositório `pedrotelesh/pedrotelesh`.
3. Crie o projeto com o nome `pedro-teles-negocios` e selecione a branch `main` como produção.
4. Em **Root directory**, informe `sites/negocios-locais`.
5. Em **Build command**, informe `exit 0`; em **Build output directory**, informe `.`.
6. Após o primeiro deploy, em **Custom domains**, adicione `negocios.pedroteles.com.br` e confirme a criação do registro DNS sugerido pelo Cloudflare.
7. Em **Settings > Builds > Build watch paths**, configure `sites/negocios-locais/*` para que mudanças no portfólio principal não publiquem esta landing sem necessidade.

Para migrar também o portfólio atual, crie um segundo projeto Pages para a raiz do repositório e associe `pedroteles.com.br`. Só depois de validar esse segundo projeto remova a configuração de domínio do GitHub Pages.

## Personalização antes de publicar

- O formulário e o botão flutuante direcionam para o WhatsApp `+55 31 98662-8694`.
- O domínio de produção configurado é `negocios.pedroteles.com.br`.
- As imagens do case real estão em `cases/`.
- As fontes reutilizadas de `pedroteles.com.br` estão em `assets/fonts/`.

## Prospecção

A lista de 30 leads e suas abordagens personalizadas está em `LEADS_GRANDE_BH.md`.
