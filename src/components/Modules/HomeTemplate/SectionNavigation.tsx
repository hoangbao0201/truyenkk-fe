'use client'

import { useRouter } from "next/navigation";
import { NavPagination } from "@/components/Share/NavPagination"

interface SectionNavigation {
    countPage: number,
    currentPage: number
}
const SectionNavigation = ({ countPage, currentPage }: SectionNavigation) => {
    const router = useRouter();
    const handleChangePage = (page: number) => {
        router.push(`?page=`+page)
    }

    return (
        <NavPagination
            countPage={countPage}
            currentPage={currentPage}
            handleChangePage={handleChangePage}
        />
    )
}

export default SectionNavigation;