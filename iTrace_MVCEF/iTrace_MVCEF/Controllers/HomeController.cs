using iTrace_MVCEF.Controllers;
using iTrace_MVCEF.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iTrace_MVCEF.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public JsonResult GetContacts()
        {
            iTraceEntities db = new iTraceEntities();
            var Coes = db.COes.Take(5).ToList();
            return new JsonResult { Data = Coes, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}
