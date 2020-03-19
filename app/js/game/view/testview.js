import { createBaseView } from "./view";

export const testView = createBaseView();

testView.initialise(() => {
    console.log(testView.stage);
});
