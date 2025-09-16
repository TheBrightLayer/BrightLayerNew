import aboutImg from "../assets/about.jpg";

export default function About() {
  return (
    <section id="about" className="flex flex-col md:flex-row items-center gap-10 px-12 py-20">
      <div className="w-full md:w-1/2">
        <img
          src={aboutImg}
          alt="About"
          className="rounded-xl shadow-lg"
        />
      </div>

      <div className="w-full md:w-1/2 text-gray-800">
        <p className="mb-6 text-lg">
          In this time of enormous change where media is more important than ever before...
        </p>
        <h3 className="text-2xl font-semibold border-b-2 inline-block border-gray-600">
          About
        </h3>
      </div>
    </section>
  );
}
