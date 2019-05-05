import { JsonServiceClient } from '@servicestack/client';
import Vue from 'vue';

export var client = new JsonServiceClient('/');

export {
    errorResponse, errorResponseExcept, splitOnFirst, toPascalCase, queryString
} from '@servicestack/client';

export {
    ResponseStatus, ResponseError,
    Authenticate, AuthenticateResponse,
    Register,
} from '../dtos';

import {
    Authenticate, AuthenticateResponse,
} from '../dtos';

export const redirect = (url:string) => location.href = url || '/client-vue/';

// Shared state between all Components
interface Store {
    isAuthenticated: boolean;
    userSession: AuthenticateResponse | null;
}
export const store:Store = {
    isAuthenticated: false,
    userSession: null,
};

class EventBus extends Vue {
    store = store
}
export var bus = new EventBus({ data: store });

bus.$on('signout', async () => {
    
    bus.$set(store, 'isAuthenticated', false);
    bus.$set(store, 'userSession', null);

    await client.post(new Authenticate({ provider: "logout" }));
});

bus.$on('signin', (userSession:AuthenticateResponse) => {
    bus.$set(store, 'isAuthenticated', true);
    bus.$set(store, 'userSession', userSession);
});

export const checkAuth = async () => {
    try {
        bus.$emit('signin', await client.post(new Authenticate()));
    } catch (e) {
        bus.$emit('signout');
    }
};
