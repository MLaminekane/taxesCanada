import { DollarSign } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <DollarSign className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-bold text-foreground">
            TaxCan QC
          </h1>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">
          Québec, Canada
        </div>
      </div>
    </header>
  );
};

export default Header;