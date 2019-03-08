package com.oem.dao.impl;

import com.oem.base.dao.BaseRepository;
import com.oem.dao.IOemMtrlUseRepository;
import com.oem.dao.IOemPrdBoxRepository;
import com.oem.entity.Oem_mtrl_use;
import com.oem.entity.Oem_prd_box;
import org.springframework.stereotype.Repository;

@Repository
public class OemMtrlUseRepository extends BaseRepository<Oem_mtrl_use, String> implements IOemMtrlUseRepository {
}
