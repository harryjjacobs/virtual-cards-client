import * as hash from "object-hash";
import { traverse } from "../../utils/traverse";
import { simpleDeepClone } from "../../utils/deep-clone";
import { isArray } from "../../utils/array";

const MOVE = 'M';   // Movement of position of property
const ADD = 'A';    // Addition of new property
const DELETE = 'D'; // Deletion of property
const UPDATE = 'U'; // Change to value

const StateUpdateOperation = function(type) {
    this.type = type;
    this.timestamp;
    this.stateHash;
};

const findPropertyById = (obj, id) => {
    let result = null;
    traverse(obj, (key, value, parent) => {
        if (value.hasOwnProperty('id') && value.id == id) {
            result = {
                key: key,
                value: value,
                parent: parent
            };
        }
    })
    return result;
};

export const stateUpdateOperation = {
    create: {
        /**
         * Creates a state update operation for moving
         * a state property
         * @param {The state} state 
         * @param {The id of the property to move} propId 
         * @param {The id of the parent property to move it into} destId 
         */
        moveOperation: function (state, propId, destId, destKey) {
            operation = new StateUpdateOperation(MOVE);
            operation.src = propId;
            operation.dst = destId;
            operation.key = destKey;
            // TODO: hash the state after performing operation on it
            operation.stateHash = hash(state);
            return operation;
        },
    },
    perform: function(state, operation)  {
        let newState = simpleDeepClone(state);

        // Carefully add a property to an object, taking
        // care not to overwrite and appending to array
        // instead where appropriate.
        const addPropertyToObject = (prop, dst, key) => {
            if (key in dst) {
                // Append to existing array
                if (isArray(dst[key])) {
                    dst[key].push(prop);
                } else {
                    console.error("State Update operation would cause an overwrite.");
                }
            } else {
                // Write new key in property
                dst[key] = prop;
            }
        }
        
        // Parse and perform the operation
        switch (operation.type) {
            case MOVE:
                // Find the property in the state
                let srcPropInfo = findPropertyById(newState, operation.src);
                let dstPropInfo = findPropertyById(newState, operation.dst);
                // Copy prop
                let prop = propData.value;
                // Delete from previous location
                delete propData.parent[propData.key];
                // Move to new location
                let dst = dstPropInfo.parent[dstPropInfo.key];
                addPropertyToObject(prop, dst, operation.key);
                break;
            case ADD:
                let dstPropInfo = findPropertyById(newState, operation.dst);
                let dst = dstPropInfo.parent[dstPropInfo.key];
                addPropertyToObject(operation.value, dst, operation.key);
                break;
            case DELETE:
                // TODO
                break;
            case UPDATE:
                // TODO
                break;
            default:
                break;
        }
        return newState;
    }
};