using System;
using System.Linq;
using System.Drawing;
using System.Threading;
using System.Globalization;
using System.Collections.Generic;
using System.Collections.Concurrent;
using Microsoft.AspNetCore.Mvc.Rendering;
using ServiceStack;
using ServiceStack.Templates;
using ServiceStack.FluentValidation;
using Validation.ServiceModel;
using Validation.ServiceModel.Types;

namespace Validation.ServiceInterface
{
    public class CreateContactValidator : AbstractValidator<CreateContact>
    {
        public CreateContactValidator()
        {
            RuleFor(r => r.Title).NotEqual(Title.Unspecified).WithMessage("Please choose a title");
            RuleFor(r => r.Name).NotEmpty();
            RuleFor(r => r.Color).Must(x => x.IsValidColor()).WithMessage("Must be a valid color");
            RuleFor(r => r.FilmGenres).NotEmpty().WithMessage("Please select at least 1 genre");
            RuleFor(r => r.Age).GreaterThan(13).WithMessage("Contacts must be older than 13");
            RuleFor(x => x.Agree).Equal(true).WithMessage("You must agree before submitting");
        }
    }
    
    public class UpdateContactValidator : AbstractValidator<UpdateContact>
    {
        public UpdateContactValidator()
        {
            RuleFor(r => r.Id).GreaterThan(0);
            RuleFor(r => r.Title).NotEqual(Title.Unspecified).WithMessage("Please choose a title");
            RuleFor(r => r.Name).NotEmpty();
            RuleFor(r => r.Color).Must(x => x.IsValidColor()).WithMessage("Must be a valid color");
            RuleFor(r => r.FilmGenres).NotEmpty().WithMessage("Please select at least 1 genre");
            RuleFor(r => r.Age).GreaterThan(13).WithMessage("Contacts must be older than 13");
        }
    }

    [Authenticate]
    [ErrorView(nameof(CreateContact.ErrorView))] // Display ErrorView if HTML request results in an Exception
    [DefaultView("/server/contacts")]
    public class ContactServices : Service
    {
        private static int Counter = 0;

        internal static readonly ConcurrentDictionary<int, Data.Contact> Contacts = new ConcurrentDictionary<int, Data.Contact>();

        public object Any(GetContacts request)
        {
            var userId = this.GetUserId();
            return new GetContactsResponse
            {
                Results = Contacts.Values
                    .Where(x => x.UserAuthId == userId)
                    .OrderByDescending(x => x.Id)
                    .Map(x => x.ConvertTo<Contact>())
            };
        }

        public object Any(GetContact request) =>
            Contacts.TryGetValue(request.Id, out var contact) && contact.UserAuthId == this.GetUserId()
                ? (object)new GetContactResponse { Result = contact.ConvertTo<Contact>() }
                : HttpError.NotFound($"Contact was not found");

        public object Any(CreateContact request) 
        {
            var newContact = request.ConvertTo<Data.Contact>();
            newContact.Id = Interlocked.Increment(ref Counter);
            newContact.UserAuthId = this.GetUserId();
            newContact.CreatedDate = newContact.ModifiedDate = DateTime.UtcNow;

            var contacts = Contacts.Values.ToList();
            var alreadyExists = contacts.Any(x => x.UserAuthId == newContact.UserAuthId && x.Name == request.Name);
            if (alreadyExists)
                throw new ArgumentException($"You already have a contact named '{request.Name}'", nameof(request.Name));
            
            Contacts[newContact.Id] = newContact;
            return new CreateContactResponse { Result = newContact.ConvertTo<Contact>() };
        }

        public object AnyHtml(CreateContact request)
        {
            Any(request);
            return HttpResult.Redirect(request.Continue ?? Request.GetView());
        }

        public void Any(DeleteContact request)
        {
            if (Contacts.TryGetValue(request.Id, out var contact) && contact.UserAuthId == this.GetUserId())
            {
                Contacts.TryRemove(request.Id, out _);
            }
        }

        public object PostHtml(DeleteContact request) // only called by html POST requests where it takes precedence
        {
            Any(request);
            return HttpResult.Redirect(request.Continue ?? Request.GetView()); //added by [DefaultView]
        }
    }

    // Example of single 'pure' API supporting multiple HTML UIs
    [ErrorView(nameof(UpdateContact.ErrorView))] // Display ErrorView if HTML request results in an Exception
    public class UpdateContactServices : Service
    {
        public object Any(UpdateContact request)
        {
            if (!ContactServices.Contacts.TryGetValue(request.Id, out var contact) || contact.UserAuthId != this.GetUserId())
                throw HttpError.NotFound("Contact was not found");

            contact.PopulateWith(request);
            contact.ModifiedDate = DateTime.UtcNow;
            
            return request.Continue != null 
                ? (object) HttpResult.Redirect(request.Continue)
                : new UpdateContactResponse();
        }
    }

    public static class ContactServiceExtensions
    {
        public static int GetUserId(this Service service) => int.Parse(service.GetSession().UserAuthId);

        public static bool IsValidColor(this string color) => !string.IsNullOrEmpty(color) && 
            (color.FirstCharEquals('#')
                ? int.TryParse(color.Substring(1), NumberStyles.HexNumber, CultureInfo.InvariantCulture, out _)
                : Color.FromName(color).IsKnownColor);
        
    }
    
    /// <summary>
    /// Custom filters for App data sources and re-usable UI snippets in Templates
    /// </summary>
    public class ContactServiceFilters : TemplateFilter
    {
        internal readonly List<KeyValuePair<string, string>> MenuItems = new List<KeyValuePair<string,string>> {
            KeyValuePair.Create("/",               "Home"),
            KeyValuePair.Create("/login-links",    "Login Links"),
            KeyValuePair.Create("/register-links", "Register Links"),
            KeyValuePair.Create("/contact-links",  "Contacts Links"),
        };
        public List<KeyValuePair<string, string>> menuItems() => MenuItems;

        static Dictionary<string, string> Colors = new Dictionary<string, string>
        {
            {"#ffa4a2","Red"},
            {"#b2fab4","Green"},
            {"#9be7ff","Blue"}
        };
        public Dictionary<string, string> contactColors() => Colors;

        private static List<KeyValuePair<string, string>> Titles => EnumUtils.GetValues<Title>()
            .Where(x => x != Title.Unspecified)
            .ToKeyValuePairs();
        public List<KeyValuePair<string, string>> contactTitles() => Titles;

        private static List<string> FilmGenres => EnumUtils.GetValues<FilmGenres>().Map(x => x.ToDescription());
        public List<string> contactGenres() => FilmGenres;
    }

    /// <summary>
    /// Razor Helpers for App data sources and re-usable UI snippets in Razor pages
    /// </summary>
    public static class RazorHelpers
    {
        internal static readonly ContactServiceFilters Instance = new ContactServiceFilters();
            
        public static Dictionary<string, string> ContactColors(this IHtmlHelper html) => Instance.contactColors();
        public static List<KeyValuePair<string, string>> ContactTitles(this IHtmlHelper html) => Instance.contactTitles();
        public static List<string> ContactGenres(this IHtmlHelper html) => Instance.contactGenres();
        public static List<KeyValuePair<string, string>> MenuItems(this IHtmlHelper html) => Instance.MenuItems;
    }

    public class ContactsHostConfig : IConfigureAppHost
    {
        public void Configure(IAppHost appHost)
        {
            AutoMapping.RegisterConverter((Data.Contact from) =>
                from.ConvertTo<ServiceModel.Types.Contact>(skipConverters: true));
        }
    }    
}