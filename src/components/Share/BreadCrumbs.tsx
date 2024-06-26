import Link from "next/link";

import IconAnglesRight from "../Modules/Icons/IconAnglesRight";

interface BreadcrumbsProps {
    className?: string;
    listBreadcrumbs: { id?: number; title: string; slug: string }[];
}
const Breadcrumbs = ({ className, listBreadcrumbs }: BreadcrumbsProps) => {
    return (
        <>
            <div className={className}>
                <ul
                    itemScope
                    itemType="http://schema.org/BreadcrumbList"
                    className="flex items-center flex-wrap"
                >
                    <li
                        itemProp="itemListElement"
                        itemScope
                        itemType="http://schema.org/ListItem"
                        className="flex items-center font-medium text-gray-600 fill-gray-500 dark:text-gray-100"
                    >
                        <Link
                            aria-label="Trang chủ HOANGBAO"
                            itemType="http://schema.org/Thing"
                            itemProp="item"
                            title={`Trang chủ TRUYENKK`}
                            href={`/`}
                        >
                            <span itemProp="name">TRUYENKK</span>
                        </Link>
                        <meta itemProp="position" content={`${1}`}></meta>
                    </li>
                    {listBreadcrumbs.map((item, index) => {
                        return (
                            <li
                                key={index}
                                itemProp="itemListElement"
                                itemScope
                                itemType="http://schema.org/ListItem"
                                className="flex items-center font-medium text-gray-600 fill-gray-500 dark:text-gray-100"
                            >
                                <IconAnglesRight size={12} className="mx-2" />
                                <Link
                                    aria-label={`${item?.title}`}
                                    itemType="http://schema.org/Thing"
                                    itemProp="item"
                                    title={item?.title}
                                    href={item?.slug}
                                >
                                    <span itemProp="name">{item?.title}</span>
                                </Link>
                                <meta
                                    itemProp="position"
                                    content={`${index + 2}`}
                                ></meta>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default Breadcrumbs;
