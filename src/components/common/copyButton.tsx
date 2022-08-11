import { Button, toastEmitter } from "@anchor/react-components";
import useCopyToClipboard from "@hooks/useCopyToClipboard";

const CopyButton = ({ content }: { content: string }) => {
  const [_, copy] = useCopyToClipboard();
  const handleClick = async () => {
    const isCopied = await copy(content);
    if (isCopied) {
      toastEmitter(
        {
          title: "Copied!",
        },
        {
          position: "bottom-right",
          type: "success",
          toastId: "copy-button",
          autoClose: 500,
        }
      );
    } else {
      toastEmitter(
        {
          title: "Something went wrong! Please try again!",
        },
        {
          position: "bottom-right",
          type: "error",
          toastId: "copy-button",
          autoClose: 500,
        }
      );
    }
  };
  return <Button size="small" variant="plain" icon="file-copy" onClick={handleClick} />;
};

export default CopyButton;
