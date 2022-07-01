package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.DemandeInspecteurEtudiant;
import com.esi.gnote.service.dto.DemandeInspecteurEtudiantDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link DemandeInspecteurEtudiant} and its DTO {@link DemandeInspecteurEtudiantDTO}.
 */
@Mapper(componentModel = "spring")
public interface DemandeInspecteurEtudiantMapper extends EntityMapper<DemandeInspecteurEtudiantDTO, DemandeInspecteurEtudiant> {}
