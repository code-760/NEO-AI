import { useEffect, useState } from 'react';

export default function MarkdownRenderer({ children, className = '' }) {
  const [MarkdownComponent, setMarkdownComponent] = useState(null);
  const [remarkGfm, setRemarkGfm] = useState(null);

  useEffect(() => {
    let isMounted = true;

    Promise.all([import('react-markdown'), import('remark-gfm')])
      .then(([markdownModule, gfmModule]) => {
        if (!isMounted) return;
        setMarkdownComponent(() => markdownModule.default);
        setRemarkGfm(() => gfmModule.default);
      })
      .catch(() => {
        if (isMounted) {
          setMarkdownComponent(() => null);
          setRemarkGfm(() => null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!MarkdownComponent || !remarkGfm) {
    return <span className={className}>{children}</span>;
  }

  const Component = MarkdownComponent;

  return (
    <Component  remarkPlugins={[remarkGfm]}>
      {children}
    </Component>
  );
}
