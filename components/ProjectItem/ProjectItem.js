import {
  StyledProjectList,
  StyledImageLink,
  StyledCertificateImage,
} from "./StyledProjectItem";

export default function ProjectItem({ project, isOpen }) {
  const handleClick = (event) => {
    if (isOpen) {
      event.preventDefault();
    }
  };

  return (
    <>
      <StyledProjectList>
        <StyledImageLink href={`/${project.id}`} onClick={handleClick}>
          <StyledCertificateImage
            src={
              project.imageUrl ? project.imageUrl : "/placeholder_image.webp"
            }
            alt={project.title}
            fill
            sizes="(max-width: 700px) 100vw, 600px"
            role="img"
            aria-label={project.title}
            priority
          />
        </StyledImageLink>
      </StyledProjectList>
    </>
  );
}
