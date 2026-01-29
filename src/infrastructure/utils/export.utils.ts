/**
 * Infrastructure Layer - Export Utilities
 * Cross-cutting export functionality for generating JPEG images
 */

import html2canvas from 'html2canvas';

/**
 * Export HTML element to JPEG image
 */
export async function exportElementToJpeg(
  elementId: string,
  filename: string
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  // Hide elements marked as no-export
  const hidden: HTMLElement[] = [];
  document.querySelectorAll('.no-export').forEach((el) => {
    const htmlEl = el as HTMLElement;
    hidden.push(htmlEl);
    htmlEl.style.visibility = 'hidden';
  });

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    });

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create blob from canvas'));
          return;
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        resolve();
      }, 'image/jpeg', 0.92);
    });
  } catch (error) {
    console.error('Export failed', error);
    throw new Error('Export failed. Please try again.');
  } finally {
    // Restore visibility
    hidden.forEach((el) => el.style.visibility = 'visible');
  }
}

/**
 * Setup export button handler
 */
export function setupExportButton(
  buttonId: string,
  contentId: string,
  filename: string
): () => void {
  const button = document.getElementById(buttonId);
  
  const handleExport = async () => {
    try {
      await exportElementToJpeg(contentId, filename);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Export failed');
    }
  };

  button?.addEventListener('click', handleExport);

  // Return cleanup function
  return () => {
    button?.removeEventListener('click', handleExport);
  };
}
