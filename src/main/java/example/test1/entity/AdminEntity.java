package example.test1.entity;

import example.test1.dto.AdminDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
@Setter
@Table(name = "admin")
public class AdminEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "a_pk")
    private Long apk;

    @Column(name = "a_email", unique = true)
    private String aemail;

    @Column(name = "a_pw")
    private String apw;

    @Column(name = "a_name")
    private String aname;

    @Column(name = "a_age")
    private int aage;

    @Column(name = "a_phone")
    private String aphone;


    @Builder
    public AdminEntity(Long a_PK, String a_EMAIL, String a_PW, String a_NAME, int a_AGE, String a_PHONE) {
        this.apk = a_PK;
        this.aemail = a_EMAIL;
        this.apw = a_PW;
        this.aname = a_NAME;
        this.aage = a_AGE;
        this.aphone = a_PHONE;
    }

    public static AdminEntity toSaveEntity (AdminDto adminDto){
        AdminEntity adminEntity = new AdminEntity();
        adminEntity.setAemail(adminDto.getA_EMAIL());
        adminEntity.setApw(adminDto.getA_PW());
        adminEntity.setAname(adminDto.getA_NAME());
        adminEntity.setAage(adminDto.getA_AGE());
        adminEntity.setAphone(adminDto.getA_PHONE());
        return adminEntity;
    }
}
