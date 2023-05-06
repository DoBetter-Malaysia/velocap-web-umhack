import { Avatar, Group, Text } from "@mantine/core";
import { forwardRef } from "react";

export interface PresetDropdownItemProps
  extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  content: string;
  preset: { [key: string]: any };
  icon: JSX.Element;
}

const PresetDropdownItem = forwardRef<HTMLDivElement, PresetDropdownItemProps>(
  (
    { label, content, preset, icon, ...others }: PresetDropdownItemProps,
    ref
  ) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        {icon}
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {content}
          </Text>
        </div>
      </Group>
    </div>
  )
);

export default PresetDropdownItem;
