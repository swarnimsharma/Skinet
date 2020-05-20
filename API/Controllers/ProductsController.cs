using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IGenericRepository<ProductBrand> _productsBrands;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productsRepo,
                                  IGenericRepository<ProductType> productTypeRepo,
                                  IGenericRepository<ProductBrand> productsBrands, 
                                  IMapper mapper
                                  )
        {
            this._productsRepo = productsRepo;
            this._productTypeRepo = productTypeRepo;
            this._productsBrands = productsBrands;
            this._mapper = mapper;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductWithBrandAndTypeSpecification(id);
            var product = await _productsRepo.GetEntityWithSpec(spec);
            return _mapper.Map<Product , ProductToReturnDto>(product);

        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var spec = new ProductWithBrandAndTypeSpecification();
            var products = await _productsRepo.ListAsync(spec);
            return Ok( _mapper.Map<IReadOnlyList<Product> ,IReadOnlyList< ProductToReturnDto>>(products));
        }
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _productsBrands.ListAllAsync());

        }
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _productTypeRepo.ListAllAsync());

        }


    }
}