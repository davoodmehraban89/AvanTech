export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="text-xl font-bold">AvanTech</div>
        <nav className="hidden gap-6 md:flex">
          <a href="/">خانه</a>
          <a href="/products">محصولات</a>
          <a href="/account">حساب کاربری</a>
        </nav>
        <div className="flex gap-3">
          <a href="/cart">سبد خرید</a>
          <a href="/login">ورود</a>
        </div>
      </div>
    </header>
  );
}
