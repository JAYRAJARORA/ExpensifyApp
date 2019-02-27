import uuid from 'uuid';

// ADD_EXPENSE
export const addExpense = (
    {
        description = '',
        note = '',
        createdAt = 0,
        amount = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// Remove expense
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// edit expense
export const editExpense = (id, updates)  => ({
    type: 'EDIT_EXPENSE',
    updates,
    id
});