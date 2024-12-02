export const ADD_SEQUENCE = "ADD_SEQUENCE";
export const EDIT_SEQUENCE = "EDIT_SEQUENCE";
export const DELETE_SEQUENCE = "DELETE_SEQUENCE";

export const addSequence = (sequence) => (dispatch, getState) => {
    const state = getState();
    const existingSequence = state.sequence.find((seq) => seq.name.toLowerCase() === sequence.name.toLowerCase());

    if (existingSequence) {
        throw new Error("Sequence with the same name already exists.");
    }

    dispatch({
        type: ADD_SEQUENCE,
        payload: sequence,
    });
};

export const editSequence = (id, updatedSequence) => ({
    type: EDIT_SEQUENCE,
    payload: { id, updatedSequence },
});

export const deleteSequence = (id) => ({
    type: DELETE_SEQUENCE,
    payload: id,
});
