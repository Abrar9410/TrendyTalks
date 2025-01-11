

const AboutUs = () => {
    return (
        <div className="flex flex-col items-center gap-8 px-2 mb-12">
            <h2 className="text-center text-cyan-500 text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
                About Us
            </h2>
            <p className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-1/2 text-sm sm:text-base text-white bg-black p-4 rounded-lg font-semibold">
                Welcome to TrendyTalks, your ultimate platform for exploring and sharing ideas, stories, and
                perspectives. At TrendyTalks, we believe that everyone has a story to tell and a voice worth
                hearing. Whether you're a passionate writer, an avid reader, or someone curious about the
                latest trends, we've built a space where creativity and connection thrive.<br/><br/>
                <span className="text-lg font-bold">Our Mission</span><br/>
                To empower individuals to express themselves, connect with others, and spark meaningful
                conversations around the topics that matter most.<br /><br />
                <span className="text-lg font-bold">What We Offer</span><br />
                <li><span className="font-semibold">A Creative Platform:</span>
                    Share your blogs and insights with a global audience.
                </li>
                <li><span className="font-semibold">Diverse Content:</span>
                    Discover a wide range of topics, from tech and lifestyle to personal growth and beyond.
                </li>
                <li><span className="font-semibold">A Community of Thinkers:</span>
                    Connect with like-minded individuals who value sharing and learning.
                </li>
                <br/><br/>
                <span className="text-lg font-bold">Why TrendyTalks?</span><br />
                In a world of endless information, TrendyTalks is your destination for thoughtful, impactful,
                and trending content. We aim to inspire, inform, and engage through a community-driven platform
                where every story matters.<br/><br/>
                Join us today and become part of the conversation that shapes tomorrow. Together, let’s turn
                thoughts into trends.
            </p>
        </div>
    );
};

export default AboutUs;