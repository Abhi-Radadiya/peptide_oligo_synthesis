import { ADD_SEQUENCE, EDIT_SEQUENCE, DELETE_SEQUENCE } from "./actions";

const initialState = {
    sequence: [],
};

const sequenceReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SEQUENCE:
            return {
                ...state,
                sequence: [...state.sequence, action.payload],
            };

        case EDIT_SEQUENCE:
            return {
                ...state,
                sequence: state.sequence.map((sequence) => {
                    return {
                        ...sequence,
                        block: sequence.id == action.payload.id ? action.payload.updatedSequence.block : sequence.block,
                        name: sequence.id == action.payload.id ? action.payload.updatedSequence.name : sequence.name,
                    };
                }),
            };

        case DELETE_SEQUENCE:
            return {
                ...state,
                sequence: state.sequence.filter((sequence) => sequence.id != action.payload),
            };

        default:
            return state;
    }
};

export default sequenceReducer;
