import { state } from "../model/state/state";
import { stateUpdateOperation } from "./state-update-operation";

export const handleUpdateMessage = operation => {
    // TODO: check message validity
    let newState = stateUpdateOperation.perform(state, operation);

    // Check hash descrepancy
    

    state = newState;
}