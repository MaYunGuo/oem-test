package com.oem.dao.impl;

import com.oem.base.dao.BaseRepository;
import com.oem.dao.IOemPrdBoxRepository;
import com.oem.entity.Oem_prd_box;
import org.springframework.stereotype.Repository;

@Repository
public class OemPrdBoxRepository extends BaseRepository<Oem_prd_box, String> implements IOemPrdBoxRepository {
}
