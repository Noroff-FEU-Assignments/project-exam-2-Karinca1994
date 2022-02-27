import { ButtonLink } from "../common/Button";

const Hero = () => (
  <header className="hero-image flex items-center justify-center h-screen pb-12">
    <div className="absolute bg-white font-serif mx-4 p-7 text-center rounded md:p-10">
      <p className="italic text-sm">Welcome to</p>
      <h1 className="text-5xl uppercase">Holidaze</h1>
      <p className="text-lg">Bergens best accomodations</p>
      <div className="absolute p-2 md:p-5 left-1/4">
        <ButtonLink link="/accomodations">explore</ButtonLink>
      </div>
    </div>
  </header>
);

export default Hero;
