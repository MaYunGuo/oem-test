package com.oem.controller;

import com.oem.entity.Bis_user;
import com.oem.service.uas.IFupusrmageService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

    @Autowired
    private IFupusrmageService usermageService;

    @RequestMapping("/login.do")
    public String login(HttpServletRequest request, HttpServletResponse response){

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        HttpSession session = request.getSession();
        UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(username,password);
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(usernamePasswordToken);   //完成登录
            Bis_user user= (Bis_user) subject.getPrincipal();
            session.setAttribute("user", user);
            return "home";
        } catch(UnknownAccountException e) {
            session.setAttribute("loginErr","用户不存在，请确认账号是否正确");
        }catch (IncorrectCredentialsException e){
           session.setAttribute("loginErr","密码错误，请确认");
        }catch (Exception e){
            session.setAttribute("loginErr","登录异常，请稍后重试");
        }
        return "login";
    }
    @RequestMapping("/logout.do")
    public String logout(){
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        return "login";
    }

    @RequestMapping("/editPwd.do")
    @ResponseBody
    public boolean updatePassword(HttpServletRequest request, HttpServletResponse response){
        String password = request.getParameter("pwd");
        HttpSession session = request.getSession();
        Bis_user cur_usr = (Bis_user) session.getAttribute("user");
        if(cur_usr == null){
            return false;
        }
        if(password.equals(cur_usr.getUsr_key())){
            return true;
        }
        boolean flg = usermageService.updatePassWord(cur_usr.getUsr_id(), password);
        if(flg){
            UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(cur_usr.getUsr_id(),password);
            Subject subject = SecurityUtils.getSubject();
            subject.login(usernamePasswordToken);   //完成登录
            Bis_user user= (Bis_user) subject.getPrincipal();
            session.setAttribute("user", user);
        }
        return flg;
    }
}
