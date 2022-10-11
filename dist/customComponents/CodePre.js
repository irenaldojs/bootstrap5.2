"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.CodePre = void 0;
class CodePre extends Widget {
    constructor({ name, code, codeClass = null, dark = false }) {
        super(name);
        this.codeClass = codeClass;
        this.code = code;
        this.dark = dark;
    }
    htmlTemplate() {
        return `
            <code id="widgetDiv">
                <pre id="contentDiv"></pre>
            </code>        
        `;
    }
    onWidgetDidLoad() {
        this.widgetDiv = this.elementById('widgetDiv');
        this.contentDiv = this.elementById('contentDiv');
        this.contentDiv.innerHTML = this.code;
        this.widgetDiv.className = this.codeClass;
        if (this.dark) {
            this.contentDiv.classList.add('text-light');
            this.contentDiv.classList.add('bg-dark');
        }
    }
    setCustomPresenter(presenter) {
        throw new Error("Method not implemented.");
    }
    value() {
        throw new Error("Method not implemented.");
    }
    setEnabled(enabled) {
        this.widgetDiv.toggleAttribute('disabled', !enabled);
    }
    addCSSClass(className) {
        this.widgetDiv.classList.add(className);
    }
    removeCSSClass(className) {
        this.widgetDiv.classList.remove(className);
    }
    applyCSS(propertyName, propertyValue) {
        this.widgetDiv.style.setProperty(propertyName, propertyValue);
    }
    setPosition(position, marginLeft, marginTop, marginRight, marginBottom, transform) {
        this.widgetDiv.style.position = position;
        this.widgetDiv.style.marginLeft = marginLeft;
        this.widgetDiv.style.marginRight = marginRight;
        this.widgetDiv.style.marginTop = marginTop;
        this.widgetDiv.style.marginBottom = marginBottom;
        this.widgetDiv.style.transform = transform !== null && transform !== void 0 ? transform : this.widgetDiv.style.transform;
    }
    setVisible(visible) {
        this.widgetDiv.toggleAttribute('hidden', !visible);
    }
}
//exports.CodePre = CodePre;
