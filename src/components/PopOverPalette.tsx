import { flat, gradients } from '@data/colors';
import { useMutationUpdateCategory } from '@queries/index';

interface IPopOverPaletteProps {
  categoryId: string;
  setOpenPopover: (value: boolean) => void;
}
export const PopOverPalette = ({
  setOpenPopover,
  categoryId
}: IPopOverPaletteProps) => {
  const { mutate: updateCategory } = useMutationUpdateCategory();

  const handleChangeColor = (color: string) => {
    updateCategory({
      payload: {
        color
      },
      id: categoryId
    });
    setOpenPopover(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {gradients.map((color, index) => (
          <div
            key={index}
            className="h-5 w-5 rounded"
            style={{ background: color }}
            onClick={() => handleChangeColor(color)}
          />
        ))}
      </div>
      <div className="flex gap-2">
        {flat.map((color, index) => (
          <div
            key={index}
            className="h-5 w-5 rounded"
            style={{ background: color }}
            onClick={() => handleChangeColor(color)}
          />
        ))}
      </div>
    </div>
  );
};
