"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@servicestack/client");
(0, client_1.bootstrap)(); //converts data-invalid attributes into Bootstrap v4 error messages.
(0, client_1.bindHandlers)({
    newUser: function (u) {
        var $ = function (sel) { return document.querySelector(sel); };
        var names = u.split('@');
        $("[name=displayName]").value = (0, client_1.toPascalCase)(names[0]) + " " + (0, client_1.toPascalCase)((0, client_1.splitOnFirst)(names[1], '.')[0]);
        $("[name=email]").value = u;
        $("[name=password]").value = $("[name=confirmPassword]").value = 'p@55wOrd';
    }
});
