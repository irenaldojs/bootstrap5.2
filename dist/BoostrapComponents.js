"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.AnchorNavigate = //exports.NavbarOffcanvasSidebar = //exports.NavbarOffcanvas = //exports.NavbarCollapse = //exports.Accordion = void 0;
class Accordion extends Widget {
    constructor({ name, listItems = [], flush = false, alwaysOpen = false, divclass = '', titleClass = '', bodyClass = '' }) {
        super(name);
        this.listItems = listItems;
        this.flush = flush;
        this.alwaysOpen = alwaysOpen;
        this.divClass = divclass;
        this.titleClass = titleClass;
        this.bodyClass = bodyClass;
    }
    htmlTemplate() {
        return `<div class="accordion" id="divAccordion">         
                 </div>`;
    }
    onWidgetDidLoad() {
        this.divAccordion = this.elementById('divAccordion');
        if (this.flush)
            this.divAccordion.classList.add('accordion-flush');
        this.addListClass(this.divAccordion, this.divClass.split(' '));
    }
    setListItems(items) {
        this.listItems = items;
        this.updateItems();
    }
    updateItems() {
        this.divAccordion.textContent = null;
        this.listItems.forEach((item, index) => {
            var id_div = index + '_' + this.divAccordion.id;
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
            `;
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
            `;
            if (this.alwaysOpen)
                this.divAccordion.insertAdjacentHTML('beforeend', body_div_alwaysOpen);
            else
                this.divAccordion.insertAdjacentHTML('beforeend', body_div);
        });
    }
    setCustomPresenter(presenter) {
        throw new Error("Method not implemented.");
    }
    value() {
        throw new Error("Method not implemented.");
    }
    setEnabled(enabled) {
        throw new Error("Method not implemented.");
    }
    addCSSClass(className) {
        this.divAccordion.classList.add(className);
    }
    removeCSSClass(className) {
        this.divAccordion.classList.remove(className);
    }
    applyCSS(propertyName, propertyValue) {
        this.divAccordion.style.setProperty(propertyName, propertyValue);
    }
    setPosition(position, marginLeft, marginTop, marginRight, marginBottom, transform) {
        throw new Error("Method not implemented.");
    }
    setVisible(visible) {
        this.divAccordion.toggleAttribute('Hidden', !visible);
    }
    addListClass(element, listClass) {
        listClass.forEach(item => {
            if (!item)
                return;
            element.classList.add(item);
        });
    }
}
//exports.Accordion = Accordion;
class NavbarCollapse extends Widget {
    constructor({ name, navBarExpand, navbarBrand, navBarDark = false, }) {
        super(name);
        this.navBarExpand = navBarExpand;
        this.navbarBrand = navbarBrand;
        this.navBarDark = navBarDark;
    }
    htmlTemplate() {
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
        </nav>`;
    }
    onWidgetDidLoad() {
        this.divNavbar = this.elementById('divNavbar');
        this.btnNavbar = this.elementById('btnNavbar');
        this.divNavbarBrand = this.elementById('divNavbarBrand');
        this.divNavbarNav = this.elementById('divNavbarNav');
        this.collapseNavbar = this.elementById('collapseNavbar');
        if (this.navBarExpand)
            this.addCSSClass(`navbar-expand-${this.navBarExpand}`);
        if (this.navBarDark)
            this.addCSSClass(`navbar-dark`);
        this.btnNavbar.setAttribute('data-bs-target', '#' + this.collapseNavbar.id);
        this.btnNavbar.setAttribute('aria-controls', this.collapseNavbar.id);
        this.setNavbarBrand();
    }
    setNavbarBrand() {
        if (this.navbarBrand) {
            this.divNavbarBrand.innerText = this.navbarBrand.text;
            this.divNavbarBrand.setAttribute('href', this.navbarBrand.href);
        }
        else {
            this.divNavbarBrand.toggleAttribute('hidden', true);
        }
    }
    setNavItem(navItem) {
        var item = `
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="${navItem.href}">
                    ${navItem.text}
                </a>
            </li>`;
        console.log(item);
        this.divNavbarNav.insertAdjacentHTML("beforeend", item);
    }
    setCustomPresenter(presenter) {
        throw new Error("Method not implemented.");
    }
    value() {
        throw new Error("Method not implemented.");
    }
    setEnabled(enabled) {
        this.divNavbar.toggleAttribute('disabled', !enabled);
    }
    addCSSClass(className) {
        this.divNavbar.classList.add(className);
    }
    removeCSSClass(className) {
        this.divNavbar.classList.remove(className);
    }
    applyCSS(propertyName, propertyValue) {
        this.divNavbar.style.setProperty(propertyName, propertyValue);
    }
    setPosition(position, marginLeft, marginTop, marginRight, marginBottom, transform) {
        throw new Error("Method not implemented.");
    }
    setVisible(visible) {
        this.divNavbar.toggleAttribute('hidden', !visible);
    }
}
//exports.NavbarCollapse = NavbarCollapse;
class NavbarOffcanvas extends Widget {
    constructor({ name, navBarExpand, navbarBrand, navBarDark = false, offcanvasNavbarLabelTitle, }) {
        super(name);
        this.navBarExpand = navBarExpand;
        this.navbarBrand = navbarBrand;
        this.navBarDark = navBarDark;
        this.offcanvasNavbarLabelTitle = offcanvasNavbarLabelTitle;
    }
    htmlTemplate() {
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
        </nav>`;
    }
    onWidgetDidLoad() {
        this.bindDivs();
        this.styleNavbar();
        this.setNavbarBrand();
    }
    bindDivs() {
        this.divNavbar = this.elementById('divNavbar');
        this.btnNavbar = this.elementById('btnNavbar');
        this.divNavbarBrand = this.elementById('divNavbarBrand');
        this.offcanvasNavbar = this.elementById('offcanvasNavbar');
        this.offcanvasNavbarNav = this.elementById('offcanvasNavbarNav');
        this.offcanvasNavbarLabel = this.elementById('offcanvasNavbarLabel');
        this.btnNavbar.setAttribute('data-bs-target', '#' + this.offcanvasNavbar.id);
        this.btnNavbar.setAttribute('aria-controls', this.offcanvasNavbar.id);
    }
    styleNavbar() {
        var _a;
        if (this.navBarExpand)
            this.addCSSClass(`navbar-expand-${this.navBarExpand}`);
        if (this.navBarDark)
            this.addCSSClass(`navbar-dark`);
        this.offcanvasNavbarLabel.innerText = (_a = this.offcanvasNavbarLabelTitle) !== null && _a !== void 0 ? _a : '';
    }
    setNavbarBrand() {
        if (this.navbarBrand) {
            this.divNavbarBrand.innerText = this.navbarBrand.text;
            this.divNavbarBrand.setAttribute('href', this.navbarBrand.href);
        }
        else {
            this.divNavbarBrand.toggleAttribute('hidden', true);
        }
    }
    setNavItem(navItem) {
        var item = `
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="${navItem.href}">
                    ${navItem.text}
                </a>
            </li>`;
        this.offcanvasNavbarNav.insertAdjacentHTML("beforeend", item);
    }
    setCustomPresenter(presenter) {
        throw new Error("Method not implemented.");
    }
    value() {
        throw new Error("Method not implemented.");
    }
    setEnabled(enabled) {
        this.divNavbar.toggleAttribute('disabled', !enabled);
    }
    addCSSClass(className) {
        this.divNavbar.classList.add(className);
    }
    removeCSSClass(className) {
        this.divNavbar.classList.remove(className);
    }
    applyCSS(propertyName, propertyValue) {
        this.divNavbar.style.setProperty(propertyName, propertyValue);
    }
    setPosition(position, marginLeft, marginTop, marginRight, marginBottom, transform) {
        throw new Error("Method not implemented.");
    }
    setVisible(visible) {
        this.divNavbar.toggleAttribute('hidden', !visible);
    }
}
//exports.NavbarOffcanvas = NavbarOffcanvas;
class NavbarOffcanvasSidebar extends Widget {
    constructor({ name, navBarExpand = 'lg', navBarDark = false, bgNavColor = "#fff", bgSideColor = "#fff", textSideColor = "#000" }) {
        super(name);
        this.navBarExpand = navBarExpand;
        this.navBarDark = navBarDark;
        this.bgNavColor = bgNavColor;
        this.bgSideColor = bgSideColor;
        this.textSideColor = textSideColor;
    }
    htmlTemplate() {
        return `
            <nav id="divNavbar" class="navbar">
                <div id="divContainer" class="container-fluid flex-wrap px-${this.navBarExpand}-3">
                    <button id="btnLeftNavbarToggle" class="navbar-toggler p-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#bdSidebar" aria-controls="bdSidebar" aria-label="Toggle docs navigation">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </button>
                    <a id="divNavbarBrand" class="navbar-brand p-0 me-0 me-${this.navBarExpand}-2" href="/" aria-label="Bootstrap">
                    </a>
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
                        <div class="offcanvas-body p-4 pt-0 p-${this.navBarExpand}-0">
                            <ul id="ulRightNavbarNav" class="navbar-nav flex-wrap ms-md-start"></ul>
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
        `;
    }
    onWidgetDidLoad() {
        this.bindDivs();
        this.styleNavbar();
    }
    bindDivs() {
        this.divNavbar = this.elementById('divNavbar');
        this.divContainer = this.elementById('divContainer');
        this.divNavbarBrand = this.elementById('divNavbarBrand');
        this.btnLeftNavbarToggle = this.elementById('btnLeftNavbarToggle');
        this.btnRightNavbarToggle = this.elementById('btnRightNavbarToggle');
        this.ulRightNavbarNav = this.elementById('ulRightNavbarNav');
        this.divRightNavbar = this.elementById('rightNavbar');
        this.divLeftNavbar = this.elementById('divLeftNavbar');
        this.divSidebarNav = this.elementById('divSidebarNav');
        this.ulSidebar = this.elementById('ulSidebar');
        this.btnLeftClose = this.elementById('btnLeftClose');
        // rightNavBar
        this.divRightNavbar.setAttribute('aria-labelledby', this.btnRightNavbarToggle.id);
        this.btnRightNavbarToggle.setAttribute('data-bs-target', "#" + this.divRightNavbar.id);
        this.btnRightNavbarToggle.setAttribute('aria-controls', this.divRightNavbar.id);
        var btnRightClose = this.elementById('btnRightClose');
        btnRightClose.setAttribute('data-bs-target', "#" + this.divRightNavbar.id);
    }
    styleNavbar() {
        if (this.navBarExpand)
            this.addCSSClass(`navbar-expand-${this.navBarExpand}`);
        if (this.navBarDark) {
            this.addCSSClass(`navbar-dark`);
        }
        this.divNavbar.style.backgroundColor = this.bgNavColor;
        this.divRightNavbar.style.backgroundColor = this.bgNavColor;
        this.divLeftNavbar.style.backgroundColor = this.bgSideColor;
        this.divSidebarNav.style.backgroundColor = this.bgSideColor;
        this.divLeftNavbar.style.color = this.textSideColor;
    }
    setNavbarBrand(brand) {
        this.divNavbarBrand.innerText = brand.text;
        this.divNavbarBrand.setAttribute('href', brand.href);
    }
    addNavItems(listItems) {
        var id = this.divRightNavbar.id.toString();
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
            </li>`;
            this.ulRightNavbarNav.insertAdjacentHTML("beforeend", divItem);
        });
    }
    fromList(items) {
        items.forEach(item => {
            var id = this.divLeftNavbar.id.toString();
            var li = item.page.createElement('li');
            var a = item.page.createElement('a', item.text);
            this.addListClass(a, [
                'text-decoration-none'
            ]);
            this.addListClass(li, [
                'pb-1'
            ]);
            a.setAttribute('data-bs-dismiss', 'offcanvas');
            a.setAttribute('aria-label', 'Close');
            a.setAttribute('data-bs-target', '#' + id);
            a.setAttribute('data-bs-dismiss', 'offcanvas');
            a.setAttribute('href', '');
            li.appendChild(a);
            item.setAnchor(a);
            a.onclick = item.onClick.bind(item);
            this.ulSidebar.appendChild(li);
        });
    }
    bindSidebar(element) {
        var parent = this.divLeftNavbar.parentElement;
        parent.removeChild;
        element.appendChild(this.divLeftNavbar);
        // leftNavBar   
        this.btnLeftNavbarToggle.setAttribute('data-bs-target', "#" + this.divLeftNavbar.id);
        this.btnLeftNavbarToggle.setAttribute('aria-controls', this.divLeftNavbar.id);
        var btnLeftClose = this.elementById('btnLeftClose');
        btnLeftClose.setAttribute('data-bs-target', "#" + this.divLeftNavbar.id);
    }
    setCustomPresenter(presenter) {
        throw new Error("Method not implemented.");
    }
    value() {
        throw new Error("Method not implemented.");
    }
    setEnabled(enabled) {
        this.divNavbar.toggleAttribute('disabled', !enabled);
    }
    addCSSClass(className) {
        this.divNavbar.classList.add(className);
    }
    removeCSSClass(className) {
        this.divNavbar.classList.remove(className);
    }
    applyCSS(propertyName, propertyValue) {
        this.divNavbar.style.setProperty(propertyName, propertyValue);
    }
    setPosition(position, marginLeft, marginTop, marginRight, marginBottom, transform) {
        throw new Error("Method not implemented.");
    }
    setVisible(visible) {
        this.divNavbar.toggleAttribute('hidden', !visible);
    }
    addListClass(element, listClass) {
        listClass.forEach(item => {
            element.classList.add(item);
        });
    }
}
//exports.NavbarOffcanvasSidebar = NavbarOffcanvasSidebar;
class AnchorNavigate {
    constructor({ text, page, view }) {
        this.text = text,
            this.page = page,
            this.view = view;
    }
    setAnchor(a) {
        this.anchor = a;
    }
    onClick() {
        this.page.navigateToView(this.view);
        if (this.active) {
            this.anchor.classList.remove('active');
        }
        else {
            this.anchor.classList.add('active');
        }
        this.active = !this.active;
    }
}
//exports.AnchorNavigate = AnchorNavigate;
