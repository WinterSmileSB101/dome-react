const getStyles = (element: Element) => {
    // Support: IE <=11+ (trac-14150)
    // In IE popup's `window` is the opener window which makes `window.getComputedStyle( elem )`
    // break. Using `elem.ownerDocument.defaultView` avoids the issue.
    let view = element.ownerDocument.defaultView;

    // `document.implementation.createHTMLDocument( "" )` has a `null` `defaultView`
    // property; check `defaultView` truthiness to fallback to window in such a case.
    if (!view) {
        view = window;
    }

    return view.getComputedStyle(element);
};

// Note: an element does not contain itself
const elementContaines = (a, b) => {
    const adown = a.nodeType === 9 ? a.documentElement : a;
    const bup = b && b.parentNode;

    return (
        a === bup ||
        !!(
            bup &&
            bup.nodeType === 1 &&
            // Support: IE 9 - 11+
            // IE doesn't have `contains` on SVG.
            (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) + 16)
        )
    );
};

const isAttached = (element: Element) => {
    if (!document.getRootNode()) {
        return elementContaines(element.ownerDocument, element);
    }

    const composed = { composed: true };
    return elementContaines(element.ownerDocument, element) || element.getRootNode(composed) === element.ownerDocument;
};

const getCurrentCss = (element: Element, name: string, computed?: CSSStyleDeclaration) => {
    let result: string;

    computed = computed || getStyles(element);

    // getPropertyValue is needed for `.css('--customProperty')` (gh-3144)
    if (computed) {
        result = computed.getPropertyValue(name) || computed[name];

        if (result === '' && !isAttached(element)) {
            result = (element as HTMLElement)?.style[name];
        }
    }

    if (!result) {
        result = element[name];
    }

    return result !== undefined
        ? // Support: IE <=9 - 11+
          // IE returns zIndex value as an integer.
          `${result}`
        : result;
};

export default { getCurrentCss };
