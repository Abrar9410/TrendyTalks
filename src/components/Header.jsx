

const Header = ({title, subtitle}) => {
    return (
        <div className="flex flex-col items-center gap-4 text-center bg-gradient-to-r from-red-800 via-orange-700 to-rose-400 py-12 px-2 mb-12">
            <h2 className="text-black text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
                {title}
            </h2>
            <p className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-1/2 text-sm sm:text-base text-black/85 font-semibold">
                {subtitle}
            </p>
        </div>
    );
};

export default Header;