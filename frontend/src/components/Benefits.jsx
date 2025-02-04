const Benefits = ()=>{
  const benefits = [
    {
        title: "Work with Top Freelancers",
        description: "Find top professionals across various industries, from developers to designers. Our platform ensures a seamless hiring process with skilled freelancers ready to deliver high-quality work tailored to your needs.",
        image: "./freelance.jpeg",
        reverse: false,
    },
    {
        title: "Secure Payments",
        description: "Your payments are protected with our escrow system. Funds are only released when the work meets your expectations, ensuring security and trust for both clients and freelancers.",
        image: "./secure.jpeg",
        reverse: true,
    },
    {
        title: "24/7 Support",
        description: "Need help at any time? Our support team is available 24/7 to assist with any issues, from project management to dispute resolution, ensuring a smooth experience for everyone.",
        image: "./service.jpeg",
        reverse: false,
    },
    {
        title: "Flexible Working Hours",
        description: "Freelancers can choose their own schedules, while businesses can hire talent from different time zones. This flexibility allows for faster project completion and better work-life balance.",
        image: "./flexible.jpeg",
        reverse: true,
    },
    {
        title: "Work from Anywhere",
        description: "No office? No problem. Our platform allows freelancers to work remotely from anywhere, providing freedom and flexibility to collaborate with global clients without limitations.",
        image: "./work.jpeg",
        reverse: false,
    },
    {
        title: "Get Paid on Time",
        description: "Timely payments without delays. Our platform offers secure and fast transactions through multiple payout options, ensuring freelancers get paid for their work hassle-free.",
        image: "./get.webp",
        reverse: true,
    }
];


    return (
        <section className="w-full py-16 bg-gray-100 text-center px-6 md:px-12">
            <h2 className="text-7xl font-bold text-gray-800">Why Choose Our platform ??</h2>
            <p className="text-xl text-gray-600 mt-7 max-w-5xl mx-auto font-semibold -mb-10">
              Discover the key benefits of using our freelancing platform and see how it can help you grow your business or career.
            </p>
            <div className="mt-20 space-y-12 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-lg">
              {/* Title */}
              <h3 className="text-4xl font-semibold text-gray-800">{benefit.title}</h3>
  
              {/* Description */}
              <p className="text-gray-600 mt-5 text-lg leading-relaxed max-w-2xl font-semibold">{benefit.description}</p>
  
              {/* Image */}
              <img
                src={benefit.image}
                alt={benefit.title}
                className="w-full max-w-[450px] h-auto rounded-lg shadow-md mt-6"
              />
            </div>
            ))}
          </div>
        </section>
    )
}


export default Benefits;