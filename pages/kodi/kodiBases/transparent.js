import Head from "next/head";
import nailAesthetics from "@/lib/kodi/kodi_transparent";
import Header from "@/components/Header/Header";
import {
  Container,
  Grid,
  Card,
  Subtitle,
  Price,
  Button,
} from "@/components/Kodi/kodiBases/StyledTransparentBaseKodi";

export default function TransparentBasesPage(
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
        <title>Прозорі бази | Kodi and More</title>
        <meta
          name="description"
          content="Прозорі бази Kodi — надійна адгезія та природний вигляд."
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
        <h2>Прозорі бази</h2>

        <Grid>
          {nailAesthetics.map((item) => (
            <Card key={item.id}>
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
              <Subtitle>{item.subtitle}</Subtitle>
              <Price>{item.price}</Price>
              <Button href={item.route}>Детальніше</Button>
            </Card>
          ))}
        </Grid>
      </Container>
    </>
  );
}
