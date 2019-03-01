package com.oem.service.uas;

import com.oem.base.service.IBaseServiceInterface;
import com.oem.entity.Bis_user;

import java.util.List;

public interface IFupusrmageService extends IBaseServiceInterface{
    Bis_user getBisUser(String usr_id);

    List<String> getUserFuncCode(Bis_user bis_user);

    boolean updatePassWord(String usr_id, String new_password);
}
