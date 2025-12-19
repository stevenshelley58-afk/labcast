// State
const [menuOpen, setMenuOpen] = useState(false);

// Toolbar
<header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 transition-colors duration-300 ${
  menuOpen ? 'bg-neutral-950' : 'bg-white/95 backdrop-blur-sm'
}`}>
  <a href="/" className={`text-[15px] font-medium tracking-tight transition-colors ${
    menuOpen ? 'text-white' : 'text-neutral-900'
  }`}>
    Labcast
  </a>
  
  <button 
    onClick={() => setMenuOpen(!menuOpen)} 
    className="w-6 h-6 relative"
    aria-label="Menu"
  >
    <span className={`absolute left-0 top-1.5 w-5 h-[1.5px] transition-all duration-300 ${
      menuOpen ? 'bg-white rotate-45 top-3' : 'bg-neutral-900'
    }`} />
    <span className={`absolute left-0 top-4 w-5 h-[1.5px] transition-all duration-300 ${
      menuOpen ? 'bg-white -rotate-45 top-3' : 'bg-neutral-900'
    }`} />
  </button>
</header>

// Backdrop
<div 
  onClick={() => setMenuOpen(false)}
  className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
    menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`} 
/>

// Slide Menu
<nav className={`fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-neutral-950 z-50 transition-transform duration-300 ease-out ${
  menuOpen ? 'translate-x-0' : 'translate-x-full'
}`}>
  <div className="px-6 pt-24 pb-8 h-full flex flex-col">
    <div className="space-y-5">
      <a href="/services" className="block text-xl text-white font-light">Services</a>
      <a href="/#about" className="block text-xl text-white font-light">About</a>
      <a href="/render-vault" className="block text-xl text-white font-light">Render Vault</a>
      <a href="/#contact" className="block text-xl text-white font-light">Contact</a>
    </div>
    
    <div className="mt-12">
      <a href="/signup" className="block w-full py-3 border border-white text-white text-sm text-center rounded-full">
        Sign up
      </a>
      <a href="/login" className="block text-center text-sm text-neutral-500 mt-4">
        Login
      </a>
    </div>
    
    <div className="mt-auto">
      <p className="text-xs text-neutral-600">Perth, Australia</p>
      <p className="text-xs text-neutral-600 mt-1">hello@labcast.com.au</p>
    </div>
  </div>
</nav>
