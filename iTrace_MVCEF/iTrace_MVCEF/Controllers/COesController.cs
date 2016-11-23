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
        public IQueryable<CO> GetCOes()
        {
            return db.COes;
        }

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