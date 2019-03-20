package com.oem.quartz;


import com.oem.dao.IBisFactoryRepository;
import com.oem.entity.Bis_factory;
import org.quartz.Scheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.List;

import static com.oem.comdef.GenericDef.*;
import static com.oem.comdef.GenericStaticDef.FTP_PATH;

@Component
@Order(value = 1)
public class QuartzListener implements ApplicationRunner {

    @Autowired
    private IBisFactoryRepository bisFactoryRepository;

    @Autowired
    private QuartzService quartzService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        List<Bis_factory> bisFactoryList = bisFactoryRepository.find("From Bis_factory where 1=1");
        if(bisFactoryList != null && !bisFactoryList.isEmpty()){
           for(int i=0;i<bisFactoryList.size();i++){
               Bis_factory bis_factory = bisFactoryList.get(i);
              String conEcepssion = getConExpession(bis_factory.getAnls_rate(),bis_factory.getAnls_unit(),i+1);
              quartzService.addJob(QuartzIvDataJob.class, bis_factory.getFaty_id(), QUARTZ_GROUP_IV, conEcepssion, bis_factory.getFaty_id());
              quartzService.addJob(QuartzFinInsDataJob.class, bis_factory.getFaty_id(), QUARTZ_GROUP_FIN, conEcepssion, bis_factory.getFaty_id());
              quartzService.addJob(QuartzPackDataJob.class, bis_factory.getFaty_id(), QUARTZ_GROUP_PACK, conEcepssion, bis_factory.getFaty_id());
              quartzService.addJob(QuartzMtrlUseDatJob.class, bis_factory.getFaty_id(), QUARTZ_GROUP_MTRL, conEcepssion, bis_factory.getFaty_id());
           }
        }

    }

    public String getConExpession(int anls_rate, String anls_unit, int index){
        StringBuffer conExcepssion = new StringBuffer("* * * * * ?");
        if("S".equals(anls_unit)){
            String newCon = String.valueOf(index%60) + "/" + anls_rate;
            conExcepssion.replace(0, 1, newCon);
        }else if("M".equals(anls_unit)){
            String newCon = "0/" + anls_rate;
            conExcepssion.replace(0,1, String.valueOf(index%60));
            conExcepssion.replace(2,3, newCon);
        }else if("H".equals(anls_unit)){
            String newCon = "0/" + anls_rate;
            conExcepssion.replace(0,1, String.valueOf(index%60));
            conExcepssion.replace(4,5, newCon);
        }
        return conExcepssion.toString();
    }
}
