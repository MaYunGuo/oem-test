package com.oem.resolve;

import com.oem.entity.Bis_user;
import com.oem.service.uas.IUsermageService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class MyRealm extends AuthorizingRealm {
    //用于用户查询
    @Autowired
    private IUsermageService usermageService;

    //角色权限和对应权限添加
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        //获取登录用户名
        Bis_user bis_user = (Bis_user) principalCollection.getPrimaryPrincipal();
        //添加角色和权限
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        if(bis_user != null){
            List<String> func_codeList = usermageService.getUserFuncCode(bis_user);
            for (String func_code : func_codeList) {
                //添加权限
                simpleAuthorizationInfo.addStringPermission(func_code);
            }
        }


        return simpleAuthorizationInfo;
    }

    //用户认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        //加这一步的目的是在Post请求的时候会先进认证，然后在到请求
        if (authenticationToken.getPrincipal() == null) {
            return null;
        }
        String usr_id = authenticationToken.getPrincipal().toString();                //得到用户名
        Bis_user bis_user = usermageService.getBisUser(usr_id);
        /**检测是否有此用户 **/
        if(bis_user == null){
            throw new UnknownAccountException();//没有找到账号异常
        }

        //这里验证authenticationToken和simpleAuthenticationInfo的信息
        SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo(bis_user, bis_user.getUsr_key(), getName());
        return simpleAuthenticationInfo;
    }
}
