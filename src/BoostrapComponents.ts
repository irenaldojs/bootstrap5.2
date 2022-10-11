import { IBindable, ICustomWidgetPresenter, IListItemTemplate, PageShell, UIView, Widget, WidgetBinder } from "./Objective-UI";


export class Accordion extends Widget {
    public divAccordion: HTMLDivElement

    private flush: boolean
    private alwaysOpen: boolean
    private listItems: Array<{ title: string, text: string }>
    private divClass: string
    private titleClass: string
    private bodyClass: string

    constructor({
        name,
        listItems = [],
        flush = false,
        alwaysOpen = false,
        divclass = '',
        titleClass = '',
        bodyClass = ''
    }: {
        name: string;
        listItems?: Array<{ title: string, text: string }>
        flush?: boolean;
        alwaysOpen?: boolean;
        divclass?: string;
        titleClass?: string;
        bodyClass?: string;
    }) {
        super(name);
        this.listItems = listItems
        this.flush = flush
        this.alwaysOpen = alwaysOpen
        this.divClass = divclass
        this.titleClass = titleClass
        this.bodyClass = bodyClass
    }

    protected htmlTemplate(): string {
        return `<div class="accordion" id="divAccordion">         
                 </div>`
    }

    protected onWidgetDidLoad(): void {
        this.divAccordion = this.elementById('divAccordion')
        if (this.flush) this.divAccordion.classList.add('accordion-flush')
        this.addListClass(this.divAccordion, this.divClass.split(' '))
    }

    public setListItems(items: Array<{ title: string, text: string }>): void {
        this.listItems = items

        this.updateItems();
    }

    private updateItems(): void {
        this.divAccordion.textContent = null

        this.listItems.forEach((item, index) => {
            var id_div = index + '_' + this.divAccordion.id
            const body_div = `
            <div class="accordion-item">
                <h2 class="accordion-header" id="${id_div}">
                    <button 
                        class="accordion-button ${this.titleClass}" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#collapse_${id_div}" 
                        aria-expanded="false" 
                        aria-controls="${id_div}">
                            ${item.title}
                    </button>
                </h2>
                <div 
                    id="collapse_${id_div}" 
                    class="accordion-collapse collapse" 
                    aria-labelledby="${id_div}" 
                    data-bs-parent="#${this.divAccordion.id}">
                        <div class="accordion-body ${this.bodyClass}">
                        ${item.text}
                        </div>
                </div>
            </div>
            `
            const body_div_alwaysOpen = `
            <div class="accordion-item">
                <h2 class="accordion-header" id="${id_div}">
                    <button 
                        class="accordion-button ${this.titleClass}" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#collapse_${id_div}" 
                        aria-expanded="false" 
                        aria-controls="${id_div}">
                            ${item.title}
                    </button>
                </h2>
                <div 
                    id="collapse_${id_div}" 
                    class="accordion-collapse collapse" 
                    aria-labelledby="${id_div}">
                        <div class="accordion-body ${this.bodyClass}">
                        ${item.text}
                        </div>
                </div>
            </div>
            `

            if (this.alwaysOpen)
                this.divAccordion.insertAdjacentHTML('beforeend', body_div_alwaysOpen)
            else
                this.divAccordion.insertAdjacentHTML('beforeend', body_div)
        })
    }

    public setCustomPresenter(presenter: ICustomWidgetPresenter<Widget>): void {
        throw new Error("Method not implemented.");
    }
    public value(): string {
        throw new Error("Method not implemented.");
    }
    public setEnabled(enabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    public addCSSClass(className: string): void {
        this.divAccordion.classList.add(className);
    }
    public removeCSSClass(className: string): void {
        this.divAccordion.classList.remove(className);
    }
    public applyCSS(propertyName: string, propertyValue: string): void {
        this.divAccordion.style.setProperty(propertyName, propertyValue);
    }
    public setPosition(position: string, marginLeft: string, marginTop: string, marginRight: string, marginBottom: string, transform?: string): void {
        throw new Error("Method not implemented.");
    }
    public setVisible(visible: boolean): void {
        this.divAccordion.toggleAttribute('Hidden', !visible)
    }
    public addListClass(element: HTMLDivElement, listClass: Array<string>) {
        listClass.forEach(item => {
            if (!item) return
            element.classList.add(item)
        })
    }

}

export class NavbarCollapse extends Widget {

    public divNavbar: HTMLDivElement
    public divNavbarBrand: HTMLDivElement
    public btnNavbar: HTMLButtonElement
    public divNavbarNav: HTMLDivElement
    public collapseNavbar: HTMLDivElement

    private navBarExpand: string
    private navBarDark: boolean

    private navbarBrand: { text: string, href: string }

    constructor({
        name,
        navBarExpand,
        navbarBrand,
        navBarDark = false,
    }: {
        name: string
        navBarExpand?: 'sd' | 'md' | 'lg' | 'xl' | 'xxl'
        navbarBrand?: { text: string, href: string }
        navBarDark?: boolean
    }) {
        super(name)
        this.navBarExpand = navBarExpand
        this.navbarBrand = navbarBrand
        this.navBarDark = navBarDark
    }


    protected htmlTemplate(): string {
        return `
        <nav id="divNavbar" class="navbar">
            <div class="container-fluid">
                <a id="divNavbarBrand" class="navbar-brand" href="#"></a>
                <button id="btnNavbar"
                    class="navbar-toggler"
                    type="button" 
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                </button>
                <div id="collapseNavbar" class="collapse navbar-collapse">
                    <ul id="divNavbarNav" class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                </div>
            </div>
        </nav>`
    }
    protected onWidgetDidLoad(): void {
        this.divNavbar = this.elementById('divNavbar')
        this.btnNavbar = this.elementById('btnNavbar')
        this.divNavbarBrand = this.elementById('divNavbarBrand')
        this.divNavbarNav = this.elementById('divNavbarNav')
        this.collapseNavbar = this.elementById('collapseNavbar')

        if (this.navBarExpand) this.addCSSClass(`navbar-expand-${this.navBarExpand}`)
        if (this.navBarDark) this.addCSSClass(`navbar-dark`)

        this.btnNavbar.setAttribute('data-bs-target', '#' + this.collapseNavbar.id)
        this.btnNavbar.setAttribute('aria-controls', this.collapseNavbar.id)

        this.setNavbarBrand()
    }

    private setNavbarBrand(): void {
        if (this.navbarBrand) {
            this.divNavbarBrand.innerText = this.navbarBrand.text
            this.divNavbarBrand.setAttribute('href', this.navbarBrand.href)
        } else {
            this.divNavbarBrand.toggleAttribute('hidden', true)
        }
    }

    public setNavItem(navItem: { text: string, href: string }): void {
        var item = `
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="${navItem.href}">
                    ${navItem.text}
                </a>
            </li>`
        console.log(item);
        this.divNavbarNav.insertAdjacentHTML("beforeend", item)
    }

    public setCustomPresenter(presenter: ICustomWidgetPresenter<Widget>): void {
        throw new Error("Method not implemented.");
    }
    public value(): string {
        throw new Error("Method not implemented.");
    }
    public setEnabled(enabled: boolean): void {
        this.divNavbar.toggleAttribute('disabled', !enabled)
    }
    public addCSSClass(className: string): void {
        this.divNavbar.classList.add(className)
    }
    public removeCSSClass(className: string): void {
        this.divNavbar.classList.remove(className)
    }
    public applyCSS(propertyName: string, propertyValue: string): void {
        this.divNavbar.style.setProperty(propertyName, propertyValue)
    }
    public setPosition(position: string, marginLeft: string, marginTop: string, marginRight: string, marginBottom: string, transform?: string): void {
        throw new Error("Method not implemented.");
    }
    public setVisible(visible: boolean): void {
        this.divNavbar.toggleAttribute('hidden', !visible)
    }

}

export class NavbarOffcanvas extends Widget {

    public divNavbar: HTMLDivElement
    public divNavbarBrand: HTMLDivElement
    public btnNavbar: HTMLButtonElement
    public offcanvasNavbar: HTMLDivElement
    public offcanvasNavbarNav: HTMLDivElement
    public offcanvasNavbarLabel: HTMLDivElement

    private navBarExpand: string
    private navBarDark: boolean

    private navbarBrand: { text: string, href: string }
    private offcanvasNavbarLabelTitle: string

    constructor({
        name,
        navBarExpand,
        navbarBrand,
        navBarDark = false,
        offcanvasNavbarLabelTitle,
    }: {
        name: string
        navBarExpand?: 'sd' | 'md' | 'lg' | 'xl' | 'xxl'
        navbarBrand?: { text: string, href: string }
        navBarDark?: boolean
        offcanvasNavbarLabelTitle?: string
    }) {
        super(name)
        this.navBarExpand = navBarExpand
        this.navbarBrand = navbarBrand
        this.navBarDark = navBarDark
        this.offcanvasNavbarLabelTitle = offcanvasNavbarLabelTitle
    }


    protected htmlTemplate(): string {
        return `
        <nav id="divNavbar" class="navbar">
            <div class="container-fluid">
                <a id="divNavbarBrand" class="navbar-brand" href="#">Offcanvas navbar</a>
                <button id="btnNavbar" class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBar" aria-controls="offcanvasNavbar">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div id="offcanvasNavbar" class="offcanvas offcanvas-start" tabindex="-1"  aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 id="offcanvasNavbarLabel" class="offcanvas-title" >Offcanvas</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul id="offcanvasNavbarNav" class="navbar-nav justify-content-start flex-grow-1 pe-3">                            
                        </ul>
                    </div>
                </div>
            </div>
        </nav>`
    }
    protected onWidgetDidLoad(): void {

        this.bindDivs()
        this.styleNavbar()
        this.setNavbarBrand()

    }

    private bindDivs() {
        this.divNavbar = this.elementById('divNavbar')
        this.btnNavbar = this.elementById('btnNavbar')
        this.divNavbarBrand = this.elementById('divNavbarBrand')
        this.offcanvasNavbar = this.elementById('offcanvasNavbar')
        this.offcanvasNavbarNav = this.elementById('offcanvasNavbarNav')
        this.offcanvasNavbarLabel = this.elementById('offcanvasNavbarLabel')

        this.btnNavbar.setAttribute('data-bs-target', '#' + this.offcanvasNavbar.id)
        this.btnNavbar.setAttribute('aria-controls', this.offcanvasNavbar.id)
    }

    private styleNavbar() {
        if (this.navBarExpand) this.addCSSClass(`navbar-expand-${this.navBarExpand}`)
        if (this.navBarDark) this.addCSSClass(`navbar-dark`)

        this.offcanvasNavbarLabel.innerText = this.offcanvasNavbarLabelTitle ?? ''
    }

    private setNavbarBrand(): void {
        if (this.navbarBrand) {
            this.divNavbarBrand.innerText = this.navbarBrand.text
            this.divNavbarBrand.setAttribute('href', this.navbarBrand.href)
        } else {
            this.divNavbarBrand.toggleAttribute('hidden', true)
        }
    }

    public setNavItem(navItem: { text: string, href: string }): void {
        var item = `
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="${navItem.href}">
                    ${navItem.text}
                </a>
            </li>`
        this.offcanvasNavbarNav.insertAdjacentHTML("beforeend", item)
    }

    public setCustomPresenter(presenter: ICustomWidgetPresenter<Widget>): void {
        throw new Error("Method not implemented.");
    }
    public value(): string {
        throw new Error("Method not implemented.");
    }
    public setEnabled(enabled: boolean): void {
        this.divNavbar.toggleAttribute('disabled', !enabled)
    }
    public addCSSClass(className: string): void {
        this.divNavbar.classList.add(className)
    }
    public removeCSSClass(className: string): void {
        this.divNavbar.classList.remove(className)
    }
    public applyCSS(propertyName: string, propertyValue: string): void {
        this.divNavbar.style.setProperty(propertyName, propertyValue)
    }
    public setPosition(position: string, marginLeft: string, marginTop: string, marginRight: string, marginBottom: string, transform?: string): void {
        throw new Error("Method not implemented.");
    }
    public setVisible(visible: boolean): void {
        this.divNavbar.toggleAttribute('hidden', !visible)
    }

}

export class NavbarOffcanvasSidebar extends Widget {

    //Color Theme
    private bgNavColor: string
    private bgSideColor: string
    private textSideColor: string

    public divNavbar: HTMLDivElement

    public btnLeftNavbarToggle: HTMLDivElement
    public divNavbarBrand: HTMLDivElement
    public btnRightNavbarToggle: HTMLDivElement
    public divContainer: HTMLDivElement
    public btnLeftClose: HTMLButtonElement

    private navBarExpand: string
    private navBarDark: boolean

    public ulRightNavbarNav: HTMLDivElement
    private divRightNavbar: HTMLDivElement

    public divLeftNavbar: HTMLDivElement
    public divSidebarNav: HTMLDivElement
    public ulSidebar: HTMLUListElement


    constructor({
        name,
        navBarExpand = 'lg',
        navBarDark = false,
        bgNavColor = "#fff",
        bgSideColor = "#fff",
        textSideColor = "#000"
    }: {
        name: string
        navBarExpand?: 'sd' | 'md' | 'lg' | 'xl' | 'xxl'
        navBarDark?: boolean
        bgNavColor?: string
        textSideColor?: string
        bgSideColor?: string
    }) {
        super(name)
        this.navBarExpand = navBarExpand
        this.navBarDark = navBarDark
        this.bgNavColor = bgNavColor
        this.bgSideColor = bgSideColor
        this.textSideColor = textSideColor
    }

    protected htmlTemplate(): string {
        return `
            <nav id="divNavbar" class="navbar">
                <div id="divContainer" class="container-fluid flex-wrap px-${this.navBarExpand}-3">
                    <button id="btnLeftNavbarToggle" class="navbar-toggler p-1 me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#bdSidebar" aria-controls="bdSidebar" aria-label="Toggle docs navigation">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </button>
                    <a id="divNavbarBrand" class="navbar-brand p-0 me-0 me-${this.navBarExpand}-2" href="/" aria-label="Bootstrap"></a>                    
                    <button id="btnRightNavbarToggle" class="navbar-toggler p-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-label="Toggle navigation">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        </svg>
                    </button>
                    <div id="rightNavbar" class="offcanvas-${this.navBarExpand} offcanvas-end flex-grow-1"
                        tabindex="-1" aria-labelledby="rightOffcanvasNavbarLabel" data-bs-scroll="true">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="rightOffcanvasNavbarLabel"></h5>
                            <button id="btnRightClose" type="button" class="btn-close" 
                                    data-bs-dismiss="offcanvas" aria-label="Close"
                                    data-bs-target="#rightNavbar"></button>
                        </div>
                        <div class="offcanvas-body p-4 pt-0 p-${this.navBarExpand}-0 ">
                            <ul id="ulRightNavbarNav" class="navbar-nav flex-wrap ms-md-end"></ul>
                        </div>
                    </div>                    
                </div>
                <div id="divLeftNavbar" class="offcanvas-${this.navBarExpand} offcanvas-start"
                    tab-index="-1" aria-labelledby="bdSidebarOffcavnasLabel" role="dialog">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="leftOffcanvasNavbarLabel"></h5>
                        <button id="btnLeftClose" type="button" class="btn-close"
                                data-bs-dismiss="offcanvas" aria-label="Close"
                                data-bs-target="#leftNavbar"></button>
                    </div>
                    <div id="divSidebarNav" class="offcanvas-body">
                        <nav class="w-100" aria-label="Docs navigation">
                            <ul id="ulSidebar" class="list-unstyled mb-0 pb-3 pb-md-2 pe-${this.navBarExpand}-2"></ul>
                        </nav>
                    </div>
                </div>        
            </nav>
        `
    }

    protected onWidgetDidLoad(): void {
        this.bindDivs()
        this.styleNavbar()
    }

    private bindDivs() {
        this.divNavbar = this.elementById('divNavbar')
        this.divContainer = this.elementById('divContainer')
        this.divNavbarBrand = this.elementById('divNavbarBrand')
        this.btnLeftNavbarToggle = this.elementById('btnLeftNavbarToggle')
        this.btnRightNavbarToggle = this.elementById('btnRightNavbarToggle')
        this.ulRightNavbarNav = this.elementById('ulRightNavbarNav')
        this.divRightNavbar = this.elementById('rightNavbar')
        this.divLeftNavbar = this.elementById('divLeftNavbar')
        this.divSidebarNav = this.elementById('divSidebarNav')
        this.ulSidebar = this.elementById('ulSidebar')
        this.btnLeftClose = this.elementById('btnLeftClose')

        // rightNavBar
        this.divRightNavbar.setAttribute('aria-labelledby', this.btnRightNavbarToggle.id)
        this.btnRightNavbarToggle.setAttribute('data-bs-target', "#" + this.divRightNavbar.id)
        this.btnRightNavbarToggle.setAttribute('aria-controls', this.divRightNavbar.id)
        var btnRightClose: HTMLDivElement = this.elementById('btnRightClose')
        btnRightClose.setAttribute('data-bs-target', "#" + this.divRightNavbar.id)

    }

    private styleNavbar() {
        if (this.navBarExpand) this.addCSSClass(`navbar-expand-${this.navBarExpand}`)
        if (this.navBarDark) {
            this.addCSSClass(`navbar-dark`)
        }
        this.divNavbar.style.backgroundColor = this.bgNavColor
        this.divRightNavbar.style.backgroundColor = this.bgNavColor
        this.divLeftNavbar.style.backgroundColor = this.bgSideColor
        this.divSidebarNav.style.backgroundColor = this.bgSideColor
        this.divLeftNavbar.style.color = this.textSideColor
    }

    public setNavbarBrand(brand: { text: string, href: string }): void {
        this.divNavbarBrand.innerText = brand.text
        this.divNavbarBrand.setAttribute('href', brand.href)
    }

    public addNavItems(listItems: Array<{ text: string, href: string }>): void {
        var id = this.divRightNavbar.id.toString()
        listItems.forEach(item => {
            var divItem = `
            <li class="nav-item">
                <a class="nav-link"
                    aria-current="page"
                    href="${item.href}"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    data-bs-target="#${id}"
                    >
                    ${item.text}
                </a>
            </li>`
            this.ulRightNavbarNav.insertAdjacentHTML("beforeend", divItem)
        })

    }

    public fromList(list: AnchorNavigate) {
        list.list.forEach((item, index) => {
            var id = this.divLeftNavbar.id.toString()
            var li = list.page.createElement('li')
            var a = list.page.createElement('a', item.text)
            this.addListClass(a, [
                'text-decoration-none'
            ])
            this.addListClass(li, [
                'pb-1'
            ])
            a.setAttribute('id', id + "_" + index)
            a.setAttribute('data-bs-dismiss', 'offcanvas')
            a.setAttribute('aria-label', 'Close')
            a.setAttribute('data-bs-target', '#' + id)
            a.setAttribute('data-bs-dismiss', 'offcanvas')
            a.setAttribute('href', '')
            li.appendChild(a)
            this.ulSidebar.appendChild(li)
            item.anchor = list.page.elementById(a.id) as HTMLAnchorElement
        })
        list.navigateBind()

    }

    public bindSidebar(element: Element) {
        var parent = this.divLeftNavbar.parentElement
        parent.removeChild
        element.appendChild(this.divLeftNavbar)

        // leftNavBar   
        this.btnLeftNavbarToggle.setAttribute('data-bs-target', "#" + this.divLeftNavbar.id)
        this.btnLeftNavbarToggle.setAttribute('aria-controls', this.divLeftNavbar.id)
        var btnLeftClose: HTMLDivElement = this.elementById('btnLeftClose')
        btnLeftClose.setAttribute('data-bs-target', "#" + this.divLeftNavbar.id)
    }

    public setCustomPresenter(presenter: ICustomWidgetPresenter<Widget>): void {
        throw new Error("Method not implemented.");
    }
    public value(): string {
        throw new Error("Method not implemented.");
    }
    public setEnabled(enabled: boolean): void {
        this.divNavbar.toggleAttribute('disabled', !enabled)
    }
    public addCSSClass(className: string): void {
        this.divNavbar.classList.add(className)
    }
    public removeCSSClass(className: string): void {
        this.divNavbar.classList.remove(className)
    }
    public applyCSS(propertyName: string, propertyValue: string): void {
        this.divNavbar.style.setProperty(propertyName, propertyValue)
    }
    public setPosition(position: string, marginLeft: string, marginTop: string, marginRight: string, marginBottom: string, transform?: string): void {
        throw new Error("Method not implemented.");
    }
    public setVisible(visible: boolean): void {
        this.divNavbar.toggleAttribute('hidden', !visible)
    }

    public addListClass(element: Element, listClass: Array<string>) {
        listClass.forEach(item => {
            element.classList.add(item)
        })
    }
}

export class AnchorNavigate {

    public page: PageShell
    public select = 0
    public list: Array<{ text: string, view: UIView, anchor?: HTMLAnchorElement }>

    constructor({ page, list = [] }: {
        page: PageShell,
        list: Array<{ text: string, view: UIView, anchor?: HTMLAnchorElement }>
    }) {
        this.page = page
        this.list = list
    }

    navigateBind() {
        var $ = this
        this.list.forEach((item, index) => {
            if (item.anchor != null) {
                item.anchor.onclick = function () {
                    $.select = index
                    $.navigateToView()
                }
            }
        })
    }
    navigateToView() {
        var $ = this
        var item = $.list[$.select]
        if (item != null && item != undefined) {
            $.page.navigateToView(item.view)
        }
    }

}
