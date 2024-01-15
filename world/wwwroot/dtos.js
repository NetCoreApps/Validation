"use strict";
/* Options:
Date: 2024-01-16 01:03:57
Version: 8.01
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://localhost:5001

//GlobalNamespace:
//MakePropertiesOptional: False
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion:
//AddDescriptionAsComments: True
//IncludeTypes:
//ExcludeTypes:
//DefaultImports:
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = exports.Authenticate = exports.UpdateContact = exports.DeleteContact = exports.CreateContact = exports.GetContact = exports.GetContacts = exports.RegisterResponse = exports.AuthenticateResponse = exports.UpdateContactResponse = exports.CreateContactResponse = exports.GetContactResponse = exports.GetContactsResponse = exports.ResponseStatus = exports.ResponseError = exports.Contact = exports.FilmGenres = exports.Title = void 0;
var Title;
(function (Title) {
    Title["Unspecified"] = "Unspecified";
    Title["Mr"] = "Mr";
    Title["Mrs"] = "Mrs";
    Title["Miss"] = "Miss";
})(Title || (exports.Title = Title = {}));
var FilmGenres;
(function (FilmGenres) {
    FilmGenres["Action"] = "Action";
    FilmGenres["Adventure"] = "Adventure";
    FilmGenres["Comedy"] = "Comedy";
    FilmGenres["Drama"] = "Drama";
})(FilmGenres || (exports.FilmGenres = FilmGenres = {}));
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
var RegisterResponse = /** @class */ (function () {
    function RegisterResponse(init) {
        Object.assign(this, init);
    }
    return RegisterResponse;
}());
exports.RegisterResponse = RegisterResponse;
// @Route("/contacts")
var GetContacts = /** @class */ (function () {
    function GetContacts(init) {
        Object.assign(this, init);
    }
    GetContacts.prototype.getTypeName = function () { return 'GetContacts'; };
    GetContacts.prototype.getMethod = function () { return 'GET'; };
    GetContacts.prototype.createResponse = function () { return new GetContactsResponse(); };
    return GetContacts;
}());
exports.GetContacts = GetContacts;
// @Route("/contacts/{Id}")
var GetContact = /** @class */ (function () {
    function GetContact(init) {
        Object.assign(this, init);
    }
    GetContact.prototype.getTypeName = function () { return 'GetContact'; };
    GetContact.prototype.getMethod = function () { return 'GET'; };
    GetContact.prototype.createResponse = function () { return new GetContactResponse(); };
    return GetContact;
}());
exports.GetContact = GetContact;
// @Route("/contacts", "POST")
var CreateContact = /** @class */ (function () {
    function CreateContact(init) {
        Object.assign(this, init);
    }
    CreateContact.prototype.getTypeName = function () { return 'CreateContact'; };
    CreateContact.prototype.getMethod = function () { return 'POST'; };
    CreateContact.prototype.createResponse = function () { return new CreateContactResponse(); };
    return CreateContact;
}());
exports.CreateContact = CreateContact;
// @Route("/contacts/{Id}/delete", "POST")
var DeleteContact = /** @class */ (function () {
    function DeleteContact(init) {
        Object.assign(this, init);
    }
    DeleteContact.prototype.getTypeName = function () { return 'DeleteContact'; };
    DeleteContact.prototype.getMethod = function () { return 'POST'; };
    DeleteContact.prototype.createResponse = function () { };
    return DeleteContact;
}());
exports.DeleteContact = DeleteContact;
// @Route("/contacts/{Id}", "PUT")
var UpdateContact = /** @class */ (function () {
    function UpdateContact(init) {
        Object.assign(this, init);
    }
    UpdateContact.prototype.getTypeName = function () { return 'UpdateContact'; };
    UpdateContact.prototype.getMethod = function () { return 'PUT'; };
    UpdateContact.prototype.createResponse = function () { return new UpdateContactResponse(); };
    return UpdateContact;
}());
exports.UpdateContact = UpdateContact;
/** @description Sign In */
// @Route("/auth", "GET,POST")
// @Route("/auth/{provider}", "POST")
// @Api(Description="Sign In")
// @DataContract
var Authenticate = /** @class */ (function () {
    function Authenticate(init) {
        Object.assign(this, init);
    }
    Authenticate.prototype.getTypeName = function () { return 'Authenticate'; };
    Authenticate.prototype.getMethod = function () { return 'POST'; };
    Authenticate.prototype.createResponse = function () { return new AuthenticateResponse(); };
    return Authenticate;
}());
exports.Authenticate = Authenticate;
/** @description Sign Up */
// @Route("/register", "POST")
// @Api(Description="Sign Up")
// @DataContract
var Register = /** @class */ (function () {
    function Register(init) {
        Object.assign(this, init);
    }
    Register.prototype.getTypeName = function () { return 'Register'; };
    Register.prototype.getMethod = function () { return 'POST'; };
    Register.prototype.createResponse = function () { return new RegisterResponse(); };
    return Register;
}());
exports.Register = Register;
