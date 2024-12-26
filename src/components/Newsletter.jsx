import { toast } from "react-toastify";


const Newsletter = () => {

    const handleSubscribe = e => {
        e.preventDefault();
        toast.success('Thank You for Subscribing to our Newsletter!', {
            position: "top-center",
            autoClose: 1500
        });
        e.target.reset();
    }

    return (
        <div className="w-11/12 sm:w-9/12 lg:w-2/3 xl:w-1/2 mx-auto mb-12 p-4 md:p-8 rounded-2xl border border-blue-700 bg-blue-700 shadow-xl">
            <div className="rounded-2xl bg-blue-100 bg-cover bg-center border text-center py-10 md:py-14 px-4 md:px-8">
                <h2 className="text-blue-700 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Subscribe to our Newsletter</h2>
                <p className="text-pink-500 text-sm sm:text-base lg:text-xl mb-6">Get immediate email notification for every future Post!</p>
                <form onSubmit={handleSubscribe} className="flex flex-col gap-4 items-center">
                    <input className="w-full px-4 sm:px-7 py-3 rounded-xl border-2 border-blue-700" type="email" name="" id="" placeholder="Enter your email" />
                    <input type="submit" value="Subscribe" className="w-full px-4 sm:px-7 py-3 rounded-xl text-blue-700 font-bold bg-gradient-to-r from-pink-500 to-[#f8b500] cursor-pointer hover:scale-105"/>
                </form>
            </div>            
        </div>
    );
};

export default Newsletter;