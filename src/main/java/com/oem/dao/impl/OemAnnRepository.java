package com.oem.dao.impl;

import com.oem.base.dao.BaseRepository;
import com.oem.dao.IOemAnnRepository;
import com.oem.entity.Oem_announment;
import org.springframework.stereotype.Repository;

@Repository
public class OemAnnRepository extends BaseRepository<Oem_announment, String> implements IOemAnnRepository {
}
