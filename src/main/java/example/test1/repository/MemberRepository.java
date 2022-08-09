package example.test1.repository;

import example.test1.entity.MemberEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long>, QuerydslPredicateExecutor<MemberEntity> {
      // MemberEntity 에서 가져온 m_name이 포함된 행의 정보를 가져옴 => findByMname
      Optional <MemberEntity> findByMname(String m_name);
      List<MemberEntity> findByMpk(Long m_pk);

}
