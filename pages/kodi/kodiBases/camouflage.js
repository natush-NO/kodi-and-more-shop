import Head from "next/head";
import Header from "@/components/Header/Header";
import {
  Container,
  Grid,
  Card,
  Subtitle,
  Price,
  Button,
} from "@/components/Kodi/kodiBases/StyledTransparentBaseKodi";
import camouflageBasesKodi from "@/lib/kodi/baseKodi/camouflageBasesKodi";

const CURRENCY = "грн";

export default function CamouflageBasesPage(
  changeLanguage,
  isCatalogOpen,
  setIsCatalogOpen,
  toggleCatalog,
  closeCatalog,
  brandsCatalog
) {
  return (
    <>
      <Head>
        <title>Камуфлюючі бази | Kodi and More</title>
        <meta
          name="description"
          content="Камуфлюючі бази Kodi — щільна текстура, делікатні відтінки."
        />
      </Head>

      <Header
        changeLanguage={changeLanguage}
        isCatalogOpen={isCatalogOpen}
        setIsCatalogOpen={setIsCatalogOpen}
        closeCatalog={closeCatalog}
        toggleCatalog={toggleCatalog}
        brandsCatalog={brandsCatalog}
      />

      <Container>
        <h1>Камуфлюючі бази</h1>
        <p>Оберіть потрібний відтінок та обʼєм.</p>

        <Grid>
          {camouflageBasesKodi.map((product) => (
            <Card key={product.id}>
              {product.image && (
                <img src={product.image} alt={product.subtitle} />
              )}

              <h3>{product.title}</h3>
              <Subtitle>{product.subtitle}</Subtitle>

              <Price>
                <span
                  style={{
                    textDecoration: "line-through",
                    fontWeight: 400,
                    marginRight: "0.5rem",
                    opacity: 0.8,
                  }}
                >
                  {product.oldPrice} {CURRENCY}
                </span>
                <span>
                  {product.newPrice} {CURRENCY}
                </span>
              </Price>

              <Button href={product.href}>Купити</Button>
            </Card>
          ))}
        </Grid>
      </Container>
    </>
  );
}
