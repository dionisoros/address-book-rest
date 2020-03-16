import Router from 'koa-router';
import userStore from '../auth/store';

export const router = new Router();

router.get('/', async (ctx) => {
    const response = ctx.response;
    response.body = await userStore.find({});
    response.status = 200; // ok
});

router.get('/:id', async (ctx) => {
    const user = await userStore.findOne({ _id: ctx.params.id });
    const response = ctx.response;
    if (user) {
        response.body = user;
        response.status = 200; // ok
    } else {
        response.status = 404; // not found
    }
});

const createUser = async (user, response) => {
    try {
        response.body = await userStore.insert(user);
        response.status = 201; // created
    } catch (err) {
        response.body = { issue: [{ error: err.message }] };
        response.status = 400; // bad request
    }
};

router.post('/', async (ctx) => await createUser(ctx.request.body, ctx.response));

router.put('/:id', async (ctx) => {
    const user = ctx.request.body;
    const id = ctx.params.id;
    const userId = user._id;
    const response = ctx.response;
    if (userId && userId !== id) {
        response.body = { issue: [{ error: 'Param id and body _id should be the same' }] };
        response.status = 400; // bad request
        return;
    }
    if (!userId) {
        await createUser(user, response);
    } else {
        const updatedCount = await userStore.update({ _id: id }, user);
        if (updatedCount === 1) {
            response.body = user;
            response.status = 200; // ok
        } else {
            response.body = { issue: [{ error: 'Resource no longer exists' }] };
            response.status = 405; // method not allowed
        }
    }
});

router.del('/:id', async (ctx) => {
    await userStore.remove({ _id: ctx.params.id });
    ctx.response.status = 204; // no content
});
