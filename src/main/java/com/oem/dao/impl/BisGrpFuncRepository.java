package com.oem.dao.impl;

import com.oem.base.dao.BaseRepository;
import com.oem.dao.IBisGrpFuncRepository;
import com.oem.entity.Bis_grp_func;
import com.oem.entity.Bis_grp_funcId;
import org.springframework.stereotype.Repository;

@Repository
public class BisGrpFuncRepository extends BaseRepository<Bis_grp_func, Bis_grp_funcId> implements IBisGrpFuncRepository {
}
