

const Header = ({title, subtitle}) => {
    return (
        <div className="flex flex-col items-center gap-4 text-center bg-black py-12 px-2 mb-12">
            <h2 className="text-cyan-400 text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
                {title}
            </h2>
            <p className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-1/2 text-sm sm:text-base text-orange-400 font-semibold">
                {subtitle}
            </p>
        </div>
    );
};

export default Header;