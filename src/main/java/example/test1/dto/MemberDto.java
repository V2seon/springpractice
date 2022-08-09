package example.test1.dto;


import example.test1.entity.MemberEntity;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberDto {
    private Long M_PK;
    private String M_NAME;
    private int M_MA;
    private int M_EN;
    private int M_KO;
    private int M_SI;

    @Builder
    public MemberDto(Long m_PK, String m_NAME, int m_MA, int m_EN, int m_KO, int m_SI) {
        M_PK = m_PK;
        M_NAME = m_NAME;
        M_MA = m_MA;
        M_EN = m_EN;
        M_KO = m_KO;
        M_SI = m_SI;
    }

    @Builder
    public MemberDto(String M_NAME, int M_MA, int M_EN, int M_KO, int M_SI) {
        this.M_NAME = M_NAME;
        this.M_MA = M_MA;
        this.M_EN = M_EN;
        this.M_KO = M_KO;
        this.M_SI = M_SI;
    }

    public static MemberDto tomemberDto(MemberEntity memberEntity){
        MemberDto memberDto = new MemberDto();
        memberDto.setM_PK(memberEntity.getMpk());
        memberDto.setM_NAME(memberEntity.getMname());
        memberDto.setM_MA(memberEntity.getMMa());
        memberDto.setM_EN(memberEntity.getMEn());
        memberDto.setM_KO(memberEntity.getMKo());
        memberDto.setM_SI(memberEntity.getMSi());
        return memberDto;
    }
    public MemberEntity toEntity(){
        MemberEntity entity = MemberEntity.builder()
                .m_PK(M_PK)
                .m_NAME(M_NAME)
                .m_MA(M_MA)
                .m_EN(M_EN)
                .m_KO(M_KO)
                .m_SI(M_SI)
                .build();
        return entity;
    }

}
