import db from '../DB/db.js';
export async function saveProduct(data) {
    try {
        await db('productos').insert(data);
        return;
    } catch (error) {
        throw new Error(error);
    }
}
export async function getProducts() {
    try {
        const messages = await db('productos').select();
        return messages;
    } catch (error) {
        throw new Error(error);
    }
}
export async function deleteProduct(id) {
    try {
        await db('productos').del().where('id', id);
        return;
    } catch (error) {
        throw new Error(error);
    }
}
export async function updateProduct(id, data) {
    try {
        await db('productos').update(data).where('id', id);
        return;
    } catch (error) {
        throw new Error(error);
    }
}