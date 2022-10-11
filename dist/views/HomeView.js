"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.HomeView = void 0;
class HomeView extends UIView {
    constructor() {
        super(...arguments);
        this.homeTitle = new UIHead({ name: 'homeTitle', headType: 'h1', text: 'Componentes BootStrap 5.2' });
        this.homeSubtitle = new UIHead({ name: 'homeSubtitle', headType: 'h2', text: 'Seja bem vindo!' });
        this.homeContent1 = new UIHead({ name: 'homeContent1', headType: 'h5', text: 'Inicie rapidamente um projeto com qualquer um de nossos componentes.' });
        this.homeContent2 = new UIHead({ name: 'homeContent2', headType: 'h6', text: 'Agilize o desenvolvimento de seus Apps.' });
    }
    buildLayout() {
        return new ViewLayout('exMain', [
            new Row('divTitle', {
                rowClass: 'd-flex flex-column text-center py-5',
            }),
            new Row('divContent', {
                rowClass: 'd-flex flex-column text-center flex-grow-1 p-2',
            }),
        ]);
    }
    composeView() {
        this.addWidgets('divTitle', this.homeTitle, this.homeSubtitle);
        this.addWidgets('divContent', this.homeContent1, this.homeContent2);
    }
    onViewDidLoad() {
    }
}
//exports.HomeView = HomeView;
