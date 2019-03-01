package com.oem.dao.impl;

import com.oem.base.dao.BaseRepository;
import com.oem.dao.IBisFuncGrpRepositroy;
import com.oem.entity.Bis_func_grp;
import org.springframework.stereotype.Repository;

@Repository
public class BisFuncGrpRepository extends BaseRepository<Bis_func_grp, String> implements IBisFuncGrpRepositroy {
}
