import { AnchorNavigate, NavbarOffcanvasSidebar } from "./BoostrapComponents";
import { UIView, ViewLayout } from "./Objective-UI"
import { AccordionView } from "./views/AccordionView";
import { HomeView } from "./views/HomeView";

export class Examples extends UIView {
    private static $: Examples;

    exHeader: HTMLDivElement
    exContainer: HTMLDivElement
    exAside: HTMLDivElement
    exMain: HTMLDivElement
    exFooter: HTMLDivElement

    exNavbar = new NavbarOffcanvasSidebar({
        name: 'exNavbar',
        navBarExpand: 'lg',
        navBarDark: true,
        bgNavColor: '#4c0bce',
        bgSideColor: '#c8c8fa',
    })
    navigateList: Array<{ title: string, view: UIView }> = [
        { title: 'Accordion', view: new AccordionView }
    ]
    constructor() {
        super();
        Examples.$ = this
    }

    buildLayout(): ViewLayout {
        return new ViewLayout('app').fromHTML(`
            <div class="p-0 d-flex flex-column h-100">
                <header id="exHeader"></header>
                <div id="exContainer" class="col-12 d-flex flex-row flex-fill">
                    <aside id="exAside" class="col-lg-2 d-sm-block p-lg-3"></aside>
                    <main id="exMain" class="col-12 col-lg-10"></main>
                </div>
                <footer id="exFooter"></footer>
            <div>
        `)
    }
    composeView(): void {
        this.addWidgets('exHeader', this.exNavbar)
    }

    onViewDidLoad(): void {
        var $ = this.shellPage

        this.exContainer = $.elementById('exContainer') as HTMLDivElement
        this.exAside = $.elementById('exAside') as HTMLDivElement
        this.exAside.style.backgroundColor = '#c8c8fa'
        this.exAside.style.height = '100%'
        this.exNavbar.setNavbarBrand({ text: 'Exemplo', href: '/' })
        this.exNavbar.addNavItems([
            { text: 'Home', href: '#exHeader' },
            { text: 'Link', href: '#exFooter' },
        ])

        this.exNavbar.bindSidebar(this.exAside)
        this.shellPage.navigateToView(new HomeView)
        this.bindLinks()
    }

    bindLinks() {
        var $ = Examples.$

        var list = this.navigateList.map(item => {
            return new AnchorNavigate({ text: item.title, page: $.shellPage, view: item.view })
        })

        $.exNavbar.fromList(list)
    }


}
