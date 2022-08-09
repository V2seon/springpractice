package example.test1.entity;

import example.test1.dto.MemberDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "member_table")
public class MemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "m_pk")
    private Long mpk;

    @Column(name = "m_name")
    private String mname;

    @Column(name = "m_ma")
    private int mMa;

    @Column(name = "m_en")
    private int mEn;

    @Column(name = "m_ko")
    private int mKo;

    @Column(name = "m_si")
    private int mSi;

    @Builder
    public MemberEntity(Long m_PK, String m_NAME, int m_MA, int m_EN, int m_KO, int m_SI) {
        this.mpk = m_PK;
        this.mname = m_NAME;
        this.mMa = m_MA;
        this.mEn = m_EN;
        this.mKo = m_KO;
        this.mSi = m_SI;
    }

    public static MemberEntity toSaveEntity (MemberDto memberDto){
        MemberEntity memberEntity = new MemberEntity();
        memberDto.setM_NAME(memberEntity.getMname());
        memberDto.setM_MA(memberEntity.getMMa());
        memberDto.setM_EN(memberEntity.getMEn());
        memberDto.setM_KO(memberEntity.getMKo());
        memberDto.setM_SI(memberEntity.getMSi());
        return memberEntity;
    }

}
