import { IconProps } from "@/lib/types";

const IconChartUser: React.FC<IconProps> = ({
    size = "20",
    color = "currentColor",
    ...attributes
}) => {
    return (
        <>
            <svg
                width={size}
                height={size}
                {...attributes}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
            >
                <path d="M160 64c0-35.3 28.7-64 64-64H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H336.8c-11.8-25.5-29.9-47.5-52.4-64H576V64L224 64v49.1C205.2 102.2 183.3 96 160 96V64zm252.7 75.3c-4.6-4.6-5.9-11.5-3.5-17.4s8.3-9.9 14.8-9.9h88c8.8 0 16 7.2 16 16v88c0 6.5-3.9 12.3-9.9 14.8s-12.9 1.1-17.4-3.5l-27-27L401 273c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 55.7-55.7-27-27zM64 224a96 96 0 1 1 192 0A96 96 0 1 1 64 224zM0 485.3C0 411.7 59.7 352 133.3 352h53.3C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7H26.7C11.9 512 0 500.1 0 485.3z" />
            </svg>
        </>
    );
};

export default IconChartUser;
