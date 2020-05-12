using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController:ControllerBase
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            this._context = context;
        }
        [HttpGet]
        public  async Task<ActionResult <List<Product>>> GetProducts()
        {
           var products = await _context.Products.ToListAsync();
           return Ok(products);
        }
         [HttpGet("{id}")]
        public ActionResult GetProduct(int id)
        {
            var product = _context.Products.Find(id);
           return Ok(product);
        }
        
    }
}