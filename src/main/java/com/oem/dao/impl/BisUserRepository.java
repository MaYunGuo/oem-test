package com.oem.dao.impl;

import com.oem.base.dao.BaseRepository;
import com.oem.dao.IBisUserRepository;
import com.oem.entity.Bis_user;
import org.springframework.stereotype.Repository;

@Repository("bisUserRepository")
public class BisUserRepository extends BaseRepository<Bis_user, String> implements IBisUserRepository {

}
