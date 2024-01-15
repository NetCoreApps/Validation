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
    sessionId?: string;
}

export interface IHasBearerToken
{
    bearerToken?: string;
}

export interface IGet
{
}

export interface IPost
{
}

export interface IPut
{
}

export enum Title
{
    Unspecified = 'Unspecified',
    Mr = 'Mr',
    Mrs = 'Mrs',
    Miss = 'Miss',
}

export enum FilmGenres
{
    Action = 'Action',
    Adventure = 'Adventure',
    Comedy = 'Comedy',
    Drama = 'Drama',
}

export class Contact
{
    public id: number;
    public userAuthId: number;
    public title: Title;
    public name: string;
    public color: string;
    public filmGenres: FilmGenres[];
    public age: number;

    public constructor(init?: Partial<Contact>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public fieldName: string;

    // @DataMember(Order=3)
    public message: string;

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseError>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public message: string;

    // @DataMember(Order=3)
    public stackTrace: string;

    // @DataMember(Order=4)
    public errors: ResponseError[];

    // @DataMember(Order=5)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseStatus>) { (Object as any).assign(this, init); }
}

export class GetContactsResponse
{
    public results: Contact[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetContactsResponse>) { (Object as any).assign(this, init); }
}

export class GetContactResponse
{
    public result: Contact;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetContactResponse>) { (Object as any).assign(this, init); }
}

export class CreateContactResponse
{
    public result: Contact;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<CreateContactResponse>) { (Object as any).assign(this, init); }
}

export class UpdateContactResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateContactResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class AuthenticateResponse implements IHasSessionId, IHasBearerToken
{
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
    public refreshTokenExpiry?: string;

    // @DataMember(Order=9)
    public profileUrl: string;

    // @DataMember(Order=10)
    public roles: string[];

    // @DataMember(Order=11)
    public permissions: string[];

    // @DataMember(Order=12)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=13)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<AuthenticateResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class RegisterResponse implements IHasSessionId, IHasBearerToken
{
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

    // @DataMember(Order=7)
    public refreshTokenExpiry?: string;

    // @DataMember(Order=8)
    public roles: string[];

    // @DataMember(Order=9)
    public permissions: string[];

    // @DataMember(Order=10)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=11)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<RegisterResponse>) { (Object as any).assign(this, init); }
}

// @Route("/contacts")
export class GetContacts implements IReturn<GetContactsResponse>, IGet
{

    public constructor(init?: Partial<GetContacts>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetContacts'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetContactsResponse(); }
}

// @Route("/contacts/{Id}")
export class GetContact implements IReturn<GetContactResponse>, IGet
{
    public id: number;

    public constructor(init?: Partial<GetContact>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetContact'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetContactResponse(); }
}

// @Route("/contacts", "POST")
export class CreateContact implements IReturn<CreateContactResponse>
{
    public title: Title;
    public name: string;
    public color: string;
    public filmGenres: FilmGenres[];
    public age: number;
    public agree: boolean;
    public continue: string;
    public errorView: string;

    public constructor(init?: Partial<CreateContact>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContact'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CreateContactResponse(); }
}

// @Route("/contacts/{Id}/delete", "POST")
export class DeleteContact implements IReturnVoid, IPost
{
    public id: number;
    public continue?: string;

    public constructor(init?: Partial<DeleteContact>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteContact'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/contacts/{Id}", "PUT")
export class UpdateContact implements IReturn<UpdateContactResponse>, IPut
{
    public id: number;
    public title: Title;
    public name: string;
    public color: string;
    public filmGenres: FilmGenres[];
    public age: number;
    public continue?: string;
    public errorView?: string;

    public constructor(init?: Partial<UpdateContact>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContact'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new UpdateContactResponse(); }
}

/** @description Sign In */
// @Route("/auth", "GET,POST")
// @Route("/auth/{provider}", "POST")
// @Api(Description="Sign In")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost
{
    /** @description AuthProvider, e.g. credentials */
    // @DataMember(Order=1)
    public provider: string;

    // @DataMember(Order=2)
    public userName: string;

    // @DataMember(Order=3)
    public password: string;

    // @DataMember(Order=4)
    public rememberMe?: boolean;

    // @DataMember(Order=5)
    public accessToken: string;

    // @DataMember(Order=6)
    public accessTokenSecret: string;

    // @DataMember(Order=7)
    public returnUrl: string;

    // @DataMember(Order=8)
    public errorView: string;

    // @DataMember(Order=9)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<Authenticate>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Authenticate'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AuthenticateResponse(); }
}

/** @description Sign Up */
// @Route("/register", "POST")
// @Api(Description="Sign Up")
// @DataContract
export class Register implements IReturn<RegisterResponse>, IPost
{
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
    public autoLogin?: boolean;

    // @DataMember(Order=10)
    public errorView: string;

    // @DataMember(Order=11)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<Register>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Register'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new RegisterResponse(); }
}

