package example.test1.Predicate;

import com.querydsl.core.BooleanBuilder;
import example.test1.entity.QMemberEntity;

public class MemberTablePredicate {
    public static BooleanBuilder search(String mname){
        QMemberEntity qMemberEntity = QMemberEntity.memberEntity;

        BooleanBuilder builder = new BooleanBuilder();

        builder.and(qMemberEntity.mname.contains(mname));

        return builder;
    }
}
