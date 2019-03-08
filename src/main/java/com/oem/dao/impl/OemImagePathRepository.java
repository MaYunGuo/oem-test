package com.oem.dao.impl;

import com.oem.base.dao.BaseRepository;
import com.oem.dao.IOemImagePathRepository;
import com.oem.dao.IOemPrdLotRepository;
import com.oem.entity.Oem_image_path;
import com.oem.entity.Oem_prd_lot;
import org.springframework.stereotype.Repository;

@Repository
public class OemImagePathRepository extends BaseRepository<Oem_image_path, String> implements IOemImagePathRepository {
}
