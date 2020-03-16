import Router from 'koa-router';
import contactStore from './store';

export const router = new Router();

router.get('/', async (ctx) => {
    const response = ctx.response;
    response.body = await contactStore.find({});
    response.status = 200; // ok
});

router.get('/:id', async (ctx) => {
    const contact = await contactStore.findOne({ _id: ctx.params.id });
    const response = ctx.response;
    if (contact) {
        response.body = contact;
        response.status = 200; // ok
    } else {
        response.status = 404; // not found
    }
});

const createContact = async (contact, response) => {
    try {
        response.body = await contactStore.insert(contact);
        response.status = 201; // created
    } catch (err) {
        response.body = { issue: [{ error: err.message }] };
        response.status = 400; // bad request
    }
};

router.post('/', async (ctx) => await createContact(ctx.request.body, ctx.response));

router.put('/:id', async (ctx) => {
    const contact = ctx.request.body;
    const id = ctx.params.id;
    const contactId = contact._id;
    const response = ctx.response;
    if (contactId && contactId !== id) {
        response.body = { issue: [{ error: 'Param id and body _id should be the same' }] };
        response.status = 400; // bad request
        return;
    }
    if (!contactId) {
        await createContact(contact, response);
    } else {
        const updatedCount = await contactStore.update({ _id: id }, contact);
        if (updatedCount === 1) {
            response.body = contact;
            response.status = 200; // ok
        } else {
            response.body = { issue: [{ error: 'Resource no longer exists' }] };
            response.status = 405; // method not allowed
        }
    }
});

router.del('/:id', async (ctx) => {
    await contactStore.remove({ _id: ctx.params.id });
    ctx.response.status = 204; // no content
});
