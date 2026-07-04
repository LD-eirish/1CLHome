import { assetPath } from '../../infrastructure/utils/asset.utils';

interface PictureElementProps {
  readonly src: string;
  readonly alt: string;
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly loading?: 'lazy' | 'eager';
  readonly width?: number;
  readonly height?: number;
}

/**
 * PictureElement component provides WebP image support with automatic fallback to original format.
 * Serves WebP to modern browsers and falls back to PNG/JPG for older browsers.
 */
export function PictureElement({ 
  src, 
  alt, 
  className,
  style,
  loading = 'lazy',
  width,
  height
}: Readonly<PictureElementProps>) {
  // Convert source path to WebP variant
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const resolvedSrc = assetPath(src);
  const resolvedWebpSrc = assetPath(webpSrc);

  return (
    <picture>
      <source srcSet={resolvedWebpSrc} type="image/webp" />
      <img 
        src={resolvedSrc} 
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        width={width}
        height={height}
      />
    </picture>
  );
}
