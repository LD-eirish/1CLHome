import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function PageBreadcrumb({ items }: Readonly<PageBreadcrumbProps>) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1 || !item.to;
          return (
            <li key={`${item.label}-${index}`} aria-current={isCurrent ? 'page' : undefined}>
              {isCurrent ? item.label : <Link to={item.to!}>{item.label}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
