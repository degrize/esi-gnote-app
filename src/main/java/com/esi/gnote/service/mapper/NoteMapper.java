package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.EC;
import com.esi.gnote.domain.Etudiant;
import com.esi.gnote.domain.Note;
import com.esi.gnote.service.dto.ECDTO;
import com.esi.gnote.service.dto.EtudiantDTO;
import com.esi.gnote.service.dto.NoteDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Note} and its DTO {@link NoteDTO}.
 */
@Mapper(componentModel = "spring")
public interface NoteMapper extends EntityMapper<NoteDTO, Note> {
    @Mapping(target = "etudiants", source = "etudiants", qualifiedByName = "etudiantMatriculeETSet")
    @Mapping(target = "eCS", source = "eCS", qualifiedByName = "eCNomECSet")
    NoteDTO toDto(Note s);

    @Mapping(target = "removeEtudiant", ignore = true)
    @Mapping(target = "removeEC", ignore = true)
    Note toEntity(NoteDTO noteDTO);

    @Named("etudiantMatriculeET")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "matriculeET", source = "matriculeET")
    EtudiantDTO toDtoEtudiantMatriculeET(Etudiant etudiant);

    @Named("etudiantMatriculeETSet")
    default Set<EtudiantDTO> toDtoEtudiantMatriculeETSet(Set<Etudiant> etudiant) {
        return etudiant.stream().map(this::toDtoEtudiantMatriculeET).collect(Collectors.toSet());
    }

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
