package example.test1.repository;

import example.test1.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JoinRepository extends JpaRepository<AdminEntity,Long> {

}
