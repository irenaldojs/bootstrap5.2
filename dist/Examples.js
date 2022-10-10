"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Examples = void 0;
class Examples extends UIView {
    constructor() {
        super();
        this.exNavbar = new NavbarOffcanvasSidebar({
            name: 'exNavbar',
            navBarExpand: 'lg',
            navBarDark: true,
            bgNavColor: '#4c0bce',
            bgSideColor: '#c8c8fa',
        });
        this.navigateList = [
            { title: 'Accordion', view: new AccordionView }
        ];
        Examples.$ = this;
    }
    buildLayout() {
        return new ViewLayout('app').fromHTML(`
            <div class="p-0 d-flex flex-column h-100">
                <header id="exHeader"></header>
                <div id="exContainer" class="col-12 d-flex flex-row flex-fill">
                    <aside id="exAside" class="col-lg-2 d-sm-block p-lg-3"></aside>
                    <main id="exMain" class="col-12 col-lg-10"></main>
                </div>
                <footer id="exFooter"></footer>
            <div>
        `);
    }
    composeView() {
        this.addWidgets('exHeader', this.exNavbar);
    }
    onViewDidLoad() {
        var $ = this.shellPage;
        this.exContainer = $.elementById('exContainer');
        this.exAside = $.elementById('exAside');
        this.exAside.style.backgroundColor = '#c8c8fa';
        this.exAside.style.height = '100%';
        this.exNavbar.setNavbarBrand({ text: 'Exemplo', href: '/' });
        this.exNavbar.addNavItems([
            { text: 'Home', href: '#exHeader' },
            { text: 'Link', href: '#exFooter' },
        ]);
        this.exNavbar.bindSidebar(this.exAside);
        this.shellPage.navigateToView(new HomeView);
        this.bindLinks();
    }
    bindLinks() {
        var $ = Examples.$;
        var list = this.navigateList.map(item => {
            return new AnchorNavigate({ text: item.title, page: $.shellPage, view: item.view });
        });
        $.exNavbar.fromList(list);
    }
}
//exports.Examples = Examples;
