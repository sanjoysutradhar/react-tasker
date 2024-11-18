export default function Header() {
  return (
    <nav className="py-6 md:py-8 fixed top-0 w-full !bg-[#11141d] z-50">
      <div className="container mx-auto flex items-center justify-between gap-x-6">
        <a href="/">
          {/* <img className="h-[45px]" src={lwsLogo} alt="Lws" /> */}
          <span className="text-2xl text-teal-700">Learn With Shanjoy </span>
        </a>
      </div>
    </nav>
  );
}
