package in.adityakhanna.billingsoftware.repository;

import in.adityakhanna.billingsoftware.entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemEntityRepository extends JpaRepository<OrderItemEntity, Long> {
}
