import * as SliderPrimitive from "@radix-ui/react-slider";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

function Slider({ value, onChange }: Props) {
  return (
    <SliderPrimitive.Root
      value={[value]}
      max={1}
      min={0}
      step={0.05}
      onValueChange={(values) => onChange(values[0])}
      className="relative flex h-5 w-full items-center"
    >
      <SliderPrimitive.Track className="relative h-1.5 grow rounded-full bg-[#E8E4DE]">

        <SliderPrimitive.Range className="absolute h-full rounded-full bg-[#8A5A14]" />

      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb
        className="
        block
        h-5
        w-5
        rounded-full
        border-2
        border-[#8A5A14]
        bg-white
        shadow
        transition
        hover:scale-110
        focus:outline-none
        "
      />

    </SliderPrimitive.Root>
  );
}

export default Slider;