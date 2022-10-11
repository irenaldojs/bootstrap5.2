"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.AccordionView = void 0;
class AccordionView extends UIView {
    constructor(containerId) {
        super();
        this.mainTitle = new UIHead({ name: 'mainTitle', headType: 'h1', text: 'Accordion (Acordeão)' });
        this.mainSubtitle = new UIHead({ name: 'mainSubtitle', headType: 'h2', text: 'Construa acordeões recolhíveis verticalmente' });
        this.list = [
            {
                title: 'Accordion Item #1',
                text: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow."
            },
            {
                title: 'Accordion Item #2',
                text: "<strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow."
            },
            {
                title: 'Accordion Item #3',
                text: "<strong>This is the third item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow."
            },
        ];
        //  #01
        this.title1 = new UIHead({
            name: 'title1', headType: 'h2',
            text: 'Exemplo'
        });
        this.accordion = new Accordion({
            name: 'accordion',
            divclass: 'p-1',
        });
        this.code1 = new UIHead({
            name: 'code1', headType: 'pre', text: `
        accordion = new Accordion({
            name: 'accordion',
            divclass: 'p-1'
        })
        this.accordion.setListItems([
            {
                title: 'Accordion Item #1',
                text: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow."
            },
            {
                title: 'Accordion Item #2',
                text: "<strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow."
            },
            {
                title: 'Accordion Item #3',
                text: "<strong>This is the third item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow."
            },
        ])
    `
        });
        // #02
        this.title2 = new UIHead({ name: 'title2', headType: 'h2', text: 'Flush (Sem bordas e fundo)' });
        this.subtitle2 = new UIHead({
            name: 'subtitle2', headType: 'p',
            text: 'Remove o padrão background-color, algumas bordas e alguns cantos arredondados para renderizar acordeões de ponta a ponta com seu contêiner pai.'
        });
        this.accordionFlush = new Accordion({
            name: 'accordionFlush',
            flush: true,
            divclass: 'rounded p-3 bg-dark mb-2',
            titleClass: 'bg-primary text-light',
            bodyClass: 'bg-success text-light'
        });
        this.code2 = new CodePre({
            name: 'code2', dark: true, codeClass: 'fs-6', code: `
    accordionFlush = new Accordion({
        name: 'accordionFlush',
        flush: true,
        divclass: 'rounded p-3 bg-dark',
        titleClass: 'bg-primary text-light',
        bodyClass: 'bg-success text-light'
    })
    this.accordionFlush.setListItems([
        {
            title: 'Accordion Item #1',
            text: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow."
        },
        {
            title: 'Accordion Item #2',
            text: "<strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow."
        },
        {
            title: 'Accordion Item #3',
            text: "<strong>This is the third item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow."
        },
    ])
    `
        });
        // #03
        this.title3 = new UIHead({ name: 'title3', headType: 'h2', text: 'Always open (Sempre Aberto)' });
        this.subtitle3 = new UIHead({
            name: 'subtitle3', headType: 'p',
            text: 'Para fazer com que os itens de sanfona permaneçam abertos quando outro item for aberto.'
        });
        this.accordionAlwaysOpen = new Accordion({
            name: 'accordionAlwaysOpen',
            alwaysOpen: true,
            divclass: 'rounded p-1 bg-warning mb-2',
            titleClass: 'bg-danger text-light',
            bodyClass: 'bg-secondary text-light'
        });
        this.code3 = new CodePre({
            name: 'code3', dark: true, codeClass: 'fs-6', code: `
        accordionAlwaysOpen = new Accordion({
            name: 'accordionAlwaysOpen',
            alwaysOpen: true,
            divclass: 'rounded p-1 mx-1 bg-warning',
            titleClass: 'bg-danger text-light',
            bodyClass: 'bg-secondary text-light'
        })
        this.accordionAlwaysOpen.setListItems([
            {
                title: 'Accordion Item #1',
                text: "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow."
            },
            {
                title: 'Accordion Item #2',
                text: "<strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow."
            },
            {
                title: 'Accordion Item #3',
                text: "<strong>This is the third item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow."
            },
        ])
    `
        });
        this.containerId = containerId;
    }
    buildLayout() {
        return new ViewLayout(this.containerId, [
            new Row('divTitle', {
                rowClass: 'd-flex flex-column text-center py-5',
            }),
            new Row('ex1', { rowClass: 'p-1 my-5' }),
            new Row('ex2', { rowClass: 'p-1 my-5' }),
            new Row('ex3', { rowClass: 'p-1 my-5' }),
        ]);
    }
    composeView() {
        this.addWidgets('divTitle', this.mainTitle, this.mainSubtitle);
        this.addWidgets('ex1', this.title1, this.accordion, this.code1);
        this.addWidgets('ex2', this.title2, this.subtitle2, this.accordionFlush, this.code2);
        this.addWidgets('ex3', this.title3, this.subtitle3, this.accordionAlwaysOpen, this.code3);
    }
    onViewDidLoad() {
        this.accordion.setListItems(this.list);
        this.accordionFlush.setListItems(this.list);
        this.accordionAlwaysOpen.setListItems(this.list);
        this.styleDivs();
    }
    styleDivs() {
        var widgets = [
            this.code1,
            this.code2,
            this.code3
        ];
        widgets.forEach(item => {
            item.addCSSClass('mt-2');
            item.addCSSClass('text-light');
            item.addCSSClass('bg-dark');
        });
    }
}
//exports.AccordionView = AccordionView;
