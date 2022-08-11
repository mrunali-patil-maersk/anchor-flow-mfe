// styles
import { IconButtonContainer, IconButton } from "@styles/components/process/iconButton.styles";

// interfaces
import { IconType, IconItemProps } from "@pages/process/process-definitions";

/**
 * @name IconButtonComponent
 * @param iconData data to render of type Array<IconType>
 * @param handleClick callback of type IconItemProps
 * @description Method for generating the JSX for the Icon button component
 * @returns JSX
 */
const IconButtonComponent = ({
  iconData,
  handleClick,
}: {
  iconData: Array<IconType>;
  handleClick: (item: IconItemProps) => void;
}) => {
  const handleIconButton = (key: string, value: string) => {
    // triggers on click of icon button and calls the callback from prop
    handleClick({
      selectedItemId: value,
      updatedData: iconData.map((item) => {
        return {
          ...item,
          active: item.key === key ? true : false,
        };
      }),
    });
  };

  // returns JSX of the Icon Button Component
  return (
    <IconButtonContainer>
      {iconData.length &&
        iconData.map(({ key, name, active, value }) => {
          return (
            <IconButton
              size="small"
              hiddenLabel={true}
              variant="plain"
              key={key}
              active={active}
              icon={name}
              onClick={() => handleIconButton(key, value)}
            />
          );
        })}
    </IconButtonContainer>
  );
};

export default IconButtonComponent;
