package example.test1.dto;

import example.test1.entity.AdminEntity;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class AdminDto {
    private Long A_PK;
    private String A_EMAIL;
    private String A_PW;
    private String A_NAME;
    private int A_AGE;
    private String A_PHONE;

    @Builder
    public AdminDto(Long a_PK, String a_EMAIL, String a_PW, String a_NAME, int a_AGE, String a_PHONE) {
        A_PK = a_PK;
        A_EMAIL = a_EMAIL;
        A_PW = a_PW;
        A_NAME = a_NAME;
        A_AGE = a_AGE;
        A_PHONE = a_PHONE;
    }

    public AdminEntity toEntity(){
        AdminEntity entity = AdminEntity.builder()
                .a_PK(A_PK)
                .a_EMAIL(A_EMAIL)
                .a_PW(A_PW)
                .a_NAME(A_NAME)
                .a_AGE(A_AGE)
                .a_PHONE(A_PHONE)
                .build();
        return entity;
    }
    @Builder
    public AdminDto(String A_EMAIL, String A_PW, String A_NAME, int A_AGE, String A_PHONE) {
        this.A_EMAIL = A_EMAIL;
        this.A_PW = A_PW;
        this.A_NAME = A_NAME;
        this.A_AGE = A_AGE;
        this.A_PHONE = A_PHONE;
    }

    public static AdminDto toAdminDto(AdminEntity adminEntity){
        AdminDto adminDto = new AdminDto();
        adminDto.setA_PK(adminEntity.getApk());
        adminDto.setA_EMAIL(adminEntity.getAemail());
        adminDto.setA_PW(adminEntity.getApw());
        adminDto.setA_NAME(adminEntity.getAname());
        adminDto.setA_AGE(adminEntity.getAage());
        adminDto.setA_PHONE(adminEntity.getAphone());
        return adminDto;
    }
}
