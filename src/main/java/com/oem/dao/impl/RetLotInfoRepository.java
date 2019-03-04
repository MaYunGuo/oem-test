package com.oem.dao.impl;

import com.oem.base.dao.BaseRepository;
import com.oem.dao.IRetLotInfoRepository;
import com.oem.entity.Ret_lot_info;
import org.springframework.stereotype.Repository;

@Repository
public class RetLotInfoRepository extends BaseRepository<Ret_lot_info, String> implements IRetLotInfoRepository {
}
