const Benefits = ()=>{
    const benefits = [
        {
            title: "Work with Top Freelancers",
            description: "Find skilled freelancers from various fields, ensuring high-quality work for your projects.",
            image: "/images/freelancer.png", // Adjust path
            reverse: false, // Determines layout direction
        },
        {
            title:"Secure Payments",
            description:"Make secure payments through our platform to ensure that your money is safe.",
            image:"/images/secure-payment.png", // Adjust path
            reverse:true, // Determines layout direction
        },
        {
            title:"24/7 Support",
            description:"Get help from our support team at any time of the day, any day of the week.",
            image:"/images/support.png", // Adjust path
            reverse:false, // Determines layout direction
        },
        {
            title:"flexible working hours",
            description:"Work at your own pace and at your own time. No need to worry about strict deadlines.",
            image:"/images/flexible.png", // Adjust path
            reverse:true, // Determines layout direction
        },
        {
            title:"Work from Anywhere",
            description:"Work from the comfort of your home, or from anywhere in the world.",
            image:"/images/anywhere.png", // Adjust path
            reverse:false, // Determines layout direction
        },
        {
            title:"Get Paid on Time",
            description:"Get paid on time for your hard work, no delays.",
            image:"/images/paid.png", // Adjust path
            reverse:true, // Determines layout direction
        }
    ]
    return (
        <section className="w-full py-16 bg-gray-100">
            <h2 className="text-3xl font-bold text-center text-gray-800">Why Choose Our platform ??</h2>
            <div className="mt-10 space-y-12 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex flex-col  items-center gap-8 ${benefit.reverse ? "md:flex-row-reverse" : ""}`}
              >
                {/* Text Section */}
                <div className="w-full md:w-1/2 text-center md:text-left px-6">
                  <h3 className="text-2xl font-semibold text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600 mt-2">{benefit.description}</p>
                </div>
    
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <img src={benefit.image} alt={benefit.title} className="w-full max-w-[400px] h-auto rounded-lg shadow-md" />
                </div>
              </div>
            ))}
          </div>
        </section>
    )
}


export default Benefits;