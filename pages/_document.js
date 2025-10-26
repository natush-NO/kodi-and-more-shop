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
          <meta
            property="og:title"
            content="Kodi and More — магазин професійної косметики в Ужгороді"
          />
          <meta
            property="og:description"
            content="Магазин Kodi and More, Ужгород. Професійні товари для бʼюті-майстрів — майстрів манікюру, педикюру, лешмейкерів, бровістів."
          />
          <meta
            property="og:image"
            content="https://kodi-and-more-shop.vercel.app/logos/logo_social.jpeg"
          />
          <meta
            property="og:url"
            content="https://kodi-and-more-shop.vercel.app/"
          />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Kodi and More — магазин професійної косметики в Ужгороді"
          />
          <meta
            name="twitter:description"
            content="Магазин Kodi and More, Ужгород. Професійні товари для бʼюті-майстрів — майстрів манікюру, педикюру, лешмейкерів, бровістів."
          />
          <meta
            name="twitter:image"
            content="https://kodi-and-more-shop.vercel.app/logos/logo_social.jpeg"
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
