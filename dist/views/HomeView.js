"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.HomeView = void 0;
class HomeView extends UIView {
    constructor() {
        super(...arguments);
        this.homeText = new UILabel({ name: 'homeText', text: 'Pagina Home, seja bem vindo!' });
    }
    buildLayout() {
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
        ]);
    }
    composeView() {
        this.addWidgets('mainCol', this.homeText);
    }
    onViewDidLoad() {
    }
}
//exports.HomeView = HomeView;
