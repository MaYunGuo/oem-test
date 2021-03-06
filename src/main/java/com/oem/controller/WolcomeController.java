package com.oem.controller;

import com.oem.entity.Bis_user;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class WolcomeController {

    @RequestMapping(value={"/","/login","/login.html"})
    public String welcome(HttpServletRequest request){
        HttpSession session = request.getSession();
        Bis_user user= (Bis_user) session.getAttribute("user");
        if(user != null){
            return "home";
        }
        return "login";
    }

    @RequestMapping("/pageRedict.do")
    public String pageRedict(String page,HttpServletRequest request){
        HttpSession session = request.getSession();
        Bis_user user= (Bis_user) session.getAttribute("user");
        if(user != null){
            return page;
        }
        return "login";
    }
    @RequestMapping("/home.do")
    public String rtnHome(HttpServletRequest request){
        HttpSession session = request.getSession();
        Bis_user user= (Bis_user) (Bis_user) session.getAttribute("user");;
        if(user != null){
            return "home";
        }
        return "login";
    }

}
