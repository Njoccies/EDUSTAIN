import logoImg from "/src/imports/image.png";

export function Header() {
  return (
    <header className="bg-white py-4 px-8">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={logoImg} 
            alt="Edustain CONNECT" 
            className="h-24 w-auto"
          />
        </div>
        <button className="text-[#0077b6] hover:underline">
          Login
        </button>
      </div>
    </header>
  );
}
