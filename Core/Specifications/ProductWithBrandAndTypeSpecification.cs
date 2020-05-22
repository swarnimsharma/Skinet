using Core.Entities;
namespace Core.Specifications
{
    public class ProductWithBrandAndTypeSpecification : BaseSpecification<Product>
    {
        public ProductWithBrandAndTypeSpecification(ProductSpecParams productparams)
       : base(x =>
       (string.IsNullOrEmpty(productparams.Search) || x.Name.ToLower().Contains
        (productparams.Search)) &&
        (!productparams.BrandId.HasValue || x.ProductBrandId == productparams.BrandId) &&
        (!productparams.TypeId.HasValue || x.ProductTypeId == productparams.TypeId)
       )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            ApplyPaging(productparams.PageSize * (productparams.PageIndex - 1),
            productparams.PageSize);
            if (!string.IsNullOrEmpty(productparams.Sort))
            {
                switch (productparams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(x => x.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(x => x.Price);
                        break;
                    default:
                        AddOrderBy(x => x.Name);
                        break;
                }
            }
        }
        public ProductWithBrandAndTypeSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }

    }
}