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

        public JsonResult GetCOTypes()
        {
            iTraceEntities db = new iTraceEntities();
            var Coes = db.CO_type.ToList();
            return new JsonResult { Data = Coes, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetGroups()
        {
            iTraceEntities db = new iTraceEntities();
            var Coes = db.CO_Grouping.ToList();
            return new JsonResult { Data = Coes, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        //public JsonResult GetGroup(int ID)
        //{
        //    iTraceEntities db = new iTraceEntities();
        //    var Coes = db.CO_Grouping.Where(p => p.SAK_CO_GROUPING == ID).FirstOrDefault();
        //    return new JsonResult { Data = Coes, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        //}
        public JsonResult GetContacts()
        {
            iTraceEntities db = new iTraceEntities();
            var Coes = db.COes.Take(5).ToList();
            return new JsonResult { Data = Coes, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetContact(int contactID)
        {
            iTraceEntities db = new iTraceEntities();
            var Coes = db.COes.Where(p => p.SAK_CSR == contactID).FirstOrDefault();
            return new JsonResult { Data = Coes, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // save contact
        [HttpPost]
        public JsonResult SaveContact(CO contact)
        {
            bool status = false;
            string message = "";
            try
            {
                if (ModelState.IsValid)
                {
                    using (iTraceEntities dc = new iTraceEntities())
                    {
                        if (contact.SAK_CSR > 0)
                        {
                            //Update
                            var c = dc.COes.Where(a => a.SAK_CSR.Equals(contact.SAK_CSR)).FirstOrDefault();
                            if (c != null)
                            {
                                c.SAK_CSR = contact.SAK_CSR;
                                c.DSC = contact.DSC;
                                c.NAM = contact.NAM;
                                c.SAK_PARTICIPANT = contact.SAK_PARTICIPANT;
                            }
                        }
                        else
                        {
                            //create
                            dc.COes.Add(contact);
                        }
                        dc.SaveChanges();
                        status = true;
                    }
                }
            }
            catch (Exception ex)
            {
                message = ex.Message;
            }
            return new JsonResult { Data = new { status = status, message = message } };
        }

        // Create CO
        [HttpPost]
        public JsonResult AddCO(CO contact)
        {
            bool status = false;
            string message = "";
            try
            {
                if (ModelState.IsValid)
                {
                    using (iTraceEntities dc = new iTraceEntities())
                    {
                           //create
                            dc.COes.Add(contact);
                        
                        dc.SaveChanges();
                        status = true;
                    }
                }
            }
            catch (Exception ex)
            {
                message = ex.Message;
            }
            return new JsonResult { Data = new { status = status, message = message } };
        }


        // Create CO
        [HttpPost]
        public JsonResult AddGroup(CO_Grouping contact)
        {
            bool status = false;
            string message = "";
            try
            {
                if (ModelState.IsValid)
                {
                    using (iTraceEntities dc = new iTraceEntities())
                    {
                        //create
                        dc.CO_Grouping.Add(contact);

                        dc.SaveChanges();
                        status = true;
                    }
                }
            }
            catch (Exception ex)
            {
                message = ex.Message;
            }
            return new JsonResult { Data = new { status = status, message = message } };
        }
    }
}
