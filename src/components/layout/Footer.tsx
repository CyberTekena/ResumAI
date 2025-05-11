
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with React, Tailwind, and AI
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">
            Privacy
          </Link>
          <Link to="/terms" className="underline underline-offset-4 hover:text-foreground">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
