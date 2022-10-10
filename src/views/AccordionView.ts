import { Row, UIView, ViewLayout } from '../Objective-UI';
import { Accordion } from './../BoostrapComponents';

export class AccordionView extends UIView {
    private static $: AccordionView;

    private list = [
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
    ]
    private accordion = new Accordion({
        name: 'accordion',
        divclass: 'p-1 mx-5',
    })
    private accordionFlush = new Accordion({
        name: 'accordionFlush',
        flush: true,
        divclass: 'rounded p-3 mx-2 bg-dark',
        titleClass: 'bg-primary text-light',
        bodyClass: 'bg-success text-light'
    })
    private accordionAlwaysOpen = new Accordion({
        name: 'accordionAlwaysOpen',
        alwaysOpen: true,
        divclass: 'rounded p-5 mx-5 bg-warning',
        titleClass: 'bg-danger text-light',
        bodyClass: 'bg-secondary text-light'
    })

    constructor() {
        super();
    }
    buildLayout(): ViewLayout {
        return new ViewLayout('exMain', [
            new Row('rowBody', { rowClass: 'p-1' })
        ])
    }
    composeView(): void {
        this.addWidgets('rowBody', this.accordion, this.accordionFlush, this.accordionAlwaysOpen)
    }
    onViewDidLoad(): void {
        this.accordion.setListItems(this.list)
        this.accordionFlush.setListItems(this.list)
        this.accordionAlwaysOpen.setListItems(this.list)
    }

}