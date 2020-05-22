using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFilterForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFilterForCountSpecification(ProductSpecParams productparams) : base(x =>
        (string.IsNullOrEmpty(productparams.Search) || x.Name.ToLower().Contains
        (productparams.Search)) &&
        (!productparams.BrandId.HasValue || x.ProductBrandId == productparams.BrandId) &&
        (!productparams.TypeId.HasValue || x.ProductTypeId == productparams.TypeId))
        {
        }
    }
}