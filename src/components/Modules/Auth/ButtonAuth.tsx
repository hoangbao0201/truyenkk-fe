import Image from "next/image";

interface ButtonAuthProps {
    handle: () => void;
    content: string;
    linkIcon: string;
    color: string;
}

const ButtonAuth = ({
    handle,
    content,
    linkIcon,
    color = "black",
}: ButtonAuthProps) => {
    return (
        <div
            onClick={handle}
            className={`${color} mb-2 select-none relative flex items-center justify-center h-11 px-2 cursor-pointer text-center rounded-md`}
        >
            <Image
                unoptimized
                loading="lazy"
                width={15}
                height={15}
                alt={`Icon ${content}`}
                className="w-7 h-7 block my-[5px] ml-3 border-r pr-2 left-0 absolute"
                src={linkIcon}
            />
            {content}
        </div>
    );
};

export default ButtonAuth;
