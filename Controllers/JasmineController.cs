using System;
using System.Web.Mvc;

namespace Knockout_Extend.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}
