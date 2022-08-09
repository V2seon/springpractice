package example.test1.controller;

import example.test1.common.SessionCheck;
import example.test1.dto.MemberDto;
import example.test1.entity.AdminEntity;
import example.test1.entity.MemberEntity;
import example.test1.repository.AdminRepository;
import example.test1.repository.MemberRepository;
import example.test1.service.LoginService;
import example.test1.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Optional;

@Controller
@AllArgsConstructor
@RequestMapping
public class LoginController {
    private  LoginService loginService;
    private  AdminRepository adminRepository;


//    public LoginController(LoginService loginService, MemberService memberService, AdminRepository adminRepository, MemberRepository memberRepository) {
//        this.loginService = loginService;
//        this.memberService = memberService;
//        this.adminRepository = adminRepository;
//        this.memberRepository = memberRepository;
//    }
    @GetMapping("/")
    public String moveLogin(Model m, HttpServletRequest request){
        String returnValue = "";
        if(new SessionCheck().loginSessionCheck(request)){
            // optionalMemberEntity.isPresent() => 값이 있으면
            returnValue = "/main";
        }else{
            returnValue = "login.html";
        }
        return returnValue;
    }
    @GetMapping("/main")
    public String main(@ModelAttribute MemberEntity memberEntity, MemberDto memberDto, Model model, HttpSession request) {
        // 세션의 name 값을 model에 담아서 view단으로 뿌려줌
        model.addAttribute("myemail",request.getAttribute("name"));
        // memberRepository의 findBtMname 을 호출 하여 name값이 포함된 행을 가져옴
            return "/main";
        }

    @GetMapping("/join")
    public String join() {
        return "join.html";
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "userlogin")
    public HashMap<String, String> userlogin(@RequestParam(required = false, defaultValue = "", value = "userid") String userid,
                                             @RequestParam(required = false, defaultValue = "", value = "userpw") String userpw,
                                             HttpServletRequest request){
        HttpSession session = request.getSession();
        System.out.println(userid);
        System.out.println(userpw);
        HashMap<String, String> msg = new HashMap<String, String>();
//        try {
//            userpw = encrypt(userpw);
//        } catch (NoSuchAlgorithmException e) {
//            e.printStackTrace();
//        }
        int loginResult = loginService.loginAdmin(userid, userpw);
        if(loginResult == 1){
            //로그인성공
            String name;
            Optional <AdminEntity> adminEntity = adminRepository.findByAemailAndApw(userid, userpw);
            name = adminEntity.get().getAname();
            msg.put("loginResult", "1");
            // session.setAttribute("name", name); 세션에 name 값을 담는다
            session.setAttribute("name", name);
            session.setAttribute("userid", userid);
        }else{
            //로그인실패
            msg.put("loginResult", "0");
        }
        return msg;
    }

    @GetMapping("/logout")
    public String logout(Model m, HttpServletRequest request){
        HttpSession session = request.getSession();
        session.invalidate();
        return "redirect:/";
    }

    //암호화
    public String encrypt(String text) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(text.getBytes());
        return bytesToHex(md.digest());
    }
    private String bytesToHex(byte[] bytes) {
        StringBuilder builder = new StringBuilder();
        for (byte b : bytes) {
            builder.append(String.format("%02x", b));
        }
        return builder.toString();
    }
}
