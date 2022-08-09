package example.test1.service;

import example.test1.dto.AdminDto;
import example.test1.dto.MemberDto;
import example.test1.entity.AdminEntity;
import example.test1.repository.AdminRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@AllArgsConstructor
@Service
public class LoginService {
    private AdminRepository adminRepository;

    @Transactional
    public int loginAdmin(String userid, String userpw){
        int returnValue = 0;
        Optional<AdminEntity> optionalAdminEntity = adminRepository.findByAemailAndApw(userid, userpw);
        AdminEntity loginEntity = optionalAdminEntity.get();
        if(!optionalAdminEntity.isPresent()){
            returnValue = 0;
        }else{
            returnValue = 1;
        }
        return returnValue;
    }
}