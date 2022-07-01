package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.Classe;
import com.esi.gnote.domain.EC;
import com.esi.gnote.domain.Filiere;
import com.esi.gnote.service.dto.ClasseDTO;
import com.esi.gnote.service.dto.ECDTO;
import com.esi.gnote.service.dto.FiliereDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Classe} and its DTO {@link ClasseDTO}.
 */
@Mapper(componentModel = "spring")
public interface ClasseMapper extends EntityMapper<ClasseDTO, Classe> {
    @Mapping(target = "filiere", source = "filiere", qualifiedByName = "filiereNomFiliere")
    @Mapping(target = "eCS", source = "eCS", qualifiedByName = "eCNomECSet")
    ClasseDTO toDto(Classe s);

    @Mapping(target = "removeEC", ignore = true)
    Classe toEntity(ClasseDTO classeDTO);

    @Named("filiereNomFiliere")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nomFiliere", source = "nomFiliere")
    FiliereDTO toDtoFiliereNomFiliere(Filiere filiere);

    @Named("eCNomEC")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nomEC", source = "nomEC")
    ECDTO toDtoECNomEC(EC eC);

    @Named("eCNomECSet")
    default Set<ECDTO> toDtoECNomECSet(Set<EC> eC) {
        return eC.stream().map(this::toDtoECNomEC).collect(Collectors.toSet());
    }
}
