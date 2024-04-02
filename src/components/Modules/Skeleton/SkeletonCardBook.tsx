import { Fragment } from "react";

const SkeletonCardBook = ({ count = 4 }: { count?: number }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => {
                return (
                    <Fragment key={i}>
                        <div className="animate-pulse">
                            <div className="md:rounded-sm bg-gray-200 h-[200px] mb-2"></div>
                            <div className="md:rounded-sm bg-gray-200 h-7 mb-2"></div>
                            <div className="md:rounded-sm bg-gray-200 h-7"></div>
                        </div>
                    </Fragment>
                );
            })}
        </>
    );
};

export default SkeletonCardBook;
