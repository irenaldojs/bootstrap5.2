import { ICustomWidgetPresenter, Widget } from "../Objective-UI";

export class CodePre extends Widget {

    public widgetDiv: HTMLDivElement
    public contentDiv: HTMLDivElement

    private dark: boolean
    private code: string
    private codeClass: string

    constructor({ name, code, codeClass = null, dark = false }: { name: string, code: string, codeClass?: string, dark?: boolean }) {
        super(name)
        this.codeClass = codeClass
        this.code = code;
        this.dark = dark;
    }

    protected htmlTemplate(): string {
        return `
            <code id="widgetDiv">
                <pre id="contentDiv"></pre>
            </code>        
        `
    }
    protected onWidgetDidLoad(): void {
        this.widgetDiv = this.elementById('widgetDiv')
        this.contentDiv = this.elementById('contentDiv')

        this.contentDiv.innerHTML = this.code
        this.widgetDiv.className = this.codeClass

        if (this.dark) {
            this.contentDiv.classList.add('text-light')
            this.contentDiv.classList.add('bg-dark')
        }
    }
    public setCustomPresenter(presenter: ICustomWidgetPresenter<Widget>): void {
        throw new Error("Method not implemented.");
    }
    public value(): string {
        throw new Error("Method not implemented.");
    }
    public setEnabled(enabled: boolean): void {
        this.widgetDiv.toggleAttribute('disabled', !enabled)
    }
    public addCSSClass(className: string): void {
        this.widgetDiv.classList.add(className)
    }
    public removeCSSClass(className: string): void {
        this.widgetDiv.classList.remove(className)
    }
    public applyCSS(propertyName: string, propertyValue: string): void {
        this.widgetDiv.style.setProperty(propertyName, propertyValue)
    }
    public setPosition(position: string, marginLeft: string, marginTop: string, marginRight: string, marginBottom: string, transform?: string): void {
        this.widgetDiv.style.position = position;
        this.widgetDiv.style.marginLeft = marginLeft;
        this.widgetDiv.style.marginRight = marginRight;
        this.widgetDiv.style.marginTop = marginTop;
        this.widgetDiv.style.marginBottom = marginBottom;
        this.widgetDiv.style.transform = transform ?? this.widgetDiv.style.transform;
    }
    public setVisible(visible: boolean): void {
        this.widgetDiv.toggleAttribute('hidden', !visible)
    }

}
