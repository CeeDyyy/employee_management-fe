"use client"

import BackBtn from './backbtn';

const Page = ({ children, title = "title", path = "/" }) => {
    return (
        <div className="mx-4 md:mx-48 2xl:mx-72">
            <div className="pt-2 fixed w-full grid grid-cols-3 content-center bg-neutral-50">
                <BackBtn path={path} />
                <p className="-ml-8 text-center text-2xl font-bold self-center">{title}</p>
            </div>
            <div className="mt-14 mb-11">
            {children}
            </div>
        </div>
    )
}

export { Page };
