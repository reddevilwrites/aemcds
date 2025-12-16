export default function decorate(block) {
  [...block.children].forEach((row) => {
    // 1. Setup the new semantic elements
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'accordion-content'; // Class for easy styling

    // 2. Identify the source content
    // We look at the first cell of the row.
    const firstCell = row.children[0];
    const secondCell = row.children[1];

    // 3. Logic: Determine where content comes from
    if (secondCell && secondCell.textContent.trim()) {
      // SCENARIO A: 2-Column Authoring (Col 1 = Header, Col 2 = Body)
      // This is the "Clean" way.
      summary.append(...firstCell.childNodes);
      contentWrapper.append(...secondCell.childNodes);
    } else {
      // SCENARIO B: 1-Column Authoring (User put Question + Answer in same cell)
      // This fixes your specific issue.
      const paragraphs = [...firstCell.children];
      
      if (paragraphs.length > 0) {
        // The First Paragraph becomes the Header (Summary)
        summary.append(paragraphs[0]);

        // All remaining paragraphs move to the Content Body
        paragraphs.slice(1).forEach((p) => {
          contentWrapper.append(p);
        });
      }
    }

    // 4. Assemble the DOM
    // Only append the wrapper if it actually has content
    if (contentWrapper.hasChildNodes()) {
      details.append(summary);
      details.append(contentWrapper);
    } else {
      // Fallback if empty
      details.append(summary);
    }

    // 5. Replace the table row with the new details element
    row.replaceWith(details);
  });
}