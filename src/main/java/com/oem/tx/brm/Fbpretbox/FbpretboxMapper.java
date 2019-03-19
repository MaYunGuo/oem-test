package com.oem.tx.brm.Fbpretbox;

import com.oem.entity.Oem_image_path;
import com.oem.entity.Oem_mtrl_use;
import com.oem.entity.Oem_prd_lot;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * Created by ghost on 2019/3/8.
 */

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FbpretboxMapper {
    FbpretboxMapper INSTANCE = Mappers.getMapper(FbpretboxMapper.class);

    FbpretboxOB getLotInfo(Oem_prd_lot lot);
    List<FbpretboxOB> getLotInfo(List<Oem_prd_lot> list);


    ImagePathInfo getImagePathInfo(Oem_image_path image);
    List<ImagePathInfo> getImagePathInfo(List<Oem_image_path> list);


    MtrlUseInfo getMtrlUseInfo(Oem_mtrl_use mtrl_use);
    List<MtrlUseInfo> getMtrlUseInfo(List<Oem_mtrl_use> list);
}
