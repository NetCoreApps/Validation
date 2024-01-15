"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@servicestack/client");
(0, client_1.bootstrapForm)(document.querySelector('form'), {
    success: function (r) {
        location.href = CONTINUE;
    }
});
(0, client_1.bindHandlers)({
    switchUser: function (u) {
        document.querySelector("[name=userName]").value = u;
        document.querySelector("[name=password]").value = 'p@55wOrd';
    }
});
