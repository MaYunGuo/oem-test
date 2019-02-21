package com.oem.dao.impl;

import com.oem.base.dao.BaseRepository;
import com.oem.dao.IBisFactoryRepository;
import com.oem.entity.Bis_factory;
import org.springframework.stereotype.Repository;

@Repository
public class BisFactoryRepository extends BaseRepository<Bis_factory, String> implements IBisFactoryRepository {
}
