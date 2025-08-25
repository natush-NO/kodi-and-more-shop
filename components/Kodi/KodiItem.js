import {
  StyledKodiList,
  StyledImageLink,
  StyledCertificateImage,
} from "./StyledKodiItem";

export default function KodiItem() {
  return null;
}

export async function getStaticProps() {
  return {
    notFound: true,
  };
}

// export default function KodiItem({ kodi, isOpen }) {
//   const handleClick = (event) => {
//     if (isOpen) {
//       event.preventDefault();
//     }
//   };

//   return (
//     <>
//       <StyledKodiList>
//         <StyledImageLink href={`/${kodi.id}`} onClick={handleClick}>
//           <StyledCertificateImage
//             src={kodi.imageUrl ? kodi.imageUrl : "/placeholder_image.webp"}
//             alt={kodi.title}
//             fill
//             sizes="(max-width: 700px) 100vw, 600px"
//             role="img"
//             aria-label={kodi.title}
//             priority
//           />
//         </StyledImageLink>
//       </StyledKodiList>
//     </>
//   );
// }
