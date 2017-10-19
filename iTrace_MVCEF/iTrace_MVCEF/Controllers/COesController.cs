using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using iTrace_MVCEF.Models;

namespace iTrace_MVCEF.Controllers
{
    public class COesController : ApiController
    {
        private iTraceEntities db = new iTraceEntities();

        // GET: api/COes
        //public IQueryable<CO> GetCOes()
        //{
        //    return db.COes ;
        //}

        // GET: api/COes
       // public IQueryable<COList> GetCOList()

        public IQueryable<COList> GetCOList()
        {
            var CO = from c in db.COes
                     join g in db.co_grouping
                     on c.SAK_CO_GROUPING equals g.SAK_CO_GROUPING
                     select new COList { SAK_CSR = c.SAK_CSR, NAM = c.NAM, dte_due = c.DTE_DUE, DSC = c.DSC, GROUP_Nam = g.NAM };

            foreach (var x in CO)
            {

                var y = x.GROUP_Nam;
            }
            //var z = CO.OfType<COList>().ToList();
            return CO;


            // return db.COes.Select(p => new COList { SAK_CSR = p.SAK_CSR, NAM = p.NAM,dte_due =p.DTE_DUE , DSC = p.DSC, GROUP_Nam = p.GROUP_Nam });
        }
        // GET: api/COes
        //public IQueryable<COList> GetGroupList()
        //{
        //    return db.CO_Grouping.Select(p => new COList { SAK_CO_GROUPING = p.SAK_CO_GROUPING, NAM = p.NAM, DSC = p.DSC});
        //}

        // GET: api/COes/5
        [ResponseType(typeof(CO))]
        public IHttpActionResult GetCO(double id)
        {
            CO cO = db.COes.Find(id);
            if (cO == null)
            {
                return NotFound();
            }

            return Ok(cO);
        }

        // PUT: api/COes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCO(double id, CO cO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cO.SAK_CSR)
            {
                return BadRequest();
            }

            db.Entry(cO).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!COExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/COes
        [ResponseType(typeof(CO))]
        public IHttpActionResult PostCO(CO cO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.COes.Add(cO);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (COExists(cO.SAK_CSR))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = cO.SAK_CSR }, cO);
        }

        // DELETE: api/COes/5
        [ResponseType(typeof(CO))]
        public IHttpActionResult DeleteCO(double id)
        {
            CO cO = db.COes.Find(id);
            if (cO == null)
            {
                return NotFound();
            }

            db.COes.Remove(cO);
            db.SaveChanges();

            return Ok(cO);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool COExists(double id)
        {
            return db.COes.Count(e => e.SAK_CSR == id) > 0;
        }
    }
}