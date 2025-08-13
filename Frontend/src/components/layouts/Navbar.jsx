import { Badge } from "../Ui/Badge";
import { Button } from "../Ui/Button";
import logoForm from "../../assets/logoform.png";
import { Link } from "react-router-dom";


export const Navbar = () => (
  <div className="sticky top-0 z-50 border-b border-slate-800/70 bg-black/80 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <div className="flex items-center gap-2">
         <Link to="/" className="flex items-center gap-2">
           <img
             className="h-12 w-12 rounded-xl"
             src={logoForm}
             alt="FormForge Logo"
           />
        <span className="text-sm font-semibold tracking-wide text-slate-100">
          FormForge
        </span>
         </Link>

        <Badge className="ml-2 hidden bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30 sm:inline">
          New
        </Badge>
      </div>
      <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
        <a href="#features" className="hover:text-white">
          Features
        </a>
        <a href="#how" className="hover:text-white">
          How it works
        </a>
      </nav>
      <div className="flex items-center gap-2">

        <Link to="/form/sample-demo">
          <Button className="hidden md:inline" variant="ghost">
            Try demo
          </Button>
        </Link>

        <Link to="/builder">
          <Button className="rounded-2xl">Start building</Button>
        </Link>
        
      </div>
    </div>
  </div>
);
