package example.test1.controller;

import example.test1.common.Pagination;
import example.test1.common.SessionCheck;
import example.test1.dto.MemberDto;
import example.test1.entity.MemberEntity;
import example.test1.repository.MemberRepository;
import example.test1.service.MemberService;
import example.test1.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@Controller
@AllArgsConstructor
@RequestMapping
public class UserController {

    private MemberRepository memberRepository;
    private UserService userService;

    @GetMapping("/user")
    public String user(Model model, Pageable pageable, HttpSession session,
                       @RequestParam(required = false, defaultValue = "0", value = "page") int page,
                       @RequestParam(required = false, defaultValue = "", value = "mname")String mname){

        pageable = PageRequest.of(page, 10, Sort.by("mpk").descending());
        Page<MemberEntity> memberEntities = userService.selectALLTable(mname, pageable);
        Pagination pagination = new Pagination(memberEntities.getTotalPages(), page);
        model.addAttribute("userlist", memberEntities);
        model.addAttribute("thisPage", pagination.getPage()); //현재 몇 페이지에 있는지 확인하기 위함
        model.addAttribute("isNextSection", pagination.isNextSection()); //다음버튼 유무 확인하기 위함
        model.addAttribute("isPrevSection", pagination.isPrevSection()); //이전버튼 유무 확인하기 위함
        model.addAttribute("firstBtnIndex", pagination.getFirstBtnIndex()); //버튼 페이징 - 첫시작 인덱스
        model.addAttribute("lastBtnIndex", pagination.getLastBtnIndex()); //섹션 변경 위함
        model.addAttribute("totalPage", pagination.getTotalPages()); //끝 버튼 위함
        return "user.html";
    }

    @GetMapping("/modify_page")
    public String moveModify(Model model,
                             @RequestParam(required = false, defaultValue = "",value = "mpk")Long mpk){
        Long newpk;
        String newname;
        int newma;
        int newsi;
        int newen;
        int newko;
        List<MemberEntity> memberEntities = userService.modify_page(mpk);
        newpk = memberEntities.get(0).getMpk();
        newname = memberEntities.get(0).getMname();
        newma = memberEntities.get(0).getMMa();
        newsi = memberEntities.get(0).getMSi();
        newen = memberEntities.get(0).getMEn();
        newko = memberEntities.get(0).getMKo();
        model.addAttribute("newpk",newpk);
        model.addAttribute("newname",newname);
        model.addAttribute("newma",newma);
        model.addAttribute("newsi",newsi);
        model.addAttribute("newen",newen);
        model.addAttribute("newko",newko);
        return "updateuser.html";
    }
    @PostMapping("/modify")
    public String modify(@RequestParam(required = false, defaultValue = "", value = "mpk")Long mpk,
                         @RequestParam(required = false, defaultValue = "", value = "username")String mname,
                         @RequestParam(required = false, defaultValue = "", value = "userma")int mma,
                         @RequestParam(required = false, defaultValue = "", value = "usersi")int msi,
                         @RequestParam(required = false, defaultValue = "", value = "userko")int mko,
                         @RequestParam(required = false, defaultValue = "", value = "useren")int men){
        MemberDto memberDto = new MemberDto(mpk,mname, mma,men,mko,msi);
        userService.set_modify(memberDto);
        return "/user";
    }
    @PostMapping("/delete")
    public String delete(@RequestParam(required = false, defaultValue = "", value = "delete_index")Long delete_index){
        System.out.println("인덱스값");
        System.out.println(delete_index);
        userService.delete(delete_index);
        return "/user";
    }

    //1.검색 및 검색 필터
    @RequestMapping(value = "/querydsl", method = RequestMethod.POST)
    public String dslTest(Model model,
                          @RequestParam(required = false, defaultValue = "0", value = "page") int page,
                          @RequestParam(required = false, defaultValue = "", value = "titleText") String titleText,
                          Pageable pageable) {
        pageable = PageRequest.of(page, 10, Sort.by("mpk").descending());
        Page<MemberEntity> pageList = userService.selectALLTable(titleText, pageable);

        model.addAttribute("userlist", pageList); //페이지 객체 리스트
        model.addAttribute("totalPage", pageList.getTotalPages() - 1); //페이지 총 개수
        model.addAttribute("nextPage", 0); //다음 인덱스 페이지리스트의 페이지 넘버
        model.addAttribute("totalCount", pageList.getTotalElements()); //총 게시물 개수
        model.addAttribute("isNextSection", true); // 다음페이지가 있는지?
        model.addAttribute("isPrevSection", false); // 이전페이지가 있는지?
        model.addAttribute("thisSection", 0);
        model.addAttribute("firstBtnIndex", 0); //버튼 페이징 - 첫시작 인덱스
        model.addAttribute("lastBtnIndex", 9); //섹션 변경 위함
        model.addAttribute("thisPage", 0);
        return "/user :: #userlist"; // 테이블쪽으로 배치하겠다는 뜻인 듯.
    }

    //2.페이징 기능
    @RequestMapping(value = "/paging", method = RequestMethod.POST) // 비동기 페이지네이션
    public String pagingButton(Model model,
                               @RequestParam(required = false, defaultValue = "0", value = "page") int page,
                               @RequestParam(required = false, defaultValue = "", value = "titleText") String titleText,
                               Pageable pageable) {

        pageable = PageRequest.of(page, 10, Sort.by("mpk").descending());
        int totalPages = userService.selectALLTable(titleText, pageable).getTotalPages();

        Pagination pagination = new Pagination(totalPages, page);

        model.addAttribute("thisPage", pagination.getPage()); //현재 몇 페이지에 있는지 확인하기 위함
        model.addAttribute("isNextSection", pagination.isNextSection()); //다음버튼 유무 확인하기 위함
        model.addAttribute("isPrevSection", pagination.isPrevSection()); //이전버튼 유무 확인하기 위함
        model.addAttribute("firstBtnIndex", pagination.getFirstBtnIndex()); //버튼 페이징 - 첫시작 인덱스
        model.addAttribute("lastBtnIndex", pagination.getLastBtnIndex()); //섹션 변경 위함
        model.addAttribute("totalPage", pagination.getTotalPages()); //끝 버튼 위함

        return "/user :: #pageList";
    }
}
