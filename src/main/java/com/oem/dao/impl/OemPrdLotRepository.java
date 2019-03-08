package com.oem.dao.impl;

import com.oem.base.dao.BaseRepository;
import com.oem.dao.IOemPrdLotRepository;
import com.oem.entity.Oem_prd_lot;
import org.springframework.stereotype.Repository;

@Repository
public class OemPrdLotRepository extends BaseRepository<Oem_prd_lot, String> implements IOemPrdLotRepository {
}
