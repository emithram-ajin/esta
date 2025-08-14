import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const routeNameMap = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
  "/services": "Services",
  "/services/govt": "Government Services",
  "/register": "Register",
};


function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  const breadcrumbs = paths.map((_, index) => {
    const to = "/" + paths.slice(0, index + 1).join("/");
    
    // Safe label generation with proper fallbacks
    let label = routeNameMap[to];
    if (!label) {
      const pathSegment = to.split("/").pop();
      if (pathSegment && typeof pathSegment === 'string') {
        try {
          label = decodeURIComponent(pathSegment);
          // Capitalize first letter
          label = label.charAt(0).toUpperCase() + label.slice(1);
        } catch (e) {
          console.error('Error decoding path segment:', pathSegment);
          label = pathSegment;
        }
      } else {
        label = "Unknown";
      }
    }
    
    return {
      path: to,
      label: String(label) 
    };
  });

  const fullCrumbs = [{ path: "/", label: "Home" }, ...breadcrumbs];

  return (
    <nav className="max-w-8xl mx-auto text-sm sm:text-base text-[#1AA39D] font-poppins" aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2">
        {fullCrumbs.map((item, index) => {
          // Additional safety check
          if (!item || typeof item.label !== 'string') {
            console.error('Invalid breadcrumb item:', item);
            return null;
          }
          
          return (
            <li key={item.path || index} className="flex items-center gap-x-2">
              {index !== 0 && <ChevronRight className="w-4 h-4 text-[#1AA39D]" />}
              {index === fullCrumbs.length - 1 ? (
                <span className="text-[#1AA39D]">{item.label}</span>
              ) : (
                <Link to={item.path} className="text-[#1AA39D] hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          );
        }).filter(Boolean)}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;