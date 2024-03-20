import { ProductEntity } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'orders_products' })
export class OrdersProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  productUnitPrice: number;

  @Column()
  productQuantity: number;

  @ManyToOne(() => OrderEntity, (order) => order.products)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderProducts, {
    cascade: true
  })
  product: ProductEntity;
}
