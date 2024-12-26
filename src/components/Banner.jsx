import { motion } from "motion/react"
import bannerImg1 from "../assets/trendy_talks_banner1.png";
import bannerImg2 from "../assets/trendy_talks_banner2.png";

const Banner = () => {

    const headerAnimation = {
        x: 0,
        transition: {
            duration: 2,
        }
    };

    const subTextAnimation = {
        y: 0,
        transition: {
            duration: 2
        }
    };

    const banner1Animation = {
        x: ["0", "-10px", "0", "10px", "0", "-10px", "0", "-10px", "0"],
        y: ["0", "-10px", "0", "-10px", "0", "-10px", "0", "10px", "0"],
        transition: {
            duration: 24,
            delay: 1,
            ease: "easeInOut",
            repeat: Infinity
        }
    };
    
    const banner2Animation = {
        x: ["0", "10px", "0", "-10px", "0", "10px", "0", "10px", "0"],
        y: ["0", "10px", "0", "10px", "0", "10px", "0", "-10px", "0"],
        transition: {
            duration: 24,
            delay: 1,
            ease: "easeInOut",
            repeat: Infinity
        }
    };

    return (
        <div className="mb-8 md:mb-10 lg:mb-12 bg-gradient-to-r from-cyan-300 via-cyan-500 to-cyan-700">
            <div className="w-11/12 mx-auto py-12 flex flex-col sm:flex-row justify-between items-center max-sm:gap-6">
                <div className="px-4 flex flex-col items-center sm:items-start gap-4 max-sm:text-center">
                    <motion.h1
                        initial={{x: -100}} 
                        animate={headerAnimation}
                        className="text-blue-800 font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                            Discover Stories That Inspire and Ideas That Trend.
                    </motion.h1>
                    <motion.p
                        initial={{y: 100}}
                        animate={subTextAnimation}
                        className="text-white min-[350px]:w-9/12 text-sm lg:text-base">
                            Unleash your creativity, connect with others, and explore everything
                            from fresh perspectives to timeless wisdom—it's all here!
                    </motion.p>
                </div>
                <div className="flex flex-col">
                    <div className="sm:w-[50vw] flex justify-center items-center">
                        <motion.div
                            initial={{x: 0, y: 0}}
                            animate={banner1Animation}
                            className="w-1/2 rounded-xl">
                            <img src={bannerImg1} alt="" className="w-full rounded-xl"/>
                        </motion.div>
                        <div className="w-1/2"></div>
                    </div>
                    <div className="sm:w-[50vw] flex justify-center items-center">
                        <div className="w-1/2"></div>
                        <motion.div
                            initial={{x: 0, y: 0}}
                            animate={banner2Animation}
                            className="w-1/2 rounded-xl">
                            <img src={bannerImg2} alt="" className="w-full rounded-xl"/>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;