// react
import React, { useState } from "react";

// react dropzone
import { useDropzone } from "react-dropzone";

// styles
import {
  Container,
  ContainerText,
  ThumbsContainer,
  Thumb,
  ThumbText,
  ThumbInner,
  Img,
} from "../../styles/components/upload/upload.styles";

// constant
import { attachmentFileTypes, maxSize } from "../../configs/upload.constant";

// components
import { Typography } from "@anchor/react-components";

/**
 * @name StyledDropzone
 * @description Method for generating the JSX for the React Dropzone Component Wrapper
 * @returns JSX
 */
const StyledDropzone = ({ onChange }) => {
  const [files, setFiles] = useState<Array<any>>([]);

  // custom validator that throws error
  // @TODO - Add Toast Component once ready
  const checkExtensions = (file) => {
    const invalidFileTypePresent = attachmentFileTypes.indexOf(file.type) > -1;
    if (!invalidFileTypePresent) {
      alert("Invalid File Type");
    }
    if (file.size > maxSize) {
      alert(`File is larger than ${maxSize} characters`);
    }
    return null;
  };

  // setup of react dropzone using the useDropzone custom hook
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop: (acceptedFiles: any) => {
      const newFiles: any = [
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ];
      setFiles(newFiles);
      onChange(newFiles);
    },
    accept: attachmentFileTypes,
    maxSize: maxSize,
    validator: checkExtensions,
  });

  // returns JSX for the thumbs component
  const thumbs = files.map((file: any) => (
    <Thumb key={file.name}>
      <ThumbInner>
        <Img src={file.preview} alt={file.name} />
      </ThumbInner>
    </Thumb>
  ));

  return (
    <section className="container">
      <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <svg
          width="29"
          height="30"
          viewBox="0 0 29 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.0659 8.59961V18.1996H11.377V8.59961H7.11035L14.2215 0.599609L21.3326 8.59961H17.0659ZM27.4062 20.5351C27.4472 20.5844 27.4798 20.6235 27.5025 20.6508C28.1994 21.4844 28.5806 22.1484 28.4014 22.9692L27.6035 27.8876C27.4215 28.71 26.6208 29.3852 25.8229 29.3852H2.62362C1.82576 29.3852 1.02505 28.71 0.843003 27.8876L0.0451368 22.9692C-0.136908 22.1484 0.24567 21.4844 0.941136 20.6508C0.982094 20.6019 1.05491 20.5146 1.15154 20.3987C1.75952 19.6695 3.31035 17.8096 3.80122 17.2684C4.17953 16.854 4.71856 16.5996 5.28318 16.5996H7.7806L3.42434 21.39H8.46469C8.60397 21.3878 8.73387 21.4688 8.80602 21.6028L9.96655 24.5996H18.4771L19.6377 21.6028C19.7094 21.4683 19.8396 21.3871 19.979 21.39H25.0193L20.6617 16.5996H23.1605C23.7127 16.5988 24.2438 16.8385 24.6425 17.2684C25.168 17.8464 26.9087 19.9374 27.4062 20.5351Z"
            fill="#141414"
          />
        </svg>
        <ContainerText variant="body1" fontStyle="bold" paragraph>
          <span>Drag your files here or click here to upload</span>
        </ContainerText>
        <Typography variant="body2" fontStyle="normal">
          <span>Supported file formats: PDF, XLS, CSV, PNG, and JPG</span>
        </Typography>
      </Container>
      {files.length > 0 && (
        <ThumbsContainer>
          <ThumbText variant="body1" fontStyle="bold" paragraph>
            Accepted files
          </ThumbText>
          <div>{thumbs}</div>
        </ThumbsContainer>
      )}
    </section>
  );
};

export default StyledDropzone;
