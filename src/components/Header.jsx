import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className='header'>
      <Link className='header__logo' to='/' />
    </header>
  );
}