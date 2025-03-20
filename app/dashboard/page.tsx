import Image from "next/image";

const Dashboard = () => {
    return (
        <div className="h-screen w-full bg-gray-50 relative">
            <div className="flex p-12">
                <Image
                    src="/Demo.jpg"
                    width={320}
                    height={320}
                    alt="Demo Image"
                    className="rounded-3xl shadow-2xl z-20 mx-24 my-2"
                />
                <div className="flex flex-col p-2">
                    <h1 className=" max-w-2xl text-6xl font-bold italic text-orange-800 mx-4 my-4 z-30">
                        Detect Bone Fractures Instantly
                    </h1>
                    <p className="text-2xl text-gray-600 max-w-lg mx-6 z-10">
                        Our AI-powered system uses machine learning algorithms to detect bone
                        fractures with high accuracy. Simply upload your X-ray images and get
                        instant results.
                    </p>
                </div>
            </div>

            <div className="bg-white shadow-xl max-w-lg border border-gray-100 py-24 px-24 mx-auto rounded-3xl transform z-20">
                <label className="cursor-pointer w-full">
                    <div className="rounded-full bg-teal-500 py-4 px-1 text-white font-semibold text-2xl text-center">
                        Upload Image
                    </div>
                    <input type="file" className="hidden" />
                </label>
            </div>

            {/* Additional scattered shapes */}
            {/* <div className="absolute top-10 right-16 w-28 h-28 bg-pink-500 opacity-50 rounded-full blur-lg rotate-[25deg]"></div>
            <div className="absolute bottom-10 left-10 w-36 h-36 bg-green-500 opacity-50 rounded-full blur-lg rotate-[-15deg]"></div>
            <div className="absolute bottom-[20%] right-[30%] w-20 h-20 bg-blue-500 opacity-40 rounded-full blur-lg rotate-[40deg]"></div> */}
        </div>
    );
};

export default Dashboard;
