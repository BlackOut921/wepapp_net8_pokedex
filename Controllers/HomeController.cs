using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace wepapp_net8_pokedex.Controllers
{
	[AllowAnonymous]
	public class HomeController : Controller
	{
		[HttpGet]
		public IActionResult Index() => View();
	}
}
