package example.test1.repository;

import example.test1.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Optional;
                                                   // 사용할 Entity , pk의 타입
public interface AdminRepository extends JpaRepository<AdminEntity, Long> {
    // 입력한 값과 동일한 정보를 가진 행 정보를 가져온다
    Optional<AdminEntity> findByAemailAndApw(String a_EMAIL, String a_PW);

}
