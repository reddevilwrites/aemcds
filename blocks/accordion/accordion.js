export default function decorate(block) {
    [...block.children].forEach((row) => {
        const summary = row.children[0];
        const content = row.children[1];

        const details = document.createElement('details');
        const summaryNode = document.createElement('summary')

        summaryNode.append(...summary.childNodes);
        details.append(summaryNode);
        details.append(content);

        row.replaceWith(details);


    });
}