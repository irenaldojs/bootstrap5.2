import { Col, UILabel } from './../Objective-UI';
import { Row, UIView, ViewLayout } from "../Objective-UI";

export class HomeView extends UIView {
    private static $: HomeView;

    private homeText = new UILabel({ name: 'homeText', text: 'Pagina Home, seja bem vindo!' })

    buildLayout(): ViewLayout {
        return new ViewLayout('exMain', [
            new Row('mainRow', {
                rowHeidth: '100%',
                columns: [
                    new Col('mainCol', {
                        colHeight: '100%',
                        colClass: 'd-flex justify-content-center align-items-center fs-1'
                    })
                ]
            })
        ])
    }
    composeView(): void {
        this.addWidgets('mainCol', this.homeText)
    }
    onViewDidLoad(): void {

    }

}
