import { Expose, Transform, Type } from 'class-transformer';

export class ProductDto {
  @Expose()
  totalProducts: number;

  @Expose()
  limit: number;

  @Expose()
  offset: number;

  @Expose()
  filteredTotalProducts: number;

  @Expose()
  @Type(() => ProductList)
  products: ProductList[];
}

export class ProductList {
  @Expose({ name: 'product_id' })
  id: number;

  @Expose({ name: 'product_title' })
  title: string;

  @Expose({ name: 'product_description' })
  description: string;

  @Expose({ name: 'product_stock' })
  stock: number;

  @Expose({ name: 'product_images' })
  @Transform(({ value }) => value.toString().split(','))
  images: string[];

  @Expose()
  @Transform(({ obj }) => {
    return {
      id: obj.category_id,
      title: obj.category_title,
    };
  })
  category: any;

  @Expose({ name: 'reviewCount' })
  review: number;

  @Expose({ name: 'avgrating' })
  rating: number;
}
