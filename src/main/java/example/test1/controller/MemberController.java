package example.test1.controller;

import example.test1.dto.MemberDto;
import example.test1.entity.MemberEntity;
import example.test1.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@AllArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private MemberService memberService;

    @GetMapping("/indata")
    public String insertDataForm(Model model, HttpSession session){
        model.addAttribute("myname", new MemberDto());
        return "/main";
    }
    @ResponseBody
    @RequestMapping(method = RequestMethod.POST ,value = "/insert")
    public Object insert(@RequestParam(required = false, defaultValue = "", value = "username")String username,
                         @RequestParam(required = false, defaultValue = "", value = "userma")int userma,
                         @RequestParam(required = false, defaultValue = "", value = "useren")int useren,
                         @RequestParam(required = false, defaultValue = "", value = "userko")int userko,
                         @RequestParam(required = false, defaultValue = "", value = "usersi")int usersi){
        MemberDto memberDto = new MemberDto(null, username, userma, useren, userko, usersi);
        System.out.println(memberDto);
        memberService.save(memberDto);
        return "redirect:/";
    }
}
