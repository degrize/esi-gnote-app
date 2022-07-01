package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.Classe;
import com.esi.gnote.domain.Filiere;
import com.esi.gnote.service.dto.ClasseDTO;
import com.esi.gnote.service.dto.FiliereDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Classe} and its DTO {@link ClasseDTO}.
 */
@Mapper(componentModel = "spring")
public interface ClasseMapper extends EntityMapper<ClasseDTO, Classe> {
    @Mapping(target = "filiere", source = "filiere", qualifiedByName = "filiereNomFiliere")
    ClasseDTO toDto(Classe s);

    @Named("filiereNomFiliere")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nomFiliere", source = "nomFiliere")
    FiliereDTO toDtoFiliereNomFiliere(Filiere filiere);
}
