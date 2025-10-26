import Head from "next/head";
import Link from "next/link";

export default function BasesIndex() {
  return (
    <>
      <Head>
        <title>Бази | Kodi and More</title>
        <meta
          name="description"
          content="Бази для гель-лаку: прозорі, камуфлюючі та кольорові."
        />
        <link
          rel="canonical"
          href="https://kodi-and-more-shop.vercel.app/bases"
        />
      </Head>

      <main style={{ padding: "2rem" }}>
        <h1>Бази для гель-лаку</h1>
        <ul style={{ lineHeight: 1.9, fontSize: 18 }}>
          <li>
            <Link href="/kodi/kodiBases/transparent">Прозорі бази</Link>
          </li>
          <li>
            <Link href="/kodi/kodiBases/camouflage">Камуфлюючі бази</Link>
          </li>
          <li>
            <Link href="/kodi/kodiBases/colored">Кольорові бази</Link>
          </li>
        </ul>
      </main>
    </>
  );
}

// // pages/kodi/kodiBases/index.js
// import Header from "@/components/Header/Header";
// import { StyledMain, StyledMainContainer } from "@/components/StyledIndex";
// import {
//   StyledKodiListItems,
//   StyledTitlePegeKodi,
//   StyledKodiList,
//   StyledImageLink,
//   StyledCertificateImage,
// } from "@/components/Kodi/StyledKodiItem";
// import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// export default function KodiBasesPage({ kodiBases }) {
//   const { t } = useTranslation(["kodiBases", "common"]);

//   return (
//     <>
//       <Header kodiPage />
//       <StyledMain>
//         <StyledMainContainer>
//           <StyledTitlePegeKodi>Base</StyledTitlePegeKodi>

//           <StyledKodiListItems>
//             {kodiBases.map((base) => {
//               const href =
//                 base.route && base.route !== "#"
//                   ? base.route
//                   : `/kodi/kodiBases/${base.id}`;
//               const label = t(base.title);
//               const description = t(base.description);

//               return (
//                 <StyledKodiList key={base.id}>
//                   <StyledImageLink href={href}>
//                     <StyledCertificateImage
//                       src={base.imageUrl || "/placeholder_image.webp"}
//                       alt={label}
//                       title={label}
//                       fill
//                       priority
//                     />
//                   </StyledImageLink>
//                   <div
//                     style={{ marginTop: 8, textAlign: "center", fontSize: 18 }}
//                   >
//                     {label}
//                   </div>
//                   <div
//                     style={{ marginTop: 8, textAlign: "center", fontSize: 16 }}
//                   >
//                     {description}
//                   </div>
//                 </StyledKodiList>
//               );
//             })}
//           </StyledKodiListItems>
//         </StyledMainContainer>
//       </StyledMain>
//     </>
//   );
// }

// export async function getStaticProps({ locale }) {
//   const { default: kodiBases } = await import("@/lib/kodi/kodiBases");
//   return {
//     props: {
//       kodiBases,
//       ...(await serverSideTranslations(locale, ["common", "kodiBases"])),
//     },
//   };
// }
