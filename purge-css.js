import { PurgeCSS } from 'purgecss';
import fs from 'fs';
import path from 'path';

async function purgeUnusedCSS() {
  console.log('Starting CSS purge process...');
  
  try {
    // Read the current CSS file
    const cssFilePath = path.resolve('src/app.css');
    const originalCss = fs.readFileSync(cssFilePath, 'utf8');
    
    // Save a backup of the original CSS
    const backupPath = path.resolve('src/app.css.backup');
    fs.writeFileSync(backupPath, originalCss);
    console.log(`Original CSS backed up to ${backupPath}`);
    
    // Run PurgeCSS
    const purgeCSSResult = await new PurgeCSS().purge({
      content: [
        './src/**/*.{html,js,svelte,ts}',
      ],
      css: [{ raw: originalCss }],
      safelist: [
        // Add classes that might be dynamically added or that you want to keep
        /^w-/,  // Keep all Webflow classes
        /^ProseMirror/,  // Keep all ProseMirror classes
        /^text-prime$/,
        /^bg-prime$/,
        /^text-/,
        /^bg-/,
        /^mt-/,
        /^mb-/,
        /^mx-/,
        /^my-/,
        /^p-/,
        /^px-/,
        /^py-/,
        /^grid-/,
        /^flex-/,
        /^gap-/,
        /^container/,
        /^section-/,
        /^hero-/,
        /^button-/,
        /^form-/,
        /^richText/,
        /^bounce/,
        'sr-only',
        'gradient-1',
        'gradient-2',
        'no-margin',
        'w-button',
        'w-inline-block',
        'w-container',
        'w-dyn-list',
        'w-dyn-items',
      ],
      // Preserve important comments and Tailwind directives
      defaultExtractor: content => {
        // First preserve Tailwind directives
        const tailwindDirectives = content.match(/@tailwind[^;]+;/g) || [];
        
        // Then extract all class names
        const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
        const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
        
        return [...tailwindDirectives, ...broadMatches, ...innerMatches];
      }
    });
    
    if (purgeCSSResult.length === 0) {
      throw new Error('PurgeCSS returned empty result');
    }
    
    // Get the purged CSS
    const purgedCss = purgeCSSResult[0].css;
    
    // Ensure Tailwind directives are at the top
    const tailwindDirectives = originalCss.match(/@tailwind[^;]+;/g) || [];
    const tailwindDirectivesString = tailwindDirectives.join(' ');
    
    // Remove Tailwind directives from purged CSS if they exist
    let cleanPurgedCss = purgedCss;
    tailwindDirectives.forEach(directive => {
      cleanPurgedCss = cleanPurgedCss.replace(directive, '');
    });
    
    // Combine Tailwind directives with purged CSS
    const finalCss = `${tailwindDirectivesString}\n\n${cleanPurgedCss}`;
    
    // Write the purged CSS back to the file
    fs.writeFileSync(cssFilePath, finalCss);
    
    // Calculate size reduction
    const originalSize = Buffer.byteLength(originalCss, 'utf8');
    const purgedSize = Buffer.byteLength(finalCss, 'utf8');
    const reductionPercent = ((originalSize - purgedSize) / originalSize * 100).toFixed(2);
    
    console.log(`CSS purge complete!`);
    console.log(`Original size: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`Purged size: ${(purgedSize / 1024).toFixed(2)} KB`);
    console.log(`Reduction: ${reductionPercent}%`);
    
  } catch (error) {
    console.error('Error during CSS purge:', error);
    process.exit(1);
  }
}

purgeUnusedCSS();
