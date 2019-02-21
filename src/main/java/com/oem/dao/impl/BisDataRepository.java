package com.oem.dao.impl;

import com.oem.base.dao.BaseRepository;
import com.oem.dao.IBisDataRepository;
import com.oem.entity.Bis_data;
import org.springframework.stereotype.Repository;

@Repository
public class BisDataRepository extends BaseRepository<Bis_data, String> implements IBisDataRepository {
}
