interface NavbarProps {
  title?: string;
  logo?: string;
}
export default function Navbar({ logo, title }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center space-x-4">
        {logo && <img src={logo} alt="Logo" className="h-8 w-8" />}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
    </nav>
  );
}
