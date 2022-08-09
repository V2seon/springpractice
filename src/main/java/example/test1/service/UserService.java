package example.test1.service;

import example.test1.Predicate.MemberTablePredicate;
import example.test1.dto.MemberDto;
import example.test1.entity.MemberEntity;
import example.test1.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Stack;

@Service
@AllArgsConstructor
public class UserService {
    private MemberRepository memberRepository;

    @Transactional
    public Page <MemberEntity> selectALLTable(String mname, Pageable pageable){
        return memberRepository.findAll(MemberTablePredicate.search(mname),pageable);
    }
    @Transactional
    public List <MemberEntity> modify_page(Long mpk){
        return memberRepository.findByMpk(mpk);
    }
    @Transactional
    public Long set_modify(MemberDto memberDto){
        return memberRepository.save(memberDto.toEntity()).getMpk();
    }
    @Transactional
    public void delete(Long mpk){
        memberRepository.deleteById(mpk);
    }
}
