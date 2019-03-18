package com.oem.base.dao;

import com.oem.entity.BaseEntity;
import com.oem.util.AppContext;
import com.oem.util.DateUtil;
import com.oem.util.JacksonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.*;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.Collection;
import java.util.List;

//@EnableAutoConfiguration
//@ComponentScan
public class BaseRepository<T extends Serializable, ID extends Serializable> implements IBaseRepository<T,ID> {

    //
    public static final String DELETE = "DELETE";
    public static final String UPDATE = "UPDATE";
    public static final String INSERT = "INSERT";

    private Logger logger = LoggerFactory.getLogger(BaseRepository.class);


    private Class<T> clazz;

    public BaseRepository() {
        ParameterizedType t = (ParameterizedType) this.getClass().getGenericSuperclass();
        //获取泛型参数的实际类型
        this.clazz = (Class<T>) t.getActualTypeArguments()[0];
    }


    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public T get(ID id) {
        return getEntityManager().find(clazz, id);
    }

    /**
     * 需要加锁的地方，必须在方法前声明事务注解@Transactional ,否则锁将不会成功
     * PS: 之前ICIM版本的库之所以不用@Transactional，是因为在AOP中开启了事务。
     * 这样做的坏处是，有些查询的业务是不需要事务的，全部开启反而降低了系统的效能
     *
     * @param id
     * @return
     */
    @Override
    public T getWithLock(ID id) {

        final EntityManager entityManager = getEntityManager();
        T t = entityManager.find(clazz, id);
        if(t != null){
            entityManager.lock(t, LockModeType.PESSIMISTIC_WRITE);
        }
        return t;
    }

    @Override
    public T uniqueResult(String hql) {
        return (T) getEntityManager().createQuery(hql).getSingleResult();
    }

    @Override
    public T uniqueResult(String hql, Object... params){
        Query query = this.createQuery(hql);
        for (int i = 0; i < params.length; i++) {
            query.setParameter(i, params[i]);
        }
        if(query.getResultList().size() == 0){
            return null;
        }
        return (T) query.getSingleResult();
    }

    @Override
    public T queryFirstOne(String hql) {
        Query query = this.createQuery(hql);
        if(query.getResultList().size() == 0){
            return null;
        }

        query.setMaxResults(1);
        return (T) query.getSingleResult();
    }

    @Override
    public Query createQuery(String hqlString) {
        final Query query = getEntityManager().createQuery(hqlString, clazz);
        return query;
    }


    @Override
    public long count(String countSql) {
        return (Long) getEntityManager().createQuery(countSql).getSingleResult();
    }

    @Override
    public List<T> find(String hql) {
        return this.createQuery(hql).getResultList();
    }

    @Override
    public List<T> findBySql(String sql) {
        return getEntityManager().createNativeQuery(sql,clazz).getResultList();
    }

    @Override
    public List<T> list(String hql, Object... params) {
        Query query = this.createQuery(hql);
        for (int i = 0; i < params.length; i++) {
            query.setParameter(i, params[i]);
        }
        return query.getResultList();
    }

    @Override
    public List findBySQL(String sql) {
        return getEntityManager().createNativeQuery(sql).getResultList();
    }

    public List findBySQL(Boolean isString, String sql){
        return getEntityManager().createNativeQuery(sql).getResultList();
//        return this.findBySQL(sql).stream().map(objects -> objects[0].toString()).collect(Collectors.toList());
    }

    /**
     * 需要加锁的地方，必须在方法前声明事务注解@Transactional ,否则锁将不会成功
     * PS: 之前icim版本的库之所以不用，是因为在AOP中开启了事务。
     * 这样做的坏处时，有些查询的业务是不需要事务的，全部开启反而降低了系统的效能
     *
     * @param hql
     * @param params
     * @return
     */
    @Override
    public List<T> listWithLock(String hql, Object... params) {
        Query query = this.createQuery(hql);

        for (int i = 0; i < params.length; i++) {
            query.setParameter(i + 1, params[i]);
        }
        final List list = query.getResultList();
        if(list != null && !list.isEmpty()){
            list.forEach(entity -> getEntityManager().lock(entity, LockModeType.PESSIMISTIC_WRITE));
        }

        return list;
    }

    @Override
    public T uniqueResultWithLock(String hql, Object... params){
        Query query = this.createQuery(hql);

        for (int i = 0; i < params.length; i++) {
            query.setParameter(i + 1, params[i]);
        }
        final T entity = (T) query.getSingleResult();
        if(entity != null){
            getEntityManager().lock(entity, LockModeType.PESSIMISTIC_WRITE);
        }
        return entity;
    }


    @Override
    public <T extends BaseEntity> void save(T entity) {
        getEntityManager().persist(entity);
        flush();

        setEntity(entity, INSERT);
        sendHis(entity);

    }

    @Override
    public <T extends BaseEntity> void save(Collection<T> entities) {
        entities.forEach(entity -> {
            getEntityManager().persist(entity);
            setEntity(entity, INSERT);
            sendHis(entity);
        });
        flush();

    }

    @Override
    public <T extends BaseEntity> void update(T entity) {
        T s = getEntityManager().merge(entity);
        flush();

        setEntity(s, UPDATE);
        //sendHis(s);

    }

    @Override
    public <T extends BaseEntity> void update(Collection<T> entities) {
        entities.forEach(entity -> {
            getEntityManager().merge(entity);
            setEntity(entity, UPDATE);
            sendHis(entity);
        });
        flush();
    }


    @Override
    public <T extends BaseEntity> void delete(T entity) {

        EntityManager em = getEntityManager();
        em.remove(em.contains(entity) ? entity : em.merge(entity));
       // getEntityManager().remove(entity);
        flush();

        setEntity(entity, DELETE);
        sendHis(entity);
    }

    @Override
    public <T extends BaseEntity> void delete(Collection<T> entities) {
        getEntityManager().remove(entities);
        flush();

        entities.forEach(entity -> {
            setEntity(entity, DELETE);
            sendHis(entity);
        });

    }



    public void flush() {
        getEntityManager().flush();
    }


    private <T extends BaseEntity> void setEntity(T t, String operation) {
        String tableName = getDeclareTableName(t).toLowerCase();
        t.setOpeTblName(tableName);
        t.setOperation(operation);
        t.setDbopeTimeD(DateUtil.getDoubleTime());
        t.setOpeEvtName(AppContext.getCurrServiceName());
        t.setOpeEvtNo(AppContext.getCurrEventNumber());
    }

    /**
     * 获取表名，需要在Entity上增加@Table注解
     * 如果没有@Table注解，则默认返回当前类名的大写形式
     *
     * @param t
     * @param <T>
     * @return
     */
    private <T extends BaseEntity> String getDeclareTableName(T t) {
        final Class<? extends BaseEntity> clazz = t.getClass();
        final Table table = clazz.getDeclaredAnnotation(Table.class);
        if (table == null) {
            return t.getClass().getSimpleName().toUpperCase();
        }
        return table.name();
    }


    private <T extends BaseEntity> void sendHis(T entity) {
        String json = JacksonUtil.toJSONStr(entity);
//        HistoryContext.addJsonEntity(json);
    }

    private <T extends BaseEntity> void sendHis(Iterable<T> entities) {
        entities.forEach(entity -> {
            String json = JacksonUtil.toJSONStr(entity);
//            HistoryContext.addJsonEntity(json);
        });
    }

    public EntityManager getEntityManager() {
        return entityManager;
    }



}