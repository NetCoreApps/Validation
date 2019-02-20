"use strict";
/* Options:
Date: 2019-02-18 13:54:45
Version: 5.41
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://localhost:5000

//GlobalNamespace:
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion:
//AddDescriptionAsComments: True
//IncludeTypes:
//ExcludeTypes:
//DefaultImports:
*/
Object.defineProperty(exports, "__esModule", { value: true });
var Title;
(function (Title) {
    Title["Unspecified"] = "Unspecified";
    Title["Mr"] = "Mr";
    Title["Mrs"] = "Mrs";
    Title["Miss"] = "Miss";
})(Title = exports.Title || (exports.Title = {}));
var Contact = /** @class */ (function () {
    function Contact(init) {
        Object.assign(this, init);
    }
    return Contact;
}());
exports.Contact = Contact;
// @DataContract
var ResponseError = /** @class */ (function () {
    function ResponseError(init) {
        Object.assign(this, init);
    }
    return ResponseError;
}());
exports.ResponseError = ResponseError;
// @DataContract
var ResponseStatus = /** @class */ (function () {
    function ResponseStatus(init) {
        Object.assign(this, init);
    }
    return ResponseStatus;
}());
exports.ResponseStatus = ResponseStatus;
var FilmGenres;
(function (FilmGenres) {
    FilmGenres["Action"] = "Action";
    FilmGenres["Adventure"] = "Adventure";
    FilmGenres["Comedy"] = "Comedy";
    FilmGenres["Drama"] = "Drama";
})(FilmGenres = exports.FilmGenres || (exports.FilmGenres = {}));
var GetContactsResponse = /** @class */ (function () {
    function GetContactsResponse(init) {
        Object.assign(this, init);
    }
    return GetContactsResponse;
}());
exports.GetContactsResponse = GetContactsResponse;
var GetContactResponse = /** @class */ (function () {
    function GetContactResponse(init) {
        Object.assign(this, init);
    }
    return GetContactResponse;
}());
exports.GetContactResponse = GetContactResponse;
var CreateContactResponse = /** @class */ (function () {
    function CreateContactResponse(init) {
        Object.assign(this, init);
    }
    return CreateContactResponse;
}());
exports.CreateContactResponse = CreateContactResponse;
var UpdateContactResponse = /** @class */ (function () {
    function UpdateContactResponse(init) {
        Object.assign(this, init);
    }
    return UpdateContactResponse;
}());
exports.UpdateContactResponse = UpdateContactResponse;
// @DataContract
var AuthenticateResponse = /** @class */ (function () {
    function AuthenticateResponse(init) {
        Object.assign(this, init);
    }
    return AuthenticateResponse;
}());
exports.AuthenticateResponse = AuthenticateResponse;
// @DataContract
var AssignRolesResponse = /** @class */ (function () {
    function AssignRolesResponse(init) {
        Object.assign(this, init);
    }
    return AssignRolesResponse;
}());
exports.AssignRolesResponse = AssignRolesResponse;
// @DataContract
var UnAssignRolesResponse = /** @class */ (function () {
    function UnAssignRolesResponse(init) {
        Object.assign(this, init);
    }
    return UnAssignRolesResponse;
}());
exports.UnAssignRolesResponse = UnAssignRolesResponse;
// @DataContract
var RegisterResponse = /** @class */ (function () {
    function RegisterResponse(init) {
        Object.assign(this, init);
    }
    return RegisterResponse;
}());
exports.RegisterResponse = RegisterResponse;
// @Route("/contacts", "GET")
var GetContacts = /** @class */ (function () {
    function GetContacts(init) {
        Object.assign(this, init);
    }
    GetContacts.prototype.createResponse = function () { return new GetContactsResponse(); };
    GetContacts.prototype.getTypeName = function () { return 'GetContacts'; };
    return GetContacts;
}());
exports.GetContacts = GetContacts;
// @Route("/contacts/{Id}", "GET")
var GetContact = /** @class */ (function () {
    function GetContact(init) {
        Object.assign(this, init);
    }
    GetContact.prototype.createResponse = function () { return new GetContactResponse(); };
    GetContact.prototype.getTypeName = function () { return 'GetContact'; };
    return GetContact;
}());
exports.GetContact = GetContact;
// @Route("/contacts", "POST")
var CreateContact = /** @class */ (function () {
    function CreateContact(init) {
        Object.assign(this, init);
    }
    CreateContact.prototype.createResponse = function () { return new CreateContactResponse(); };
    CreateContact.prototype.getTypeName = function () { return 'CreateContact'; };
    return CreateContact;
}());
exports.CreateContact = CreateContact;
// @Route("/contacts/{Id}", "DELETE")
// @Route("/contacts/{Id}/delete", "POST")
var DeleteContact = /** @class */ (function () {
    function DeleteContact(init) {
        Object.assign(this, init);
    }
    DeleteContact.prototype.createResponse = function () { };
    DeleteContact.prototype.getTypeName = function () { return 'DeleteContact'; };
    return DeleteContact;
}());
exports.DeleteContact = DeleteContact;
// @Route("/contacts/{Id}", "POST PUT")
var UpdateContact = /** @class */ (function () {
    function UpdateContact(init) {
        Object.assign(this, init);
    }
    UpdateContact.prototype.createResponse = function () { return new UpdateContactResponse(); };
    UpdateContact.prototype.getTypeName = function () { return 'UpdateContact'; };
    return UpdateContact;
}());
exports.UpdateContact = UpdateContact;
// @Route("/auth")
// @Route("/auth/{provider}")
// @Route("/authenticate")
// @Route("/authenticate/{provider}")
// @DataContract
var Authenticate = /** @class */ (function () {
    function Authenticate(init) {
        Object.assign(this, init);
    }
    Authenticate.prototype.createResponse = function () { return new AuthenticateResponse(); };
    Authenticate.prototype.getTypeName = function () { return 'Authenticate'; };
    return Authenticate;
}());
exports.Authenticate = Authenticate;
// @Route("/assignroles")
// @DataContract
var AssignRoles = /** @class */ (function () {
    function AssignRoles(init) {
        Object.assign(this, init);
    }
    AssignRoles.prototype.createResponse = function () { return new AssignRolesResponse(); };
    AssignRoles.prototype.getTypeName = function () { return 'AssignRoles'; };
    return AssignRoles;
}());
exports.AssignRoles = AssignRoles;
// @Route("/unassignroles")
// @DataContract
var UnAssignRoles = /** @class */ (function () {
    function UnAssignRoles(init) {
        Object.assign(this, init);
    }
    UnAssignRoles.prototype.createResponse = function () { return new UnAssignRolesResponse(); };
    UnAssignRoles.prototype.getTypeName = function () { return 'UnAssignRoles'; };
    return UnAssignRoles;
}());
exports.UnAssignRoles = UnAssignRoles;
// @Route("/register")
// @DataContract
var Register = /** @class */ (function () {
    function Register(init) {
        Object.assign(this, init);
    }
    Register.prototype.createResponse = function () { return new RegisterResponse(); };
    Register.prototype.getTypeName = function () { return 'Register'; };
    return Register;
}());
exports.Register = Register;
//# sourceMappingURL=dtos.js.map