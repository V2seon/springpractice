package example.test1.controller;

import example.test1.dto.AdminDto;
import example.test1.dto.MemberDto;
import example.test1.service.JoinService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Controller
@AllArgsConstructor
@RequestMapping("/join")
public class JoinController {

    private  JoinService joinService;

    @GetMapping("/login")
    public String createUserForm(Model model){
        model.addAttribute("userForm",new AdminDto());
        return "/join";
    }
    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/userjoin")
    public Object createUser(@RequestParam(required = false, defaultValue = "", value = "userid")String userid,
                             @RequestParam(required = false, defaultValue = "", value = "userpw")String userpw,
                             @RequestParam(required = false, defaultValue = "", value = "userAge")int userAge,
                             @RequestParam(required = false, defaultValue = "", value = "userName")String userName,
                             @RequestParam(required = false, defaultValue = "", value = "userPhone")String userPhone){
        AdminDto adminDto = new AdminDto(null, userid, userpw, userName, userAge, userPhone);
        joinService.save(adminDto);
        return "redirect:/";
    }
}
