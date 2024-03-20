import { CategoryEntity } from 'src/categories/entities/category.entity';
import { OrdersProductsEntity } from 'src/orders/entities/orders-products.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column()
  stock: number;

  @Column('simple-array')
  images: string[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne(() => UserEntity, (user) => user.products)
  addedBy: UserEntity;

  @ManyToOne(() => CategoryEntity, (cat) => cat.products)
  category: CategoryEntity;

  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews: ReviewEntity[];

  @OneToMany(() => OrdersProductsEntity, (op) => op.product)
  orderProducts: OrdersProductsEntity[];
}
