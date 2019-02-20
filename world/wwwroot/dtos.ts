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


export interface IReturn<T>
{
    createResponse(): T;
}

export interface IReturnVoid
{
    createResponse(): void;
}

export interface IHasSessionId
{
    sessionId: string;
}

export interface IHasBearerToken
{
    bearerToken: string;
}

export interface IPost
{
}

export enum Title
{
    Unspecified = 'Unspecified',
    Mr = 'Mr',
    Mrs = 'Mrs',
    Miss = 'Miss',
}

export class Contact
{
    public constructor(init?:Partial<Contact>) { (<any>Object).assign(this, init); }
    public id: number;
    public userAuthId: number;
    public title: Title;
    public name: string;
    public color: string;
    public filmGenres: FilmGenres[];
    public age: number;
}

// @DataContract
export class ResponseError
{
    public constructor(init?:Partial<ResponseError>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1, EmitDefaultValue=false)
    public errorCode: string;

    // @DataMember(Order=2, EmitDefaultValue=false)
    public fieldName: string;

    // @DataMember(Order=3, EmitDefaultValue=false)
    public message: string;

    // @DataMember(Order=4, EmitDefaultValue=false)
    public meta: { [index:string]: string; };
}

// @DataContract
export class ResponseStatus
{
    public constructor(init?:Partial<ResponseStatus>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public message: string;

    // @DataMember(Order=3)
    public stackTrace: string;

    // @DataMember(Order=4)
    public errors: ResponseError[];

    // @DataMember(Order=5)
    public meta: { [index:string]: string; };
}

export enum FilmGenres
{
    Action = 'Action',
    Adventure = 'Adventure',
    Comedy = 'Comedy',
    Drama = 'Drama',
}

export class GetContactsResponse
{
    public constructor(init?:Partial<GetContactsResponse>) { (<any>Object).assign(this, init); }
    public results: Contact[];
    public responseStatus: ResponseStatus;
}

export class GetContactResponse
{
    public constructor(init?:Partial<GetContactResponse>) { (<any>Object).assign(this, init); }
    public result: Contact;
    public responseStatus: ResponseStatus;
}

export class CreateContactResponse
{
    public constructor(init?:Partial<CreateContactResponse>) { (<any>Object).assign(this, init); }
    public result: Contact;
    public responseStatus: ResponseStatus;
}

export class UpdateContactResponse
{
    public constructor(init?:Partial<UpdateContactResponse>) { (<any>Object).assign(this, init); }
    public responseStatus: ResponseStatus;
}

// @DataContract
export class AuthenticateResponse implements IHasSessionId, IHasBearerToken
{
    public constructor(init?:Partial<AuthenticateResponse>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public referrerUrl: string;

    // @DataMember(Order=6)
    public bearerToken: string;

    // @DataMember(Order=7)
    public refreshToken: string;

    // @DataMember(Order=8)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=9)
    public meta: { [index:string]: string; };
}

// @DataContract
export class AssignRolesResponse
{
    public constructor(init?:Partial<AssignRolesResponse>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public allRoles: string[];

    // @DataMember(Order=2)
    public allPermissions: string[];

    // @DataMember(Order=3)
    public responseStatus: ResponseStatus;
}

// @DataContract
export class UnAssignRolesResponse
{
    public constructor(init?:Partial<UnAssignRolesResponse>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public allRoles: string[];

    // @DataMember(Order=2)
    public allPermissions: string[];

    // @DataMember(Order=3)
    public responseStatus: ResponseStatus;
}

// @DataContract
export class RegisterResponse
{
    public constructor(init?:Partial<RegisterResponse>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=7)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public referrerUrl: string;

    // @DataMember(Order=5)
    public bearerToken: string;

    // @DataMember(Order=6)
    public refreshToken: string;

    // @DataMember(Order=8)
    public meta: { [index:string]: string; };
}

// @Route("/contacts", "GET")
export class GetContacts implements IReturn<GetContactsResponse>
{
    public constructor(init?:Partial<GetContacts>) { (<any>Object).assign(this, init); }
    public createResponse() { return new GetContactsResponse(); }
    public getTypeName() { return 'GetContacts'; }
}

// @Route("/contacts/{Id}", "GET")
export class GetContact implements IReturn<GetContactResponse>
{
    public constructor(init?:Partial<GetContact>) { (<any>Object).assign(this, init); }
    public id: number;
    public createResponse() { return new GetContactResponse(); }
    public getTypeName() { return 'GetContact'; }
}

// @Route("/contacts", "POST")
export class CreateContact implements IReturn<CreateContactResponse>
{
    public constructor(init?:Partial<CreateContact>) { (<any>Object).assign(this, init); }
    public title: Title;
    public name: string;
    public color: string;
    public filmGenres: FilmGenres[];
    public age: number;
    public agree: boolean;
    public continue: string;
    public errorView: string;
    public createResponse() { return new CreateContactResponse(); }
    public getTypeName() { return 'CreateContact'; }
}

// @Route("/contacts/{Id}", "DELETE")
// @Route("/contacts/{Id}/delete", "POST")
export class DeleteContact implements IReturnVoid
{
    public constructor(init?:Partial<DeleteContact>) { (<any>Object).assign(this, init); }
    public id: number;
    public continue: string;
    public createResponse() {}
    public getTypeName() { return 'DeleteContact'; }
}

// @Route("/contacts/{Id}", "POST PUT")
export class UpdateContact implements IReturn<UpdateContactResponse>
{
    public constructor(init?:Partial<UpdateContact>) { (<any>Object).assign(this, init); }
    public id: number;
    public title: Title;
    public name: string;
    public color: string;
    public filmGenres: FilmGenres[];
    public age: number;
    public continue: string;
    public errorView: string;
    public createResponse() { return new UpdateContactResponse(); }
    public getTypeName() { return 'UpdateContact'; }
}

// @Route("/auth")
// @Route("/auth/{provider}")
// @Route("/authenticate")
// @Route("/authenticate/{provider}")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost
{
    public constructor(init?:Partial<Authenticate>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public provider: string;

    // @DataMember(Order=2)
    public state: string;

    // @DataMember(Order=3)
    public oauth_token: string;

    // @DataMember(Order=4)
    public oauth_verifier: string;

    // @DataMember(Order=5)
    public userName: string;

    // @DataMember(Order=6)
    public password: string;

    // @DataMember(Order=7)
    public rememberMe: boolean;

    // @DataMember(Order=8)
    public continue: string;

    // @DataMember(Order=9)
    public errorView: string;

    // @DataMember(Order=10)
    public nonce: string;

    // @DataMember(Order=11)
    public uri: string;

    // @DataMember(Order=12)
    public response: string;

    // @DataMember(Order=13)
    public qop: string;

    // @DataMember(Order=14)
    public nc: string;

    // @DataMember(Order=15)
    public cnonce: string;

    // @DataMember(Order=16)
    public useTokenCookie: boolean;

    // @DataMember(Order=17)
    public accessToken: string;

    // @DataMember(Order=18)
    public accessTokenSecret: string;

    // @DataMember(Order=19)
    public meta: { [index:string]: string; };
    public createResponse() { return new AuthenticateResponse(); }
    public getTypeName() { return 'Authenticate'; }
}

// @Route("/assignroles")
// @DataContract
export class AssignRoles implements IReturn<AssignRolesResponse>, IPost
{
    public constructor(init?:Partial<AssignRoles>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public permissions: string[];

    // @DataMember(Order=3)
    public roles: string[];
    public createResponse() { return new AssignRolesResponse(); }
    public getTypeName() { return 'AssignRoles'; }
}

// @Route("/unassignroles")
// @DataContract
export class UnAssignRoles implements IReturn<UnAssignRolesResponse>, IPost
{
    public constructor(init?:Partial<UnAssignRoles>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public permissions: string[];

    // @DataMember(Order=3)
    public roles: string[];
    public createResponse() { return new UnAssignRolesResponse(); }
    public getTypeName() { return 'UnAssignRoles'; }
}

// @Route("/register")
// @DataContract
export class Register implements IReturn<RegisterResponse>, IPost
{
    public constructor(init?:Partial<Register>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public firstName: string;

    // @DataMember(Order=3)
    public lastName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public email: string;

    // @DataMember(Order=6)
    public password: string;

    // @DataMember(Order=7)
    public confirmPassword: string;

    // @DataMember(Order=8)
    public autoLogin: boolean;

    // @DataMember(Order=9)
    public continue: string;

    // @DataMember(Order=10)
    public errorView: string;
    public createResponse() { return new RegisterResponse(); }
    public getTypeName() { return 'Register'; }
}

