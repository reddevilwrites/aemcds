/*
 * Accordion Block
 * Replaces a table with a <details> and <summary> structure.
 */
export default function decorate(block) {
  // 1. Iterate over each row (which represents an accordion item)
  [...block.children].forEach((row) => {
    // 2. Expecting 2 columns: Column 1 = Summary (Title), Column 2 = Content (Body)
    const summary = row.children[0];
    const content = row.children[1];

    // 3. Create the Semantic HTML elements
    const details = document.createElement('details');
    const summaryNode = document.createElement('summary');
    
    // 4. Move content into the new structure
    summaryNode.append(...summary.childNodes);
    details.append(summaryNode);
    details.append(content);

    // 5. Replace the original row with the new <details> element
    row.replaceWith(details);
  });
}
