import Link from "next/link";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/action-center", label: "Action Center" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-[#f6f6ef]/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-lg font-bold tracking-tight text-slate-900">
          iGaming Regulation Navigator
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 font-semibold text-slate-700 hover:bg-slate-200 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
