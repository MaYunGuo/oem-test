package com.oem.dao.impl;

import com.oem.base.dao.BaseRepository;
import com.oem.dao.IRetMtrlInfoRepository;
import com.oem.entity.Ret_mtrl_info;
import org.springframework.stereotype.Repository;

@Repository
public class RetMtrlInfoRepository extends BaseRepository<Ret_mtrl_info, String> implements IRetMtrlInfoRepository {
}
