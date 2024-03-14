"use client"

import BackBtn from './backbtn';

const PageLayout = ({ children, title = "title", path = "/" }) => {
    return (
        <div className="h-screen mx-4 md:mx-48 2xl:mx-72">
            <div className="sticky pt-2 w-full grid grid-cols-3 content-center bg-neutral-50">
                <BackBtn path={path} />
                <p className="text-center text-2xl font-bold self-center">{title}</p>
            </div>
            <div className="mt-14 mb-11">
            {children}
            </div>
        </div>
    )
}

export { PageLayout };
