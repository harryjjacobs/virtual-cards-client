import { TestView } from "./game/view/test-view";
import { ClientController } from "./game/controller/client-controller";

const controller = new ClientController();
const view = new TestView();

view.initialise(() => {
    console.log(view.stage);
});
