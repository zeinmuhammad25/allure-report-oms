export default class Element {
    selector?: string;
    value?: string;
    type: ElementType;

    private constructor(selector: string, value: string, type: ElementType) {
        this.selector = selector;
        this.value = value;
        this.type = type;
    }

    public static of(selector: string, value: string): Element {
        return new Element(selector, value, ElementType.KEY_VALUE);
    }

    static ofSelector(selector: string): Element {
        return new Element(selector, null, ElementType.ELEMENT)
    }

    static ofText(text: string): Element {
        return new Element(null, text, ElementType.TEXT);
    }
}

export enum ElementType {
    TEXT, ELEMENT, KEY_VALUE
}