package example.test1.service;

import example.test1.dto.MemberDto;
import example.test1.entity.AdminEntity;
import example.test1.entity.MemberEntity;
import example.test1.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class MemberService {

    private MemberRepository memberRepository;
    private MemberEntity memberEntity;

    public MemberService(MemberRepository memberRepository){
        this.memberRepository = memberRepository;
    }

    @Transactional
    public Long save(MemberDto memberDto) {
        MemberEntity memberEntity = memberDto.toEntity();
        memberRepository.save(memberEntity);
        return memberDto.getM_PK();
    }
}
