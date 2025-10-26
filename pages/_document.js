import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="uk">
        <Head>
          <meta property="og:title" content="Kodi Studio Uzhhorod" />
          <meta
            property="og:description"
            content="Офіційний сайт Kodi Professional Uzhhorod — товари для манікюру, гель-лаки, бази, топи."
          />
          <meta
            property="og:image"
            content="https://kodi-studio-app.vercel.app/logos/logo_social.jpeg"
          />
          <meta
            property="og:url"
            content="https://kodi-studio-app.vercel.app/"
          />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Kodi Studio Uzhhorod" />
          <meta
            name="twitter:description"
            content="Офіційний сайт Kodi Professional Uzhhorod — товари для манікюру, гель-лаки, бази, топи."
          />
          <meta
            name="twitter:image"
            content="https://kodi-studio-app.vercel.app/logos/logo_social.jpg"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
