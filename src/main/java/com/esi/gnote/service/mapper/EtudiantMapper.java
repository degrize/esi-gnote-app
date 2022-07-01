package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.Encadreur;
import com.esi.gnote.domain.Etudiant;
import com.esi.gnote.service.dto.EncadreurDTO;
import com.esi.gnote.service.dto.EtudiantDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Etudiant} and its DTO {@link EtudiantDTO}.
 */
@Mapper(componentModel = "spring")
public interface EtudiantMapper extends EntityMapper<EtudiantDTO, Etudiant> {
    @Mapping(target = "encadreur", source = "encadreur", qualifiedByName = "encadreurId")
    EtudiantDTO toDto(Etudiant s);

    @Named("encadreurId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EncadreurDTO toDtoEncadreurId(Encadreur encadreur);
}
