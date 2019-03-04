package com.oem.dao.impl;

import com.oem.base.dao.BaseRepository;
import com.oem.dao.IRetBoxInfoRepository;
import com.oem.entity.Ret_box_info;
import org.springframework.stereotype.Repository;

@Repository
public class RetBoxInfoRepository extends BaseRepository<Ret_box_info, String> implements IRetBoxInfoRepository {
}
