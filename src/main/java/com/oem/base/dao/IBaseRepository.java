package com.oem.base.dao;

import com.oem.entity.BaseEntity;
import com.oem.entity.Bis_user;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;

//@NoRepositoryBean
//@org.springframework.stereotype.Repository
public interface IBaseRepository<T extends Serializable,ID extends Serializable> {


    T get(ID id);
    /**
     * 需要加锁的地方，必须在方法前声明事务注解@Transactional ,否则锁将不会成功
     * PS: 之前ICIM版本的库之所以不用@Transactional，是因为在AOP中开启了事务。
     * 这样做的坏处是，有些查询的业务是不需要事务的，全部开启反而降低了系统的效能
     *
     * @param id
     * @return
     */
    T getWithLock(ID id);

    T uniqueResult(String hql);

    T uniqueResult(String hql, Object... params);

    T queryFirstOne(String hql);

    Query createQuery(String hqlString);


    long count(String countSql);

    List<T> find(String hql);

    List<T> findBySql(String sql);

    List findBySQL(String sql);

    List findBySQL(Boolean isString, String sql);

    List<T> list(String hql, Object... params);

    /**
     * 需要加锁的地方，必须在方法前声明事务注解@Transactional ,否则锁将不会成功
     * PS: 之前icim版本的库之所以不用，是因为在AOP中开启了事务。
     * 这样做的坏处时，有些查询的业务是不需要事务的，全部开启反而降低了系统的效能
     *
     * @param hql
     * @param params
     * @return
     */
    List<T> listWithLock(String hql, Object... params);

    T uniqueResultWithLock(String hql, Object... params);

    <T extends BaseEntity> void save(T object);

    <T extends BaseEntity> void save(Collection<T> objectList);

    <T extends BaseEntity> void update(T object);

    <T extends BaseEntity> void update(Collection<T> objectList);

    <T extends BaseEntity> void delete(T entity);

    <T extends BaseEntity> void delete(Collection<T> objectList);


}