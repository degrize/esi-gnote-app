package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.Cycle;
import com.esi.gnote.domain.Filiere;
import com.esi.gnote.domain.UE;
import com.esi.gnote.service.dto.CycleDTO;
import com.esi.gnote.service.dto.FiliereDTO;
import com.esi.gnote.service.dto.UEDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Filiere} and its DTO {@link FiliereDTO}.
 */
@Mapper(componentModel = "spring")
public interface FiliereMapper extends EntityMapper<FiliereDTO, Filiere> {
    @Mapping(target = "etudiant", source = "etudiant", qualifiedByName = "cycleId")
    @Mapping(target = "uES", source = "uES", qualifiedByName = "uENomUESet")
    FiliereDTO toDto(Filiere s);

    @Mapping(target = "removeUE", ignore = true)
    Filiere toEntity(FiliereDTO filiereDTO);

    @Named("cycleId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CycleDTO toDtoCycleId(Cycle cycle);

    @Named("uENomUE")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nomUE", source = "nomUE")
    UEDTO toDtoUENomUE(UE uE);

    @Named("uENomUESet")
    default Set<UEDTO> toDtoUENomUESet(Set<UE> uE) {
        return uE.stream().map(this::toDtoUENomUE).collect(Collectors.toSet());
    }
}
