import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import UserProfileDropdown from "@/components/common/UserProfileDropdown";

const PublicHeader = () => {
  const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/25">
              <div className="w-5 h-5 text-primary-foreground">✦</div>
            </div>
            <span className="text-xl font-bold text-foreground">
              ZeekNet
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              Recent Jobs
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              Companies
            </a>
            <a
              href="/jobs"
              className="text-primary font-medium"
            >
              Find Jobs
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              Articles
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            {isInitialized && isAuthenticated ? (
              <UserProfileDropdown />
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-foreground"
                  asChild
                >
                  <a href="/auth/login">Login</a>
                </Button>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  asChild
                >
                  <a href="/auth/register">Sign Up</a>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
