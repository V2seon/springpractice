package example.test1.service;

import example.test1.dto.AdminDto;
import example.test1.entity.AdminEntity;
import example.test1.repository.JoinRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class JoinService {

    private final JoinRepository joinRepository;

    public JoinService(JoinRepository joinRepository) {
        this.joinRepository = joinRepository;
    }

    @Transactional
    public Long save(AdminDto adminDto) {
//        MemberEntity memberEntity = memberRepository.save(MemberEntity.toSaveEntity(memberDto));
        AdminEntity adminEntity = adminDto.toEntity();
        joinRepository.save(adminEntity);
        return adminDto.getA_PK();
    }
}
