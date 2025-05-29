interface BreadcrumbItem {
  label: string;
  path: string;
}

export const formatPathSegment = (segment: string): string => {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getBreadcrumbItems = (currentPath: string): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [
    { label: 'Home', path: '/' }
  ];

  if (currentPath === '/') {
    return items;
  }

  const segments = currentPath.split('/').filter(Boolean);
  let currentSegmentPath = '';

  segments.forEach(segment => {
    currentSegmentPath += `/${segment}`;
    items.push({
      label: formatPathSegment(segment),
      path: currentSegmentPath
    });
  });

  return items;
};

export const isActivePath = (currentPath: string, linkPath: string, exact = false): boolean => {
  if (exact) {
    return currentPath === linkPath;
  }
  return currentPath.startsWith(linkPath);
};