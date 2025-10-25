// pages/[id].js
export default function Page() {
  return null; // тимчасова порожня сторінка
}

export async function getServerSideProps() {
  // якщо треба — редірект на потрібну сторінку
  return {
    redirect: { destination: "/", permanent: false },
  };
}

// // pages/[id].js
// import { useRouter } from "next/router";
// import styled from "styled-components";
// import { StyledMain, StyledMainContainer } from "@/components/StyledIndex";
// import {
//   StyledTitle,
//   StyledDetailsContainer,
//   StyledFirstLine,
//   StyledDescription,
//   StyledAppLink,
//   StyledBackButton,
// } from "@/components/StyledDetailsPage";
// import { StyledBackgroundImgBody } from "@/components/StyledBackgroundImgBody";

// import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// const StyledTextNoTFound = styled.h1`
//   text-align: center;
//   font-size: 32px;
//   margin-top: 50px;
// `;

// export default function ProjectDetails({ item }) {
//   const router = useRouter();
//   const { t } = useTranslation("kodi");

//   // Якщо дані для цього id не знайдено — показуємо твій "not found" блок
//   if (!item) {
//     return (
//       <StyledBackgroundImgBody>
//         <StyledMain>
//           <StyledMainContainer>
//             <StyledTextNoTFound>{t("pageNotFound")}</StyledTextNoTFound>
//             <StyledBackButton onClick={() => router.push("/kodiPage")}>
//               {t("backNotFound")}
//             </StyledBackButton>
//           </StyledMainContainer>
//         </StyledMain>
//       </StyledBackgroundImgBody>
//     );
//   }

//   // Фолбек для заголовка: якщо перекладу немає — використовуємо item.title
//   const title = t(`${item.id}.title`, { defaultValue: item.title });

//   // Опис може бути масивом/рядком/відсутній — нормалізуємо до масиву
//   const descRaw = t(`${item.id}.description`, { returnObjects: true });
//   const descriptionLines = Array.isArray(descRaw)
//     ? descRaw
//     : typeof descRaw === "string"
//     ? [descRaw]
//     : Array.isArray(item.description)
//     ? item.description
//     : [];

//   return (
//     // <StyledBackgroundImgBody>
//     <StyledMain>
//       <StyledMainContainer>
//         <StyledTitle>{title}</StyledTitle>

//         <StyledDetailsContainer>
//           <StyledAppLink
//             href="https://shopping-buddy-no.vercel.app/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             To the app &rarr;
//           </StyledAppLink>

//           {/* перший рядок опису */}
//           {descriptionLines[0] && (
//             <StyledFirstLine>{descriptionLines[0]}</StyledFirstLine>
//           )}

//           {/* решта рядків опису */}
//           {descriptionLines.slice(1).map((line, index) => (
//             <StyledDescription key={index}>{line}</StyledDescription>
//           ))}
//         </StyledDetailsContainer>

//         <StyledBackButton onClick={() => router.push("/kodiPage")}>
//           {t("back")} {/* або t("backNotFound") — як ти хочеш */}
//         </StyledBackButton>
//       </StyledMainContainer>
//     </StyledMain>
//     // </StyledBackgroundImgBody>
//   );
// }

// // Згенерувати всі маршрути заздалегідь
// export async function getStaticPaths() {
//   const { default: kodi } = await import("@/lib/kodi/kodiNailsList");
//   const paths = kodi.map((p) => ({ params: { id: p.id } }));
//   return { paths, fallback: "blocking" };
// }

// // Підтягнути дані для конкретного id
// export async function getStaticProps({ params, locale }) {
//   const { default: kodi } = await import("@/lib/kodi/kodiNailsList");
//   const item = kodi.find((p) => p.id === params.id);

//   if (!item) {
//     return { notFound: true };
//   }

//   return {
//     props: {
//       item,
//       ...(await serverSideTranslations(locale, ["common", "kodi"])),
//     },
//     // revalidate: 60, // розкоментуй, якщо дані інколи оновлюються
//   };
// }
